import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const Chat = () => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const askQuestion = async () => {
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

      // Get current tokens
      const { data: profile } = await supabase
        .from('profiles')
        .select('tokens')
        .eq('id', session.user.id)
        .single();

      if (!profile || profile.tokens < 5) {
        toast({
          title: "Недостаточно токенов",
          description: "Для вопроса требуется 5 токенов",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);

      // Deduct tokens
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update({ tokens: profile.tokens - 5 })
        .eq('id', session.user.id)
        .select()
        .single();

      if (updateError) throw updateError;

      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [
            {
              role: 'system',
              content: 'Ты - опытный преподаватель бизнес-анализа. Твоя задача - подробно и структурированно отвечать на вопросы студентов, используя практические примеры.'
            },
            {
              role: 'user',
              content: question
            }
          ]
        }
      });

      if (error) throw error;

      const answer = data.choices[0].message.content;

      // Store the Q&A in the database
      const { error: chatError } = await supabase
        .from('chat_history')
        .insert({
          user_id: session.user.id,
          question,
          answer
        });

      if (chatError) throw chatError;

      // Instead of reloading the page, we'll trigger a re-render of the parent
      // by forcing a re-fetch of the chat history
      window.dispatchEvent(new Event('chatUpdated'));

      setQuestion('');
      
      toast({
        title: "Успешно",
        description: "Ответ получен",
      });

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
    <div className="flex flex-col sm:flex-row gap-4">
      <Input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Задайте вопрос по материалам курса..."
        className="flex-grow bg-secondary/30 backdrop-blur-sm text-white border-primary/20 focus:border-primary/40 rounded-xl"
      />
      <Button
        onClick={askQuestion}
        disabled={isLoading || !question}
        className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-hover text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Спросить'}
      </Button>
    </div>
  );
};