import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { VoiceButtons } from './VoiceButtons';
import { ShareButton } from './ShareButton';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

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
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

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

      // Снимаем токены сразу после нажатия кнопки
      const { data: profile, error: updateError } = await supabase
        .from('profiles')
        .update({ tokens: tokens! - 45 })
        .eq('id', session.user.id)
        .select()
        .single();

      if (updateError) throw updateError;

      if (profile) {
        setTokens(profile.tokens);
      }

      const cleanText = content.replace(/[#*]/g, '');

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text: cleanText }
      });

      if (error) throw error;

      setAudioUrl(data.audioUrl);
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

  const handleDownload = async () => {
    if (!audioUrl) return;

    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'lesson-audio.mp3';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading audio:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось скачать аудио файл",
        variant: "destructive",
      });
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
      {audioUrl && !isPlaying && (
        <Button
          onClick={handleDownload}
          variant="outline"
          className="relative overflow-hidden border-primary/20 hover:bg-primary/5 text-secondary group"
        >
          <Download className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
          <span className="relative z-10">Скачать аудио</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      )}
    </div>
  );
};