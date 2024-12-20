import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const Breadcrumbs = () => {
  const location = useLocation();
  
  if (location.pathname === '/') return null;
  
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const breadcrumbItems = {
    'program': 'Программа курса',
    'privacy': 'Политика конфиденциальности',
    'terms': 'Публичная оферта'
  };
  
  return (
    <nav className="bg-secondary/50 py-2 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex items-center text-sm text-gray-400">
          <Link to="/" className="hover:text-primary transition-colors">
            Главная
          </Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="text-white">
            {breadcrumbItems[pathSegments[0] as keyof typeof breadcrumbItems]}
          </span>
        </div>
      </div>
    </nav>
  );
};