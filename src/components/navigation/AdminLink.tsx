import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

export const AdminLink = () => {
  return (
    <Link 
      to="/admin" 
      className="text-white hover:text-primary transition-colors"
      title="Админ панель"
    >
      <Settings className="w-5 h-5" />
    </Link>
  );
};