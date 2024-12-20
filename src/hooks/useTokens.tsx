import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useTokens = () => {
  const [tokens, setTokens] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchTokens = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsAuthenticated(true);
        const { data: profile } = await supabase
          .from('profiles')
          .select('tokens')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setTokens(profile.tokens);
        }
      } else {
        setIsAuthenticated(false);
        setTokens(null);
      }
    };

    fetchTokens();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true);
        fetchTokens();
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setTokens(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    tokens,
    setTokens,
    isAuthenticated
  };
};