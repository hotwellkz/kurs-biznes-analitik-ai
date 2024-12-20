import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Требуется авторизация",
          description: "Пожалуйста, войдите в систему чтобы использовать чат",
          variant: "destructive",
        });
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('tokens')
        .eq('id', session.user.id)
        .single();

      if (!profile || profile.tokens < 1) {
        toast({
          title: "Недостаточно токенов",
          description: "Для использования чата необходим минимум 1 токен",
          variant: "destructive",
        });
        return;
      }

      const userMessage: Message = { role: 'user', content: input };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [...messages, userMessage],
        }
      });

      if (error) {
        throw error;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      // Уменьшаем количество токенов
      await supabase
        .from('profiles')
        .update({ tokens: profile.tokens - 1 })
        .eq('id', session.user.id);

      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-secondary/50 rounded-lg p-4">
      <ScrollArea className="flex-grow mb-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary text-white ml-auto'
                  : 'bg-secondary text-white'
              } max-w-[80%] ${message.role === 'user' ? 'ml-auto' : 'mr-auto'}`}
            >
              {message.content}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Задайте вопрос..."
          className="flex-grow"
          disabled={isLoading}
        />
        <Button 
          onClick={sendMessage} 
          disabled={isLoading}
          className="bg-primary hover:bg-primary-hover"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Отправить'}
        </Button>
      </div>
    </div>
  );
};