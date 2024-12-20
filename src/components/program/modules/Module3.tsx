import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Module3 = () => {
  return (
    <AccordionItem value="module-3" className="border-none">
      <AccordionTrigger className="bg-secondary/50 hover:bg-secondary px-6 py-4 rounded-lg text-white hover:no-underline">
        Модуль 3: Методы и инструменты анализа
      </AccordionTrigger>
      <AccordionContent className="px-6 py-4 text-gray-300 space-y-4">
        <div>
          <h3 className="text-white font-semibold mb-2">Урок 3.1: SWOT, PESTEL и другие методы анализа</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Описание методов</li>
            <li>Примеры применения</li>
            <li>Тест: Методы анализа и их практическое применение</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Урок 3.2: Моделирование процессов</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Основы BPMN (Business Process Model and Notation)</li>
            <li>Построение диаграмм процессов</li>
            <li>Тест: Понимание BPMN</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Урок 3.3: Инструменты аналитика</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Обзор инструментов (Jira, Confluence, MS Visio)</li>
            <li>Практика работы с одним из инструментов</li>
            <li>Тест: Навыки работы с инструментами</li>
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};