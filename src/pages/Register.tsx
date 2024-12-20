import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft } from 'lucide-react';
import { AuthModal } from '@/components/AuthModal';

const Register = () => {
  const navigate = useNavigate();
  const [showGiftModal, setShowGiftModal] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        if (session?.user) {
          setShowGiftModal(true);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleGiftModalClose = () => {
    setShowGiftModal(false);
    navigate('/program');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center">
          <Link to="/" className="text-white hover:text-primary transition-colors flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Вернуться на главную
          </Link>
        </div>
        <div className="bg-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Регистрация</h2>
          <Auth
            supabaseClient={supabase}
            view="sign_up"
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
            showLinks={false}
            providers={[]}
          />
          <div className="mt-4 text-center">
            <span className="text-gray-400">Уже есть аккаунт? </span>
            <Link to="/login" className="text-primary hover:text-primary-hover">
              Войти
            </Link>
          </div>
        </div>
      </div>
      <AuthModal isOpen={showGiftModal} onClose={handleGiftModalClose} />
    </div>
  );
};

export default Register;