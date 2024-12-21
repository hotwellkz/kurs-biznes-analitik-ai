import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { supabase } from '@/integrations/supabase/client';
import { ThemeSupa } from '@supabase/auth-ui-shared';
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
      <div className="w-full max-w-md mx-auto p-6 space-y-8 bg-secondary/50 backdrop-blur-sm rounded-xl shadow-xl animate-fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">
            {mode === 'sign_in' ? 'Добро пожаловать!' : 'Создайте аккаунт'}
          </h2>
          <p className="text-gray-400">
            {mode === 'sign_in' 
              ? 'Войдите в свой аккаунт, чтобы продолжить' 
              : 'Зарегистрируйтесь, чтобы начать обучение'}
          </p>
        </div>

        <SupabaseAuth
          supabaseClient={supabase}
          view={mode}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#FF3B3B',
                  brandAccent: '#FF5252',
                  inputBackground: 'transparent',
                  inputText: 'white',
                  inputPlaceholder: '#9CA3AF',
                },
              },
            },
            className: {
              container: 'w-full',
              button: 'bg-primary hover:bg-primary-hover transition-colors duration-200',
              input: 'bg-secondary/50 border-gray-600 text-white placeholder-gray-400 focus:border-primary transition-colors duration-200',
              divider: 'bg-gray-600',
              message: 'text-white',
              anchor: 'text-primary hover:text-primary-hover transition-colors duration-200',
              label: 'text-gray-300',
            },
          }}
          providers={['google']}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email адрес',
                password_label: 'Пароль',
                button_label: 'Войти',
                loading_button_label: 'Вход...',
                social_provider_text: 'Войти через {{provider}}',
                link_text: 'Уже есть аккаунт? Войти',
                email_input_placeholder: 'Ваш email адрес',
                password_input_placeholder: 'Ваш пароль'
              },
              sign_up: {
                email_label: 'Email адрес',
                password_label: 'Пароль',
                button_label: 'Регистрация',
                loading_button_label: 'Регистрация...',
                social_provider_text: 'Зарегистрироваться через {{provider}}',
                link_text: 'Нет аккаунта? Зарегистрироваться',
                confirmation_text: 'Проверьте свою электронную почту для подтверждения',
                email_input_placeholder: 'Ваш email адрес',
                password_input_placeholder: 'Ваш пароль'
              },
              magic_link: {
                email_input_label: 'Email адрес',
                button_label: 'Отправить магическую ссылку',
                loading_button_label: 'Отправка магической ссылки...',
                link_text: 'Отправить магическую ссылку',
                confirmation_text: 'Проверьте свою электронную почту для входа',
                email_input_placeholder: 'Ваш email адрес'
              },
              forgotten_password: {
                email_label: 'Email адрес',
                button_label: 'Отправить инструкции',
                loading_button_label: 'Отправка инструкций...',
                link_text: 'Забыли пароль?',
                confirmation_text: 'Проверьте свою электронную почту для сброса пароля',
                email_input_placeholder: 'Ваш email адрес'
              },
              update_password: {
                password_label: 'Пароль',
                button_label: 'Обновить пароль',
                loading_button_label: 'Обновление пароля...',
                confirmation_text: 'Ваш пароль был успешно обновлен',
                password_input_placeholder: 'Ваш новый пароль'
              }
            },
          }}
        />
      </div>
      <AuthModal isOpen={showGiftModal} onClose={handleGiftModalClose} />
    </>
  );
};