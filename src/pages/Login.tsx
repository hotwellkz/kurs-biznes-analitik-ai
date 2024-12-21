import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Auth } from "@/components/Auth";
import { useState } from "react";

const Login = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navigation />
      <Breadcrumbs />
      <main className="flex-grow container mx-auto px-4 py-12">
        <Auth isOpen={isOpen} onClose={handleClose} mode="sign_in" />
      </main>
      <Footer />
    </div>
  );
};

export default Login;