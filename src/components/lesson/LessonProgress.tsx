import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LessonMainContent } from './LessonMainContent';

interface LessonProgressProps {
  lessonId: string;
  content: string;
  questionsAnswers: Array<{ question: string; answer: string }>;
  onComplete: () => void;
}

export const LessonProgress = ({ 
  lessonId, 
  content, 
  questionsAnswers,
  onComplete 
}: LessonProgressProps) => {
  const { toast } = useToast();
  const [isCompleting, setIsCompleting] = useState(false);

  const completeLesson = async () => {
    try {
      setIsCompleting(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      await supabase
        .from('lesson_progress')
        .update({
          completed: true,
          completed_at: new Date().toISOString()
        })
        .eq('user_id', session.user.id)
        .eq('lesson_id', lessonId);

      onComplete();

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось завершить урок",
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <LessonMainContent
      content={content}
      questionsAnswers={questionsAnswers}
      isCompleting={isCompleting}
      onComplete={completeLesson}
    />
  );
};