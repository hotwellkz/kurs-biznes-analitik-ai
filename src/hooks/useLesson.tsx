import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface QuestionAnswer {
  question: string;
  answer: string;
}

export const useLesson = (lessonId: string) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [tokens, setTokens] = useState<number | null>(null);
  const [questionsAnswers, setQuestionsAnswers] = useState<QuestionAnswer[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }

      try {
        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('tokens')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profile) {
          setTokens(profile.tokens);
        } else {
          // Create profile if it doesn't exist
          const { data: newProfile } = await supabase
            .from('profiles')
            .insert({ id: session.user.id, tokens: 100 })
            .select()
            .maybeSingle();

          if (newProfile) {
            setTokens(newProfile.tokens);
          }
        }

        // Load existing lesson progress
        const { data: lessonProgress } = await supabase
          .from('lesson_progress')
          .select('generated_content, questions_answers')
          .eq('user_id', session.user.id)
          .eq('lesson_id', lessonId)
          .maybeSingle();

        // Create lesson progress if it doesn't exist
        if (!lessonProgress) {
          await supabase
            .from('lesson_progress')
            .insert({
              user_id: session.user.id,
              lesson_id: lessonId,
              completed: false,
              questions_answers: []
            });
        } else {
          if (lessonProgress.generated_content) {
            setContent(lessonProgress.generated_content);
          }
          if (lessonProgress.questions_answers) {
            const qaArray = lessonProgress.questions_answers as Array<{ question: string; answer: string }>;
            if (Array.isArray(qaArray) && qaArray.every(qa => 'question' in qa && 'answer' in qa)) {
              setQuestionsAnswers(qaArray);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить данные урока",
          variant: "destructive",
        });
      }
    };

    checkAuth();
  }, [navigate, lessonId, toast]);

  const getPromptForLesson = (lessonId: string) => {
    switch (lessonId) {
      case '1.1':
        return 'Расскажи подробно как будто ты преподаватель и преподаешь урок на тему: Кто такой бизнес-аналитик? Основные роли и обязанности, Ключевые навыки и инструменты, Примеры задач';
      case '1.2':
        return 'Расскажи подробно как будто ты преподаватель и преподаешь урок на тему: Жизненный цикл разработки (SDLC). Основные этапы SDLC, Роль бизнес-аналитика на каждом этапе, Agile vs. Waterfall';
      default:
        return '';
    }
  };

  const startLesson = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Требуется авторизация",
          description: "Пожалуйста, войдите в систему",
          variant: "destructive",
        });
        return;
      }

      if (tokens !== null && tokens < 5) {
        toast({
          title: "Недостаточно токенов",
          description: "Для начала урока требуется 5 токенов",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);

      // Update tokens
      const { data: profile } = await supabase
        .from('profiles')
        .update({ tokens: tokens! - 5 })
        .eq('id', session.user.id)
        .select()
        .maybeSingle();

      if (profile) {
        setTokens(profile.tokens);
      }

      // Generate lesson content
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [
            {
              role: 'system',
              content: 'Ты - опытный преподаватель бизнес-анализа. Твоя задача - подробно и структурированно объяснять материал, используя практические примеры.'
            },
            {
              role: 'user',
              content: getPromptForLesson(lessonId)
            }
          ]
        }
      });

      if (error) throw error;

      const lessonContent = data.choices[0].message.content;
      setContent(lessonContent);

      // Update lesson progress
      await supabase
        .from('lesson_progress')
        .upsert({
          user_id: session.user.id,
          lesson_id: lessonId,
          generated_content: lessonContent
        });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось начать урок",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    content,
    tokens,
    setTokens,
    questionsAnswers,
    startLesson
  };
};
