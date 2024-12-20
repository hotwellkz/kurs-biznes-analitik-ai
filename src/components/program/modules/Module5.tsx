import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Module5 = () => {
  return (
    <AccordionItem value="module-5" className="border-none">
      <AccordionTrigger className="bg-secondary/50 hover:bg-secondary px-6 py-4 rounded-lg text-white hover:no-underline">
        Модуль 5: Практическое применение знаний
      </AccordionTrigger>
      <AccordionContent className="px-6 py-4 text-gray-300 space-y-4">
        <div>
          <h3 className="text-white font-semibold mb-2">Урок 5.1: Кейсы реального мира</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Работа с примером реального проекта</li>
            <li>Анализ требований и создание документации</li>
            <li>Тест: Кейсы и практика</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Урок 5.2: Финальный проект</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Разработка полного набора документации для вымышленного проекта</li>
            <li>Презентация проекта</li>
            <li>Оценка: Завершение проекта</li>
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};