import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { UserManagement } from '@/components/admin/UserManagement';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (password: string) => {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('password', password)
      .single();

    if (data) {
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <AdminLogin onLogin={handleLogin} />
        ) : (
          <UserManagement />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Admin;