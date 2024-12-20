import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

interface LessonControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

export const LessonControls = ({ isPlaying, onPlayPause }: LessonControlsProps) => {
  return (
    <div className="flex gap-4">
      <Button onClick={onPlayPause} variant="outline">
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
  );
};