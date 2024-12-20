import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { useAuth } from '@/hooks/useAuth';
import { useTokens } from '@/hooks/useTokens';

export const NavigationContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSignOut, openAuth } = useAuth();
  const { tokens, isAuthenticated } = useTokens();

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