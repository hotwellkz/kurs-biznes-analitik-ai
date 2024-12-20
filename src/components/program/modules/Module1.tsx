import { Link } from 'react-router-dom';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Module1Props {
  completedLessons: string[];
}

export const Module1 = ({ completedLessons }: Module1Props) => {
  return (
    <AccordionItem value="module-1" className="border-none">
      <AccordionTrigger className="bg-secondary/50 hover:bg-secondary px-6 py-4 rounded-lg text-white hover:no-underline">
        Модуль 1: Введение в профессию бизнес-аналитика
      </AccordionTrigger>
      <AccordionContent className="px-6 py-4 text-gray-300 space-y-4">
        <div>
          <Link 
            to="/lesson/1.1"
            className={`flex items-center gap-2 text-white font-semibold mb-2 hover:text-primary transition-colors ${
              completedLessons.includes('1.1') ? 'text-green-500' : ''
            }`}
          >
            {completedLessons.includes('1.1') && (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            Урок 1.1: Кто такой бизнес-аналитик?
          </Link>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Основные роли и обязанности</li>
            <li>Ключевые навыки и инструменты</li>
            <li>Примеры задач</li>
            <li>Тест: Понимание роли бизнес-аналитика</li>
          </ul>
        </div>
        <div>
          <Link 
            to="/lesson/1.2"
            className={`flex items-center gap-2 text-white font-semibold mb-2 hover:text-primary transition-colors ${
              completedLessons.includes('1.2') ? 'text-green-500' : ''
            }`}
          >
            {completedLessons.includes('1.2') && (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            Урок 1.2: Жизненный цикл разработки (SDLC)
          </Link>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Основные этапы SDLC</li>
            <li>Роль бизнес-аналитика на каждом этапе</li>
            <li>Agile vs. Waterfall</li>
            <li>Тест: Основы SDLC и роль аналитика</li>
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};