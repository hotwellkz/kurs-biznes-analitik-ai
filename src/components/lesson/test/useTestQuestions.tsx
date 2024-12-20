import { useParams } from 'react-router-dom';

interface TestQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export const useTestQuestions = () => {
  const { lessonId } = useParams();

  const getQuestions = (): TestQuestion[] => {
    switch (lessonId) {
      case '1.1':
        return [
          {
            question: "Какова основная роль бизнес-аналитика в проекте?",
            options: [
              "Только написание документации",
              "Связующее звено между бизнесом и IT-командой",
              "Управление проектом",
              "Разработка программного обеспечения"
            ],
            correctAnswer: 1
          },
          {
            question: "Какой навык наиболее важен для бизнес-аналитика?",
            options: [
              "Программирование",
              "Аналитическое мышление",
              "Продажи",
              "Дизайн"
            ],
            correctAnswer: 1
          },
          {
            question: "Что является основным результатом работы бизнес-аналитика?",
            options: [
              "Написанный код",
              "Техническая документация",
              "Требования к продукту",
              "Маркетинговые материалы"
            ],
            correctAnswer: 2
          }
        ];
      case '1.2':
        return [
          {
            question: "Что такое SDLC?",
            options: [
              "Система документооборота",
              "Методология разработки ПО",
              "Жизненный цикл разработки ПО",
              "Система контроля версий"
            ],
            correctAnswer: 2
          },
          {
            question: "Какое основное отличие Agile от Waterfall?",
            options: [
              "Agile дороже в реализации",
              "Waterfall более гибкий",
              "Agile предполагает итеративную разработку",
              "В Waterfall нет документации"
            ],
            correctAnswer: 2
          },
          {
            question: "На каком этапе SDLC начинается работа бизнес-аналитика?",
            options: [
              "Только при тестировании",
              "На этапе планирования",
              "После релиза",
              "Только при разработке"
            ],
            correctAnswer: 1
          },
          {
            question: "Какой артефакт НЕ создает бизнес-аналитик?",
            options: [
              "Бизнес-требования",
              "User Stories",
              "Программный код",
              "Функциональные требования"
            ],
            correctAnswer: 2
          },
          {
            question: "Что такое Sprint в Agile?",
            options: [
              "Встреча команды",
              "Фиксированный период разработки",
              "Название документа",
              "Тип тестирования"
            ],
            correctAnswer: 1
          }
        ];
      default:
        return [];
    }
  };

  return { questions: getQuestions() };
};