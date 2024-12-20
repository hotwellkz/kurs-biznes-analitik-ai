import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { supabase } from '@/integrations/supabase/client';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Eye, EyeOff } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { useToast } from '@/hooks/use-toast';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'sign_in' | 'sign_up';
}

export const Auth = ({ isOpen, onClose, mode = 'sign_in' }: AuthProps) => {
  const [showGiftModal, setShowGiftModal] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      if (session?.user) {
        onClose();
        if (mode === 'sign_up') {
          setShowGiftModal(true);
        } else {
          navigate('/program');
        }
      }
    }
  });

  const handleGiftModalClose = () => {
    setShowGiftModal(false);
    navigate('/program');
  };

  return (
    <>
      <SupabaseAuth
        supabaseClient={supabase}
        view={mode}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#FF3B3B',
                brandAccent: '#FF3B3B',
              },
            },
          },
          className: {
            button: 'bg-primary hover:bg-primary-hover',
            input: 'bg-background',
          },
        }}
        showLinks={true}
        providers={[]}
      />
      <AuthModal isOpen={showGiftModal} onClose={handleGiftModalClose} />
    </>
  );
};