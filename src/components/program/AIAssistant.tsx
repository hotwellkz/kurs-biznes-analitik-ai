import { FC } from 'react';
import { Chat } from "@/components/Chat";

export const AIAssistant: FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        Персональный ИИ-ассистент
      </h2>
      <p className="text-gray-400 mb-4">
        Задавайте вопросы нашему ИИ-ассистенту по материалам курса. Каждый вопрос стоит 1 токен.
      </p>
      <Chat />
    </div>
  );
};