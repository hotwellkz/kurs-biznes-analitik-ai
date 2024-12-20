import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  onLogin: (password: string) => Promise<void>;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onLogin(password);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Неверный пароль",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold text-white text-center mb-8">
          Панель администратора
        </h1>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
          className="bg-secondary text-white"
        />
        <Button type="submit" className="w-full">
          Войти
        </Button>
      </form>
    </div>
  );
};