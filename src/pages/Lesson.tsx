import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Play, Pause, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const TOKENS_FOR_LESSON = 5;
const TOKENS_FOR_QUESTION = 5;
const TOKENS_FOR_VOICE = 45;

const Lesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceLoading, setIsVoiceLoading] = useState(false);
  const [content, setContent] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVoiceControls, setShowVoiceControls] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [tokens, setTokens] = useState<number | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const topQuestions = [
    "Какие основные обязанности бизнес-аналитика?",
    "Какие soft skills необходимы бизнес-аналитику?",
    "Как начать карьеру бизнес-аналитика?",
    "Какие инструменты использует бизнес-аналитик?",
    "Сколько зарабатывает бизнес-аналитик?"
  ];

  const testQuestions = [
    {
      question: "Какова основная роль бизнес-аналитика?",
      options: [
        "Только написание кода",
        "Анализ бизнес-процессов и требований",
        "Управление персоналом",
        "Продажи продукта"
      ],
      correctAnswer: 1
    },
    // ... добавьте больше вопросов
  ];

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
    };

    checkAuth();

    // Reminder animation
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
  }, [navigate, content]);

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

      if (tokens !== null && tokens < TOKENS_FOR_LESSON) {
        toast({
          title: "Недостаточно токенов",
          description: `Для начала урока требуется ${TOKENS_FOR_LESSON} токенов`,
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);

      const { data: profile } = await supabase
        .from('profiles')
        .update({ tokens: tokens! - TOKENS_FOR_LESSON })
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

      // Save progress
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

  const playFreeVoice = () => {
    if (!content) return;

    const cleanText = content.replace(/[#*]/g, '');
    
    if (speechSynthesisRef.current) {
      if (!isPlaying) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.pause();
      }
      setIsPlaying(!isPlaying);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();
    const russianVoice = voices.find(voice => voice.lang.includes('ru'));
    if (russianVoice) {
      utterance.voice = russianVoice;
    }
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onend = () => {
      setIsPlaying(false);
      speechSynthesisRef.current = null;
    };

    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setShowVoiceControls(true);
  };

  const playPremiumVoice = async () => {
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

      if (tokens !== null && tokens < TOKENS_FOR_VOICE) {
        toast({
          title: "Недостаточно токенов",
          description: `Для премиум озвучки требуется ${TOKENS_FOR_VOICE} токенов`,
          variant: "destructive",
        });
        return;
      }

      setIsVoiceLoading(true);

      const cleanText = content.replace(/[#*]/g, '');

      const { data: profile } = await supabase
        .from('profiles')
        .update({ tokens: tokens! - TOKENS_FOR_VOICE })
        .eq('id', session.user.id)
        .select()
        .single();

      if (profile) {
        setTokens(profile.tokens);
      }

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text: cleanText }
      });

      if (error) throw error;

      const audio = new Audio(data.audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        setShowVoiceControls(false);
      };

      audio.play();
      setIsPlaying(true);
      setShowVoiceControls(true);

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать аудио",
        variant: "destructive",
      });
    } finally {
      setIsVoiceLoading(false);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      playFreeVoice();
    }
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(content);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const askQuestion = async (question: string) => {
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

      if (tokens !== null && tokens < TOKENS_FOR_QUESTION) {
        toast({
          title: "Недостаточно токенов",
          description: `Для вопроса требуется ${TOKENS_FOR_QUESTION} токенов`,
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);

      const { data: profile } = await supabase
        .from('profiles')
        .update({ tokens: tokens! - TOKENS_FOR_QUESTION })
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
              content: 'Ты - опытный преподаватель бизнес-анализа. Отвечай на вопросы студентов четко и по существу.'
            },
            {
              role: 'user',
              content: question
            }
          ]
        }
      });

      if (error) throw error;

      setContent(prev => `${prev}\n\nВопрос: ${question}\n\nОтвет: ${data.choices[0].message.content}`);

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось получить ответ",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setUserQuestion('');
    }
  };

  const startTest = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsTestModalOpen(true);
  };

  const handleAnswer = (answerIndex: number) => {
    if (answerIndex === testQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Show final score with animation
      const finalScore = Math.round((score / testQuestions.length) * 10);
      toast({
        title: "Тест завершен!",
        description: `Ваша оценка: ${finalScore}/10`,
      });
      setIsTestModalOpen(false);
    }
  };

  const finishLesson = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      await supabase
        .from('lesson_progress')
        .update({
          completed: true,
          completed_at: new Date().toISOString()
        })
        .eq('user_id', session.user.id)
        .eq('lesson_id', lessonId);

      navigate('/program');

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось завершить урок",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navigation />
      <Breadcrumbs />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in">
            Урок 1.1: Кто такой бизнес-аналитик?
          </h1>

          <div className="flex flex-wrap gap-4 items-center">
            <Button
              id="start-lesson-button"
              onClick={startLesson}
              disabled={isLoading}
              className="bg-primary hover:bg-primary-hover text-white px-8 py-4 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Готовлю урок...
                </>
              ) : (
                'Начать урок'
              )}
            </Button>

            {content && (
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={playFreeVoice}
                  disabled={isVoiceLoading}
                  variant="outline"
                >
                  {isPlaying && !audioRef.current ? (
                    <Pause className="w-4 h-4 mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  Озвучить бесплатно
                </Button>

                <Button
                  onClick={playPremiumVoice}
                  disabled={isVoiceLoading}
                  className="bg-primary hover:bg-primary-hover"
                >
                  {isVoiceLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  Озвучить красивым голосом (45 токенов)
                </Button>

                <Button
                  onClick={shareOnWhatsApp}
                  variant="outline"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Поделиться в WhatsApp
                </Button>
              </div>
            )}
          </div>

          {showVoiceControls && (
            <div className="flex gap-4">
              <Button
                onClick={togglePlay}
                variant="outline"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Пауза
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Продолжить
                  </>
                )}
              </Button>
            </div>
          )}

          {content && (
            <div className="prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content.replace(/### (.*?)\n/g, '<h3>$1</h3>\n').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          )}

          {content && (
            <>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Популярные вопросы:</h3>
                <div className="flex flex-wrap gap-2">
                  {topQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => askQuestion(question)}
                      disabled={isLoading}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Задать свой вопрос:</h3>
                <Textarea
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Введите ваш вопрос..."
                  className="min-h-[100px]"
                />
                <Button
                  onClick={() => askQuestion(userQuestion)}
                  disabled={isLoading || !userQuestion}
                  className="bg-primary hover:bg-primary-hover"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    'Отправить вопрос (5 токенов)'
                  )}
                </Button>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={startTest}
                  className="bg-primary hover:bg-primary-hover"
                >
                  Пройти тест
                </Button>
              </div>

              <div className="pt-8">
                <Button
                  onClick={finishLesson}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Завершить урок
                </Button>
              </div>
            </>
          )}
        </div>
      </main>

      <Dialog open={isTestModalOpen} onOpenChange={setIsTestModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Тест: Понимание роли бизнес-аналитика
            </DialogTitle>
          </DialogHeader>
          
          {currentQuestion < testQuestions.length && (
            <div className="space-y-4">
              <p className="text-lg">{testQuestions[currentQuestion].question}</p>
              <div className="space-y-2">
                {testQuestions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full justify-start text-left"
                    variant="outline"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Lesson;