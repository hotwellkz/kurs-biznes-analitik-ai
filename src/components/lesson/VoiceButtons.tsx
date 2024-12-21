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
        className="relative overflow-hidden border-primary/20 hover:bg-primary/5 text-secondary group"
      >
        {isVoiceLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Volume2 className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
        )}
        <span className="relative z-10">Озвучить бесплатно</span>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>

      <Button
        onClick={onPlayPremiumVoice}
        disabled={isVoiceLoading || isPlaying}
        className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-hover text-white group"
      >
        {isVoiceLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-light/20 to-transparent animate-pulse" />
          </>
        ) : (
          <Crown className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
        )}
        <span className="relative z-10">Озвучить красивым голосом (45 токенов)</span>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-light/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>
    </>
  );
};