import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DesktopNav } from './navigation/DesktopNav';
import { MobileNav } from './navigation/MobileNav';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tokens, setTokens] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Выход выполнен успешно",
      description: "Вы успешно вышли из системы",
    });
    if (location.pathname.includes('/lesson/')) {
      navigate('/program');
    } else {
      navigate('/');
    }
  };

  const openAuth = (mode: 'sign_in' | 'sign_up') => {
    navigate(`/${mode === 'sign_in' ? 'login' : 'register'}`);
  };

  return (
    <nav className="fixed w-full bg-secondary/95 backdrop-blur-sm z-50 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold hover:text-primary transition-colors">
            БизнесАналитик.AI
          </Link>

          <DesktopNav
            isAuthenticated={isAuthenticated}
            tokens={tokens}
            handleSignOut={handleSignOut}
            openAuth={openAuth}
          />

          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-secondary/95 backdrop-blur-sm py-4">
            <MobileNav
              isAuthenticated={isAuthenticated}
              tokens={tokens}
              handleSignOut={handleSignOut}
              openAuth={openAuth}
              setIsOpen={setIsOpen}
            />
          </div>
        )}
      </div>
    </nav>
  );
};