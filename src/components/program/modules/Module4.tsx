import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Module4 = () => {
  return (
    <AccordionItem value="module-4" className="border-none">
      <AccordionTrigger className="bg-secondary/50 hover:bg-secondary px-6 py-4 rounded-lg text-white hover:no-underline">
        Модуль 4: Управление проектами
      </AccordionTrigger>
      <AccordionContent className="px-6 py-4 text-gray-300 space-y-4">
        <div>
          <h3 className="text-white font-semibold mb-2">Урок 4.1: Основы проектного менеджмента</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Основные понятия (scope, schedule, budget)</li>
            <li>Взаимодействие с командой проекта</li>
            <li>Тест: Понимание основ управления проектами</li>
          </ul>
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