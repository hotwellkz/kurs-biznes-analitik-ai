import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LessonContent } from '@/components/lesson/LessonContent';
import { LessonHeader } from '@/components/lesson/LessonHeader';
import { LessonControls } from '@/components/lesson/LessonControls';
import { LessonChat } from '@/components/lesson/LessonChat';
import { LessonProgress } from '@/components/lesson/LessonProgress';
import { useLesson } from '@/hooks/useLesson';

const Lesson = () => {
  const { lessonId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVoiceControls, setShowVoiceControls] = useState(false);
  
  const {
    isLoading,
    content,
    tokens,
    setTokens,
    questionsAnswers,
    startLesson
  } = useLesson(lessonId!);

  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
    } else {
      window.speechSynthesis.resume();
    }
    setIsPlaying(!isPlaying);
  };

  const getMetaDescription = () => {
    if (lessonId === '3.1') {
      return 'Изучите методы бизнес-анализа: SWOT, PESTEL и другие. Подробное описание методов анализа с практическими примерами применения. Интерактивное обучение с ИИ-наставником и тестированием знаний.';
    }
    if (lessonId === '1.2') {
      return 'Изучите основные этапы SDLC, роль бизнес-аналитика в каждой фазе разработки, сравнение методологий Agile и Waterfall. Практические примеры и интерактивное обучение с ИИ-наставником.';
    }
    return 'Онлайн-курс по бизнес-анализу с персональным ИИ-наставником. Практические знания и навыки для успешной карьеры бизнес-аналитика.';
  };

  const getTitle = () => {
    if (lessonId === '3.1') {
      return 'SWOT, PESTEL и другие методы анализа | Методы бизнес-анализа | БизнесАналитик.AI';
    }
    if (lessonId === '1.2') {
      return 'Основные этапы SDLC | Жизненный цикл разработки ПО | БизнесАналитик.AI';
    }
    return 'Обучение бизнес-анализу | БизнесАналитик.AI';
  };

  const getKeywords = () => {
    if (lessonId === '3.1') {
      return 'SWOT анализ, PESTEL анализ, методы бизнес-анализа, бизнес-аналитика, стратегический анализ, анализ внешней среды, анализ внутренней среды';
    }
    if (lessonId === '1.2') {
      return 'SDLC, этапы SDLC, жизненный цикл разработки, бизнес-анализ, Agile, Waterfall, роль бизнес-аналитика';
    }
    return 'бизнес-анализ, обучение бизнес-анализу, курсы бизнес-анализ';
  };

  const getCanonicalUrl = () => {
    return `https://бизнесаналитик.ai/lesson/${lessonId}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-secondary to-secondary-dark overflow-x-hidden">
      <Helmet>
        <title>{getTitle()}</title>
        <meta name="description" content={getMetaDescription()} />
        <meta name="keywords" content={getKeywords()} />
        <meta property="og:title" content={getTitle()} />
        <meta property="og:description" content={getMetaDescription()} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={getCanonicalUrl()} />
        <link rel="canonical" href={getCanonicalUrl()} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getTitle()} />
        <meta name="twitter:description" content={getMetaDescription()} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="БизнесАналитик.AI" />
      </Helmet>

      <Navigation />
      <Breadcrumbs />
      
      <main className="flex-grow container mx-auto py-8 sm:py-12 lg:py-16">
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
              <div className="bg-secondary-dark/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-primary/10 shadow-lg hover:shadow-xl transition-shadow duration-300 mx-4 sm:mx-0">
                <LessonContent
                  content={content}
                  onVoiceControlsChange={setShowVoiceControls}
                  onPlayingChange={setIsPlaying}
                  tokens={tokens}
                  setTokens={setTokens}
                />
              </div>

              <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-primary/10 shadow-xl animate-slide-up mx-4 sm:mx-0">
                <LessonProgress
                  lessonId={lessonId!}
                  content={content}
                  questionsAnswers={questionsAnswers}
                />
              </div>

              {showVoiceControls && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in w-[calc(100%-2rem)] sm:w-auto">
                  <div className="bg-secondary-dark/90 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-primary/20 shadow-2xl">
                    <LessonControls 
                      isPlaying={isPlaying}
                      onPlayPause={handlePlayPause}
                    />
                  </div>
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent blur-2xl -z-10" />
                <div className="border-t border-primary/10 pt-8">
                  <div className="bg-secondary-dark/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-primary/10 shadow-lg hover:shadow-xl transition-shadow duration-300 mx-4 sm:mx-0">
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
