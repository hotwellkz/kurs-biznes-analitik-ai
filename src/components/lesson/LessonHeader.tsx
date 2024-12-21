import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface LessonHeaderProps {
  isLoading: boolean;
  onStartLesson: () => void;
}

export const LessonHeader = ({ isLoading, onStartLesson }: LessonHeaderProps) => {
  const [isPulsing, setIsPulsing] = useState(false);
  const { lessonId } = useParams();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getLessonTitle = () => {
    switch (lessonId) {
      case '1.1':
        return 'Урок 1.1: Кто такой бизнес-аналитик?';
      case '1.2':
        return 'Урок 1.2: Жизненный цикл разработки (SDLC)';
      case '2.1':
        return 'Урок 2.1: Сбор требований';
      case '2.2':
        return 'Урок 2.2: Документирование требований';
      case '2.3':
        return 'Урок 2.3: Управление изменениями требований';
      default:
        return 'Урок';
    }
  };

  return (
    <div className="text-center space-y-8 px-4 sm:px-0">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-primary animate-fade-in break-words">
        {getLessonTitle()}
      </h1>

      <Button
        id="start-lesson-button"
        onClick={onStartLesson}
        disabled={isLoading}
        className={`relative group bg-gradient-to-r from-primary to-primary-hover text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl disabled:opacity-70 disabled:hover:scale-100 w-full sm:w-auto ${
          isPulsing ? 'animate-pulse ring-4 ring-primary/50' : ''
        }`}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-primary-light/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Готовлю урок...</span>
          </div>
        ) : (
          'Начать урок'
        )}
      </Button>
    </div>
  );
};
