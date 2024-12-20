import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-secondary/95 backdrop-blur-sm z-50 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold hover:text-primary transition-colors">
            БизнесАналитик.AI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-primary transition-colors">Главная</Link>
            <Link to="/program" className="text-white hover:text-primary transition-colors">Программа</Link>
            <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full transition-colors">
              Начать обучение
            </button>
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
              <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full transition-colors">
                Начать обучение
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};