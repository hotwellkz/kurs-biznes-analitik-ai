import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Выход выполнен успешно",
      description: "Вы успешно вышли из системы",
    });
    navigate('/');
  };

  const openAuth = (mode: 'sign_in' | 'sign_up') => {
    navigate(`/${mode === 'sign_in' ? 'login' : 'register'}`);
  };

  return {
    handleSignOut,
    openAuth
  };
};