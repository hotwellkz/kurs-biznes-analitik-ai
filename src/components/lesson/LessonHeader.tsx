import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LessonHeaderProps {
  isLoading: boolean;
  onStartLesson: () => void;
}

export const LessonHeader = ({ isLoading, onStartLesson }: LessonHeaderProps) => {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in">
        Урок 1.1: Кто такой бизнес-аналитик?
      </h1>

      <Button
        id="start-lesson-button"
        onClick={onStartLesson}
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
    </>
  );
};