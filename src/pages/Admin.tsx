import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/program');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navigation />
      <Breadcrumbs />
      <main className="flex-grow container mx-auto px-4 py-12">
        <AdminLogin onLogin={handleLogin} />
      </main>
      <Footer />
    </div>
  );
};

export default Admin;