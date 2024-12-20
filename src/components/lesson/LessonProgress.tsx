import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

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
    <div className="space-y-8">
      <div className="prose prose-invert max-w-none">
        <div 
          className="text-gray-200" 
          dangerouslySetInnerHTML={{ 
            __html: content
              .replace(/### (.*?)\n/g, '<h3 class="text-white text-xl font-bold mb-4">$1</h3>\n')
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') 
          }} 
        />
      </div>

      {questionsAnswers.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Ваши вопросы и ответы:</h3>
          {questionsAnswers.map((qa, index) => (
            <div key={index} className="bg-secondary/50 p-4 rounded-lg space-y-2">
              <p className="text-primary font-semibold">{qa.question}</p>
              <p className="text-gray-300">{qa.answer}</p>
            </div>
          ))}
        </div>
      )}

      <div className="pt-8">
        <Button
          onClick={completeLesson}
          disabled={isCompleting}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Завершить урок
        </Button>
      </div>
    </div>
  );
};