import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useEffect } from "react";
import { Chat } from "../components/Chat";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Program = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navigation />
      <Breadcrumbs />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in">
              Программа курса
            </h1>
            
            <div className="space-y-6 animate-slide-up">
              <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="module-1" className="border-none">
              <AccordionTrigger className="bg-secondary/50 hover:bg-secondary px-6 py-4 rounded-lg text-white hover:no-underline">
                Модуль 1: Введение в профессию бизнес-аналитика
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-300 space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">Урок 1.1: Кто такой бизнес-аналитик?</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-400">
                    <li>Основные роли и обязанности</li>
                    <li>Ключевые навыки и инструменты</li>
                    <li>Примеры задач</li>
                    <li>Тест: Понимание роли бизнес-аналитика</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Урок 1.2: Жизненный цикл разработки (SDLC)</h3>
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
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Персональный ИИ-ассистент
            </h2>
            <p className="text-gray-400 mb-4">
              Задавайте вопросы нашему ИИ-ассистенту по материалам курса. Каждый вопрос стоит 1 токен.
            </p>
            <Chat />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Program;
