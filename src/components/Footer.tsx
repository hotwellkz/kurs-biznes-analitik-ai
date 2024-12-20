import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-secondary py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <Link to="/" className="text-2xl font-bold text-white hover:text-primary transition-colors">
              БизнесАналитик.AI
            </Link>
            <p className="mt-4 text-gray-400">
              Персональное обучение с ИИ-наставником
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="text-white font-semibold mb-4">Документы</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">
                Публичная оферта
              </Link>
              <Link to="/program" className="text-gray-400 hover:text-primary transition-colors">
                Программа курса
              </Link>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              © 2024 БизнесАналитик.AI
              <br />
              Все права защищены
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};