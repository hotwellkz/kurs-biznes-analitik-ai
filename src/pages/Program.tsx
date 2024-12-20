import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProgramHeader } from "@/components/program/ProgramHeader";
import { ProgramContent } from "@/components/program/ProgramContent";
import { useCompletedLessons } from "@/hooks/useCompletedLessons";

const Program = () => {
  const completedLessons = useCompletedLessons();

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navigation />
      <Breadcrumbs />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <ProgramHeader />
        <ProgramContent completedLessons={completedLessons} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Program;