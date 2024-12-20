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
            divider: 'bg-primary/20',
            message: 'text-white',
            container: 'w-full',
            anchor: 'text-primary hover:text-primary-hover',
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
      <AuthModal isOpen={showGiftModal} onClose={handleGiftModalClose} />
    </>
  );
};