import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export const useTestQuestions = () => {
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    switch (lessonId) {
      case '1.1':
        setQuestions([
          {
            question: "Что такое бизнес-аналитик?",
            options: [
              "Человек, который пишет код",
              "Человек, который анализирует бизнес-процессы",
              "Человек, который управляет проектами",
              "Человек, который тестирует программное обеспечение"
            ],
            correctAnswer: 1
          },
          {
            question: "Какие навыки важны для бизнес-аналитика?",
            options: [
              "Технические навыки",
              "Коммуникационные навыки",
              "Аналитические навыки",
              "Все вышеперечисленное"
            ],
            correctAnswer: 3
          },
          {
            question: "Какой метод сбора требований наиболее эффективен?",
            options: [
              "Интервью",
              "Опросы",
              "Наблюдение",
              "Все вышеперечисленное"
            ],
            correctAnswer: 3
          },
          {
            question: "Что такое SWOT-анализ?",
            options: [
              "Метод анализа требований",
              "Метод оценки рисков",
              "Метод стратегического планирования",
              "Метод тестирования"
            ],
            correctAnswer: 2
          },
          {
            question: "Какой документ описывает бизнес-требования?",
            options: [
              "Техническое задание",
              "Бизнес-требования",
              "План проекта",
              "Отчет о тестировании"
            ],
            correctAnswer: 1
          }
        ]);
        break;
      case '1.2':
        setQuestions([
          {
            question: "Что такое SDLC?",
            options: [
              "Software Development Life Cycle",
              "System Development Life Cycle",
              "Software Design Life Cycle",
              "System Design Life Cycle"
            ],
            correctAnswer: 0
          },
          {
            question: "Какой этап SDLC следует за анализом требований?",
            options: [
              "Проектирование",
              "Разработка",
              "Тестирование",
              "Внедрение"
            ],
            correctAnswer: 0
          },
          {
            question: "Что такое Agile?",
            options: [
              "Методология разработки",
              "Язык программирования",
              "Тип документации",
              "Инструмент для тестирования"
            ],
            correctAnswer: 0
          },
          {
            question: "Какой из следующих этапов является итеративным?",
            options: [
              "Анализ требований",
              "Проектирование",
              "Разработка",
              "Все вышеперечисленное"
            ],
            correctAnswer: 3
          },
          {
            question: "Что такое Waterfall?",
            options: [
              "Методология разработки",
              "Тип документации",
              "Язык программирования",
              "Инструмент для тестирования"
            ],
            correctAnswer: 0
          }
        ]);
        break;
      case '2.1':
        setQuestions([
          {
            question: "Какие основные методы сбора требований существуют?",
            options: [
              "Интервью, опросы, мозговые штурмы",
              "Анализ данных, тестирование",
              "Программирование, проектирование",
              "Все вышеперечисленное"
            ],
            correctAnswer: 0
          },
          {
            question: "Как правильно проводить интервью с заинтересованными сторонами?",
            options: [
              "Задавать открытые вопросы",
              "Задавать закрытые вопросы",
              "Игнорировать их ответы",
              "Все вышеперечисленное"
            ],
            correctAnswer: 0
          },
          {
            question: "Какие преимущества и недостатки у метода мозгового штурма?",
            options: [
              "Быстрое генерирование идей, но может быть хаотичным",
              "Структурированный процесс, но медленный",
              "Неэффективен для больших групп",
              "Все вышеперечисленное"
            ],
            correctAnswer: 0
          },
          {
            question: "Как эффективно работать со стейкхолдерами?",
            options: [
              "Регулярно общаться и получать обратную связь",
              "Игнорировать их мнения",
              "Работать только с руководством",
              "Все вышеперечисленное"
            ],
            correctAnswer: 0
          },
          {
            question: "Какие инструменты используются для документирования требований?",
            options: [
              "Microsoft Word, Excel, Visio",
              "Только текстовые редакторы",
              "Только специализированные программы",
              "Все вышеперечисленное"
            ],
            correctAnswer: 0
          }
        ]);
        break;
      case '2.2':
        setQuestions([
          {
            question: "Что такое BRD (Business Requirements Document)?",
            options: [
              "Технический документ с кодом",
              "Документ, описывающий бизнес-требования и цели проекта",
              "План тестирования",
              "Руководство пользователя"
            ],
            correctAnswer: 1
          },
          {
            question: "Какой формат записи требований лучше использовать для Agile проектов?",
            options: [
              "User Stories",
              "Спецификации IEEE",
              "Текстовое описание",
              "Блок-схемы"
            ],
            correctAnswer: 0
          },
          {
            question: "Что такое Acceptance Criteria?",
            options: [
              "Список всех багов",
              "Условия, при которых требование считается выполненным",
              "План разработки",
              "Оценка стоимости"
            ],
            correctAnswer: 1
          },
          {
            question: "Как правильно структурировать User Story?",
            options: [
              "Как [роль] я хочу [действие], чтобы [ценность]",
              "Когда [событие] система должна [реакция]",
              "Если [условие] то [результат]",
              "Система должна [функция]"
            ],
            correctAnswer: 0
          },
          {
            question: "Что НЕ является обязательной частью BRD?",
            options: [
              "Цели проекта",
              "Код решения",
              "Бизнес-процессы",
              "Требования стейкхолдеров"
            ],
            correctAnswer: 1
          }
        ]);
        break;
      default:
        setQuestions([]);
    }
    
    setIsLoading(false);
  }, [lessonId]);

  return { questions, isLoading };
};