import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';
import { AdminLink } from './AdminLink';

interface MobileNavProps {
  isAuthenticated: boolean;
  tokens: number | null;
  handleSignOut: () => Promise<void>;
  openAuth: (mode: 'sign_in' | 'sign_up') => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileNav = ({
  isAuthenticated,
  tokens,
  handleSignOut,
  openAuth,
  setIsOpen
}: MobileNavProps) => {
  return (
    <div className="md:hidden flex flex-col space-y-4 items-center">
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
      <Link 
        to="/pricing" 
        className="text-white hover:text-primary transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Цены
      </Link>
      <AdminLink />
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
  );
};