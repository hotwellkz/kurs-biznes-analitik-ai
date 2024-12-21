import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      // Очищаем локальное хранилище
      localStorage.clear();
      
      // Показываем уведомление об успешном выходе
      toast({
        title: "Выход выполнен успешно",
        description: "Вы успешно вышли из системы",
      });
      
      // Принудительно перенаправляем на главную страницу и перезагружаем
      window.location.href = '/';
    } catch (error: any) {
      toast({
        title: "Ошибка при выходе",
        description: error.message || "Произошла ошибка при выходе из системы",
        variant: "destructive"
      });
    }
  };

  const openAuth = (mode: 'sign_in' | 'sign_up') => {
    navigate(`/${mode === 'sign_in' ? 'login' : 'register'}`);
  };

  return {
    handleSignOut,
    openAuth
  };
};