import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { VoiceButtons } from './VoiceButtons';
import { ShareButton } from './ShareButton';

interface LessonContentProps {
  content: string;
  onVoiceControlsChange: (show: boolean) => void;
  onPlayingChange: (playing: boolean) => void;
  tokens: number | null;
  setTokens: (tokens: number | null) => void;
}

export const LessonContent = ({ 
  content, 
  onVoiceControlsChange, 
  onPlayingChange,
  tokens,
  setTokens 
}: LessonContentProps) => {
  const { toast } = useToast();
  const [isVoiceLoading, setIsVoiceLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playFreeVoice = () => {
    if (!content) return;

    const cleanText = content.replace(/[#*]/g, '');
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
      onPlayingChange(false);
      onVoiceControlsChange(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    onPlayingChange(true);
    onVoiceControlsChange(true);
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

      if (tokens !== null && tokens < 45) {
        toast({
          title: "Недостаточно токенов",
          description: "Для премиум озвучки требуется 45 токенов",
          variant: "destructive",
        });
        return;
      }

      setIsVoiceLoading(true);

      const cleanText = content.replace(/[#*]/g, '');

      const { data: profile } = await supabase
        .from('profiles')
        .update({ tokens: tokens! - 45 })
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
      audio.play();
      setIsPlaying(true);
      onPlayingChange(true);
      onVoiceControlsChange(true);

      audio.onended = () => {
        setIsPlaying(false);
        onPlayingChange(false);
        onVoiceControlsChange(false);
      };

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

  return (
    <div className="flex flex-wrap gap-4">
      <VoiceButtons
        isVoiceLoading={isVoiceLoading}
        isPlaying={isPlaying}
        onPlayFreeVoice={playFreeVoice}
        onPlayPremiumVoice={playPremiumVoice}
      />
      <ShareButton content={content} />
    </div>
  );
};