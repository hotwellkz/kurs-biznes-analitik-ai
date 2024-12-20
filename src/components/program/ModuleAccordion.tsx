import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ModuleAccordionProps {
  completedLessons: string[];
}

export const ModuleAccordion = ({ completedLessons }: ModuleAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
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
    </Accordion>
  );
};
