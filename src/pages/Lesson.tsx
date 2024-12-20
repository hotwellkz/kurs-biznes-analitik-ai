import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LessonContent } from '@/components/lesson/LessonContent';
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
          const qaArray = lessonProgress.questions_answers as Array<{ question: string; answer: string }>;
          if (Array.isArray(qaArray) && qaArray.every(qa => 'question' in qa && 'answer' in qa)) {
            setQuestionsAnswers(qaArray);
          }
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-secondary to-secondary-dark">
      <Navigation />
      <Breadcrumbs />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent blur-3xl -z-10" />
            <LessonHeader 
              isLoading={isLoading}
              onStartLesson={startLesson}
            />
          </div>

          {content && (
            <div className="space-y-8 sm:space-y-12">
              {/* Кнопки управления контентом */}
              <div className="bg-secondary-dark/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-primary/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <LessonContent
                  content={content}
                  onVoiceControlsChange={setShowVoiceControls}
                  onPlayingChange={setIsPlaying}
                  tokens={tokens}
                  setTokens={setTokens}
                />
              </div>

              {/* Основной контент урока */}
              <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-primary/10 shadow-xl animate-slide-up">
                <LessonProgress
                  lessonId={lessonId!}
                  content={content}
                  questionsAnswers={questionsAnswers}
                  onComplete={() => navigate('/program')}
                />
              </div>

              {showVoiceControls && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
                  <div className="bg-secondary-dark/90 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-primary/20 shadow-2xl">
                    <LessonControls 
                      isPlaying={isPlaying}
                      onPlayPause={handlePlayPause}
                    />
                  </div>
                </div>
              )}

              {/* Чат и вопросы */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent blur-2xl -z-10" />
                <div className="border-t border-primary/10 pt-8">
                  <div className="bg-secondary-dark/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-primary/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <LessonChat
                      lessonId={lessonId!}
                      tokens={tokens}
                      setTokens={setTokens}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Lesson;
