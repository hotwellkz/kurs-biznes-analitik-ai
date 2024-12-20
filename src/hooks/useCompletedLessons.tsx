import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useCompletedLessons = () => {
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

  return completedLessons;
};