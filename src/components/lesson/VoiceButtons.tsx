import { Button } from '@/components/ui/button';
import { Volume2, Crown, Loader2 } from 'lucide-react';

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
        disabled={isVoiceLoading || isPlaying}
        variant="outline"
        className="border-primary/20 hover:bg-primary/5 text-secondary"
      >
        {isVoiceLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Volume2 className="w-4 h-4 mr-2" />
        )}
        Озвучить бесплатно
      </Button>

      <Button
        onClick={onPlayPremiumVoice}
        disabled={isVoiceLoading || isPlaying}
        className="bg-primary hover:bg-primary-hover text-white"
      >
        {isVoiceLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Crown className="w-4 h-4 mr-2" />
        )}
        Озвучить красивым голосом (45 токенов)
      </Button>
    </>
  );
};