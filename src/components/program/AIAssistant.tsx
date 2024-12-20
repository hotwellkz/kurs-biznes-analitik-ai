import { FC, useEffect, useState } from 'react';
import { Chat } from "@/components/Chat";
import { supabase } from "@/integrations/supabase/client";

interface ChatHistory {
  question: string;
  answer: string;
  created_at: string;
}

export const AIAssistant: FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from('chat_history')
          .select('question, answer, created_at')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });
        
        if (data) {
          setChatHistory(data);
        }
      }
    };

    fetchChatHistory();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        Персональный ИИ-ассистент
      </h2>
      <p className="text-gray-400 mb-4">
        Задавайте вопросы нашему ИИ-ассистенту по материалам курса. Каждый вопрос стоит 5 токенов.
      </p>
      <Chat />

      {chatHistory.length > 0 && (
        <div className="space-y-6 mt-8">
          <h3 className="text-xl font-semibold text-white">История вопросов и ответов:</h3>
          <div className="space-y-4">
            {chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className="bg-secondary/30 backdrop-blur-sm p-4 rounded-xl border border-primary/20 hover:border-primary/40 transition-colors duration-300"
              >
                <p className="text-primary-light font-semibold mb-2">{chat.question}</p>
                <p className="text-gray-300 whitespace-pre-wrap">{chat.answer}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(chat.created_at).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};