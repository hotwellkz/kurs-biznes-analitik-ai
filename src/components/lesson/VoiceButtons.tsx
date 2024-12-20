import { Button } from '@/components/ui/button';
import { Loader2, Play, Pause } from 'lucide-react';

interface VoiceButtonsProps {
  isVoiceLoading: boolean;
  isPlaying: boolean;
  onPlayFreeVoice: () => void;
  onPlayPremiumVoice: () => void;
}

export const VoiceButtons = ({
  isVoiceLoading,
  isPlaying,
  onPlayFreeVoice,
  onPlayPremiumVoice
}: VoiceButtonsProps) => {
  return (
    <>
      <Button
        onClick={onPlayFreeVoice}
        disabled={isVoiceLoading}
        variant="outline"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 mr-2" />
        ) : (
          <Play className="w-4 h-4 mr-2" />
        )}
        Озвучить бесплатно
      </Button>

      <Button
        onClick={onPlayPremiumVoice}
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
    </>
  );
};