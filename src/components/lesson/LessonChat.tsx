import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { Loader2 } from "lucide-react";

interface LessonChatProps {
  lessonId: string;
  tokens: number | null;
  setTokens: (tokens: number | null) => void;
}

export const LessonChat = ({ lessonId, tokens, setTokens }: LessonChatProps) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const askQuestion = async (selectedQuestion?: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Требуется авторизация",
          description: "Пожалуйста, войдите в систему",
          variant: "destructive",
        });
        return;
      }

      if (tokens !== null && tokens < 5) {
        toast({
          title: "Недостаточно токенов",
          description: "Для вопроса требуется 5 токенов",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);

      const { data: profile } = await supabase
        .from('profiles')
        .update({ tokens: tokens! - 5 })
        .eq('id', session.user.id)
        .select()
        .single();

      if (profile) {
        setTokens(profile.tokens);
      }

      const questionToAsk = selectedQuestion || question;

      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [
            {
              role: 'system',
              content: 'Ты - опытный преподаватель бизнес-анализа. Твоя задача - подробно и структурированно отвечать на вопросы студентов, используя практические примеры.'
            },
            {
              role: 'user',
              content: questionToAsk
            }
          ]
        }
      });

      if (error) throw error;

      const answer = data.choices[0].message.content;

      // Get existing questions and answers
      const { data: lessonProgress } = await supabase
        .from('lesson_progress')
        .select('questions_answers')
        .eq('user_id', session.user.id)
        .eq('lesson_id', lessonId)
        .single();

      const existingQA = lessonProgress?.questions_answers || [];
      const updatedQA = [...existingQA, { question: questionToAsk, answer }];

      // Update the lesson progress with new Q&A
      await supabase
        .from('lesson_progress')
        .update({ questions_answers: updatedQA })
        .eq('user_id', session.user.id)
        .eq('lesson_id', lessonId);

      setQuestion('');

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось получить ответ",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Задайте вопрос по теме урока..."
          className="bg-secondary/30 backdrop-blur-sm text-white border-primary/20 focus:border-primary/40"
        />
        <Button
          onClick={() => askQuestion()}
          disabled={isLoading || !question}
          className="bg-primary hover:bg-primary-hover text-white font-semibold px-6"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Спросить'}
        </Button>
      </div>

      <SuggestedQuestions onQuestionSelect={(q) => {
        setQuestion(q);
        askQuestion(q);
      }} />
    </div>
  );
};