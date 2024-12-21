import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Auth } from "@/components/Auth";
import { useState } from "react";

const Register = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navigation />
      <Breadcrumbs />
      <main className="flex-grow container mx-auto px-4 py-12 relative">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" />
        <div className="relative z-10">
          <Auth isOpen={isOpen} onClose={handleClose} mode="sign_up" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;