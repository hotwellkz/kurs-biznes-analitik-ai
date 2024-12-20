import { useState, useEffect } from 'react';
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Chat } from "../components/Chat";
import { ModuleAccordion } from "../components/program/ModuleAccordion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Program = () => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCompletedLessons = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data, error } = await supabase
          .from('lesson_progress')
          .select('lesson_id')
          .eq('user_id', session.user.id)
          .eq('completed', true);

        if (error) throw error;

        if (data) {
          setCompletedLessons(data.map(item => item.lesson_id));
        }
      } catch (error) {
        console.error('Error fetching completed lessons:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить прогресс уроков",
          variant: "destructive",
        });
      }
    };

    fetchCompletedLessons();
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navigation />
      <Breadcrumbs />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in">
              Программа курса
            </h1>
            
            <div className="space-y-6 animate-slide-up">
              <ModuleAccordion completedLessons={completedLessons} />
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Персональный ИИ-ассистент
            </h2>
            <p className="text-gray-400 mb-4">
              Задавайте вопросы нашему ИИ-ассистенту по материалам курса. Каждый вопрос стоит 1 токен.
            </p>
            <Chat />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Program;