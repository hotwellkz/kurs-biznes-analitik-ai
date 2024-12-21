import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useTokenManagement = () => {
  const [tokens, setTokens] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchTokens = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('tokens')
        .eq('id', session.user.id)
        .single();
      
      if (profile) {
        setTokens(profile.tokens);
      }
    }
  };

  const updateTokens = async (cost: number) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Требуется авторизация",
        description: "Пожалуйста, войдите в систему",
        variant: "destructive",
      });
      return false;
    }

    if (tokens !== null && tokens < cost) {
      toast({
        title: "Недостаточно токенов",
        description: `Для этого действия требуется ${cost} токенов`,
        variant: "destructive",
      });
      return false;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .update({ tokens: tokens! - cost })
      .eq('id', session.user.id)
      .select()
      .single();

    if (profile) {
      setTokens(profile.tokens);
      return true;
    }
    return false;
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return { tokens, setTokens, updateTokens };
};