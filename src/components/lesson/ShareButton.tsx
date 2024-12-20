import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  content: string;
}

export const ShareButton = ({ content }: ShareButtonProps) => {
  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(content);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <Button
      onClick={shareOnWhatsApp}
      variant="outline"
      className="border-primary/20 hover:bg-primary/5 text-secondary"
    >
      <Share2 className="w-4 h-4 mr-2" />
      Поделиться в WhatsApp
    </Button>
  );
};