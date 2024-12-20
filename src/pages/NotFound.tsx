import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-secondary to-secondary-dark">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white">404</h1>
          <p className="text-xl text-gray-400">Страница не найдена</p>
          <Link to="/">
            <Button className="bg-primary hover:bg-primary-hover text-white flex items-center gap-2">
              <Home className="w-5 h-5" />
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;