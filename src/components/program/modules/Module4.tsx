import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Module4Props {
  completedLessons?: string[];
}

export const Module4 = ({ completedLessons = [] }: Module4Props) => {
  return (
    <AccordionItem value="module-4" className="border-none">
      <AccordionTrigger className="bg-secondary/50 hover:bg-secondary px-6 py-4 rounded-lg text-white hover:no-underline">
        Модуль 4: Управление проектами
      </AccordionTrigger>
      <AccordionContent className="px-6 py-4 text-gray-300 space-y-4">
        <div>
          <Link 
            to="/lesson/4.1"
            className={cn(
              "block hover:bg-primary/10 rounded-lg p-4 transition-colors",
              completedLessons.includes('4.1') && "text-primary"
            )}
          >
            <div className="flex items-center gap-3">
              {completedLessons.includes('4.1') && (
                <Check className="w-5 h-5 text-primary" />
              )}
              <div>
                <h3 className="text-white font-semibold mb-2">Урок 4.1: Основы проектного менеджмента</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Основные понятия (scope, schedule, budget)</li>
                  <li>Взаимодействие с командой проекта</li>
                  <li>Тест: Понимание основ управления проектами</li>
                </ul>
              </div>
            </div>
          </Link>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Урок 4.2: Agile и Scrum</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Основы Agile</li>
            <li>Роль бизнес-аналитика в Scrum-команде</li>
            <li>Тест: Основы Agile</li>
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};