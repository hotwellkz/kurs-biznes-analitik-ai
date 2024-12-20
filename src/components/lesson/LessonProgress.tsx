import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LessonMainContent } from './LessonMainContent';
import { useNavigate } from 'react-router-dom';

interface LessonProgressProps {
  lessonId: string;
  content: string;
  questionsAnswers: Array<{ question: string; answer: string }>;
}

export const LessonProgress = ({ 
  lessonId, 
  content, 
  questionsAnswers,
}: LessonProgressProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCompleting, setIsCompleting] = useState(false);

  const completeLesson = async () => {
    try {
      setIsCompleting(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Требуется авторизация",
          description: "Пожалуйста, войдите в систему",
          variant: "destructive",
        });
        return;
      }

      await supabase
        .from('lesson_progress')
        .update({
          completed: true,
          completed_at: new Date().toISOString()
        })
        .eq('user_id', session.user.id)
        .eq('lesson_id', lessonId);

      toast({
        title: "Урок завершен",
        description: "Поздравляем с завершением урока!",
      });

      navigate('/program');

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