import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Ошибка при выходе",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Выход выполнен успешно",
      description: "Вы успешно вышли из системы",
    });
    
    // Принудительно перенаправляем на главную страницу
    window.location.href = '/';
  };

  const openAuth = (mode: 'sign_in' | 'sign_up') => {
    navigate(`/${mode === 'sign_in' ? 'login' : 'register'}`);
  };

  return {
    handleSignOut,
    openAuth
  };
};