import { useState, useEffect } from 'react';
import { Menu, X, Coins } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Auth } from './Auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'sign_in' | 'sign_up'>('sign_in');
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-primary transition-colors">
              Главная
            </Link>
            <Link to="/program" className="text-white hover:text-primary transition-colors">
              Программа
            </Link>
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-white">
                  <Coins className="w-5 h-5 text-primary" />
                  <span>{tokens} токенов</span>
                </div>
                <Button 
                  variant="ghost"
                  onClick={handleSignOut}
                  className="text-white hover:text-primary transition-colors"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => openAuth('sign_in')}
                  className="text-white hover:text-primary transition-colors"
                >
                  Вход
                </Button>
                <Button 
                  onClick={() => openAuth('sign_up')}
                  className="bg-primary hover:bg-primary-hover text-white transition-colors"
                >
                  Регистрация
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-secondary/95 backdrop-blur-sm py-4">
            <div className="flex flex-col space-y-4 items-center">
              <Link 
                to="/" 
                className="text-white hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Главная
              </Link>
              <Link 
                to="/program" 
                className="text-white hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Программа
              </Link>
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 text-white">
                    <Coins className="w-5 h-5 text-primary" />
                    <span>{tokens} токенов</span>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="text-white hover:text-primary transition-colors"
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      openAuth('sign_in');
                      setIsOpen(false);
                    }}
                    className="text-white hover:text-primary transition-colors"
                  >
                    Вход
                  </Button>
                  <Button
                    onClick={() => {
                      openAuth('sign_up');
                      setIsOpen(false);
                    }}
                    className="bg-primary hover:bg-primary-hover text-white transition-colors"
                  >
                    Регистрация
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
