import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Module2 = () => {
  return (
    <AccordionItem value="module-2" className="border-none">
      <AccordionTrigger className="bg-secondary/50 hover:bg-secondary px-6 py-4 rounded-lg text-white hover:no-underline">
        Модуль 2: Основы анализа требований
      </AccordionTrigger>
      <AccordionContent className="px-6 py-4 text-gray-300 space-y-4">
        <div>
          <h3 className="text-white font-semibold mb-2">Урок 2.1: Сбор требований</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Методы сбора требований (интервью, опросы, мозговые штурмы)</li>
            <li>Работа с ключевыми заинтересованными сторонами (stakeholders)</li>
            <li>Тест: Методы сбора требований</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Урок 2.2: Документирование требований</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Создание BRD (Business Requirements Document)</li>
            <li>User stories и Acceptance criteria</li>
            <li>Тест: Форматы и структура требований</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Урок 2.3: Управление изменениями требований</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Как отслеживать изменения</li>
            <li>Управление версиями и согласования</li>
            <li>Тест: Управление изменениями требований</li>
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};