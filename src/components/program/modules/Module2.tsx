import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Module2Props {
  completedLessons?: string[];
}

export const Module2 = ({ completedLessons = [] }: Module2Props) => {
  return (
    <AccordionItem value="module-2" className="border-none">
      <AccordionTrigger className="bg-secondary/50 hover:bg-secondary px-6 py-4 rounded-lg text-white hover:no-underline">
        Модуль 2: Основы анализа требований
      </AccordionTrigger>
      <AccordionContent className="px-6 py-4 text-gray-300 space-y-4">
        <div>
          <Link 
            to="/lesson/2.1"
            className={cn(
              "block hover:bg-primary/10 rounded-lg p-4 transition-colors",
              completedLessons.includes('2.1') && "text-primary"
            )}
          >
            <div className="flex items-center gap-3">
              {completedLessons.includes('2.1') && (
                <Check className="w-5 h-5 text-primary" />
              )}
              <div>
                <h3 className="text-white font-semibold mb-2">Урок 2.1: Сбор требований</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Методы сбора требований (интервью, опросы, мозговые штурмы)</li>
                  <li>Работа с ключевыми заинтересованными сторонами (stakeholders)</li>
                  <li>Тест: Методы сбора требований</li>
                </ul>
              </div>
            </div>
          </Link>
        </div>
        
        <div>
          <Link 
            to="/lesson/2.2"
            className={cn(
              "block hover:bg-primary/10 rounded-lg p-4 transition-colors",
              completedLessons.includes('2.2') && "text-primary"
            )}
          >
            <div className="flex items-center gap-3">
              {completedLessons.includes('2.2') && (
                <Check className="w-5 h-5 text-primary" />
              )}
              <div>
                <h3 className="text-white font-semibold mb-2">Урок 2.2: Документирование требований</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Создание BRD (Business Requirements Document)</li>
                  <li>User stories и Acceptance criteria</li>
                  <li>Тест: Форматы и структура требований</li>
                </ul>
              </div>
            </div>
          </Link>
        </div>
        
        <div>
          <Link 
            to="/lesson/2.3"
            className={cn(
              "block hover:bg-primary/10 rounded-lg p-4 transition-colors",
              completedLessons.includes('2.3') && "text-primary"
            )}
          >
            <div className="flex items-center gap-3">
              {completedLessons.includes('2.3') && (
                <Check className="w-5 h-5 text-primary" />
              )}
              <div>
                <h3 className="text-white font-semibold mb-2">Урок 2.3: Управление изменениями требований</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Как отслеживать изменения</li>
                  <li>Управление версиями и согласования</li>
                  <li>Тест: Управление изменениями требований</li>
                </ul>
              </div>
            </div>
          </Link>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};