import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LessonContent } from '@/components/lesson/LessonContent';
import { LessonTest } from '@/components/lesson/LessonTest';
import { LessonHeader } from '@/components/lesson/LessonHeader';
import { LessonControls } from '@/components/lesson/LessonControls';
import { LessonChat } from '@/components/lesson/LessonChat';
import { LessonProgress } from '@/components/lesson/LessonProgress';

interface QA {
  question: string;
  answer: string;
}

const Lesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVoiceControls, setShowVoiceControls] = useState(false);
  const [tokens, setTokens] = useState<number | null>(null);
  const [questionsAnswers, setQuestionsAnswers] = useState<QA[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('tokens')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        setTokens(profile.tokens);
      }

      // Load existing lesson progress
      const { data: lessonProgress } = await supabase
        .from('lesson_progress')
        .select('generated_content, questions_answers')
        .eq('user_id', session.user.id)
        .eq('lesson_id', lessonId)
        .single();

      if (lessonProgress) {
        if (lessonProgress.generated_content) {
          setContent(lessonProgress.generated_content);
        }
        if (lessonProgress.questions_answers) {
          setQuestionsAnswers(Array.isArray(lessonProgress.questions_answers) 
            ? lessonProgress.questions_answers as QA[]
            : []
          );
        }
      }
    };

    checkAuth();

    const interval = setInterval(() => {
      if (!content) {
        const button = document.getElementById('start-lesson-button');
        if (button) {
          button.classList.add('animate-bounce');
          setTimeout(() => {
            button.classList.remove('animate-bounce');
          }, 1000);
        }
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [navigate, content, lessonId]);

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

      const { data: profile } = await supabase
        .from('profiles')
        .update({ tokens: tokens! - 5 })
        .eq('id', session.user.id)
        .select()
        .single();

      if (profile) {
        setTokens(profile.tokens);
      }

      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [
            {
              role: 'system',
              content: 'Ты - опытный преподаватель бизнес-анализа. Твоя задача - подробно и структурированно объяснять материал, используя практические примеры.'
            },
            {
              role: 'user',
              content: 'Расскажи подробно как будто ты преподаватель и преподаешь урок на тему: Кто такой бизнес-аналитик? Основные роли и обязанности, Ключевые навыки и инструменты, Примеры задач'
            }
          ]
        }
      });

      if (error) throw error;

      const lessonContent = data.choices[0].message.content;
      setContent(lessonContent);

      // Check for existing progress
      const { data: existingProgress } = await supabase
        .from('lesson_progress')
        .select()
        .eq('user_id', session.user.id)
        .eq('lesson_id', lessonId)
        .single();

      if (existingProgress) {
        // Update existing progress
        await supabase
          .from('lesson_progress')
          .update({ generated_content: lessonContent })
          .eq('user_id', session.user.id)
          .eq('lesson_id', lessonId);
      } else {
        // Create new progress
        await supabase
          .from('lesson_progress')
          .insert({
            user_id: session.user.id,
            lesson_id: lessonId,
            generated_content: lessonContent
          });
      }

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

  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
    } else {
      window.speechSynthesis.resume();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navigation />
      <Breadcrumbs />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <LessonHeader 
            isLoading={isLoading}
            onStartLesson={startLesson}
          />

          {content && (
            <>
              <LessonContent
                content={content}
                onVoiceControlsChange={setShowVoiceControls}
                onPlayingChange={setIsPlaying}
                tokens={tokens}
                setTokens={setTokens}
              />

              {showVoiceControls && (
                <LessonControls 
                  isPlaying={isPlaying}
                  onPlayPause={handlePlayPause}
                />
              )}

              <LessonChat
                lessonId={lessonId!}
                tokens={tokens}
                setTokens={setTokens}
              />

              <LessonProgress
                lessonId={lessonId!}
                content={content}
                questionsAnswers={questionsAnswers}
                onComplete={() => navigate('/program')}
              />

              <div className="space-y-4">
                <LessonTest />
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Lesson;