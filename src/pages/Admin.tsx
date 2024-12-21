import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { UserManagement } from "@/components/admin/UserManagement";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (password: string): Promise<void> => {
    try {
      // Проверяем пароль через таблицу admins
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('password', password)
        .single();

      if (error || !data) {
        throw new Error('Неверный пароль');
      }

      setIsAuthenticated(true);
      toast({
        title: "Успешно",
        description: "Вы вошли в админ панель",
      });
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || "Произошла ошибка при входе",
        variant: "destructive"
      });
      throw error;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navigation />
      <Breadcrumbs />
      <main className="flex-grow container mx-auto px-4 py-12">
        {isAuthenticated ? (
          <UserManagement />
        ) : (
          <AdminLogin onLogin={handleLogin} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Admin;