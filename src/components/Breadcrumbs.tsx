import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const Breadcrumbs = () => {
  const location = useLocation();
  
  if (location.pathname === '/') return null;
  
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const breadcrumbItems = {
    'program': 'Программа курса',
    'privacy': 'Политика конфиденциальности',
    'terms': 'Публичная оферта',
    'pricing': 'Тарифы и цены',
    'login': 'Вход',
    'register': 'Регистрация',
    'admin': 'Админ панель',
    '5.2': 'Финальный проект'
  };

  const getLessonTitle = (lessonId: string) => {
    const lessonTitles: { [key: string]: string } = {
      '1.1': 'Кто такой бизнес-аналитик?',
      '1.2': 'Жизненный цикл разработки (SDLC)',
      '2.1': 'Сбор требований',
      '2.2': 'Документирование требований',
      '2.3': 'Управление изменениями требований',
      '3.1': 'SWOT, PESTEL и другие методы анализа',
      '3.2': 'Моделирование процессов',
      '3.3': 'Инструменты аналитика',
      '4.1': 'Основы проектного менеджмента',
      '4.2': 'Agile и Scrum',
      '5.1': 'Кейсы реального мира',
      '5.2': 'Финальный проект'
    };
    return lessonTitles[lessonId] || lessonId;
  };
  
  return (
    <nav className="bg-secondary/50 py-2 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex items-center text-sm text-gray-400">
          <Link to="/" className="hover:text-primary transition-colors">
            Главная
          </Link>
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            let title = breadcrumbItems[segment as keyof typeof breadcrumbItems];
            
            // Handle lesson pages
            if (segment === 'lesson') {
              title = 'Урок';
            } else if (pathSegments[0] === 'lesson') {
              title = `Урок ${segment}: ${getLessonTitle(segment)}`;
            }

            return (
              <div key={segment} className="flex items-center">
                <ChevronRight className="mx-2 h-4 w-4" />
                {isLast ? (
                  <span className="text-white">{title}</span>
                ) : (
                  <Link 
                    to={`/${pathSegments.slice(0, index + 1).join('/')}`}
                    className="hover:text-primary transition-colors"
                  >
                    {title}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
