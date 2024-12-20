import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/program');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Вход в систему</h2>
          <Auth
            supabaseClient={supabase}
            view="sign_in"
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
                container: 'w-full',
                anchor: 'text-primary hover:text-primary-hover',
                divider: 'bg-primary/20',
                message: 'text-white',
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
                  forgotten_password_label: 'Забыли пароль?',
                  placeholder_email: 'Ваш email адрес',
                  placeholder_password: 'Ваш пароль'
                },
                magic_link: {
                  button_label: 'Отправить магическую ссылку',
                  loading_button_label: 'Отправка магической ссылки...',
                  link_text: 'Отправить магическую ссылку',
                  confirmation_text: 'Проверьте свою электронную почту для входа',
                  placeholder_email: 'Ваш email адрес'
                },
                forgotten_password: {
                  button_label: 'Отправить инструкции',
                  loading_button_label: 'Отправка инструкций...',
                  link_text: 'Забыли пароль?',
                  confirmation_text: 'Проверьте свою электронную почту для сброса пароля',
                  placeholder_email: 'Ваш email адрес'
                }
              },
            }}
          />
          <div className="mt-4 text-center">
            <span className="text-gray-400">Нет аккаунта? </span>
            <Link to="/register" className="text-primary hover:text-primary-hover">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;