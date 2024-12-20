import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LessonHeaderProps {
  isLoading: boolean;
  onStartLesson: () => void;
}

export const LessonHeader = ({ isLoading, onStartLesson }: LessonHeaderProps) => {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
        Урок 1.1: Кто такой бизнес-аналитик?
      </h1>

      <Button
        id="start-lesson-button"
        onClick={onStartLesson}
        disabled={isLoading}
        className="bg-primary hover:bg-primary-hover text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Готовлю урок...
          </>
        ) : (
          'Начать урок'
        )}
      </Button>
    </>
  );
};