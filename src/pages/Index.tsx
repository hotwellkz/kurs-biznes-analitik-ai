import { Brain, Upload, Mic, ArrowRight, BookOpen, Users, HelpCircle, ArrowRight as PlayIcon, Gift, Play } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SuitableFor } from "@/components/home/SuitableFor";
import { Reviews } from "@/components/home/Reviews";
import { StartLearning } from "@/components/home/StartLearning";

const faqItems = [
  {
    question: "Как начать карьеру бизнес-аналитика?",
    answer: "Начните с изучения основ бизнес-анализа, освойте необходимые инструменты (BPMN, UML, SQL), пройдите профессиональные курсы и получите практический опыт через стажировки или учебные проекты. Важно также развивать soft skills и изучать методологии управления проектами."
  },
  {
    question: "Какие навыки необходимы бизнес-аналитику?",
    answer: "Ключевые навыки включают: аналитическое мышление, умение проводить интервью, документирование требований, знание методологий разработки, владение инструментами моделирования процессов, коммуникабельность и умение презентовать идеи."
  },
  {
    question: "Сколько зарабатывает бизнес-аналитик?",
    answer: "Зарплата бизнес-аналитика в России варьируется от 60 000 до 250 000 рублей в месяц, в зависимости от опыта, региона и специализации. Junior-специалисты начинают с 60-90 тысяч, а Senior-аналитики могут получать более 200 000 рублей."
  },
  {
    question: "Как составлять технические задания?",
    answer: "ТЗ должно включать: цели и задачи проекта, функциональные и нефункциональные требования, ограничения, сроки реализации. Важно использовать четкие формулировки, структурировать документ и согласовывать его со всеми заинтересованными сторонами."
  },
  {
    question: "Какие инструменты использует бизнес-аналитик?",
    answer: "Основные инструменты: Jira для управления задачами, Draw.io или Visio для создания диаграмм, SQL для работы с данными, Excel для анализа, Confluence для документации, BPMN-редакторы для моделирования процессов."
  },
  {
    question: "Как проводить интервью с заказчиком?",
    answer: "Подготовьте список вопросов заранее, начните с общих тем и постепенно переходите к деталям. Внимательно слушайте, уточняйте неясные моменты, фиксируйте ключевые points и отправляйте summary после встречи для подтверждения договоренностей."
  },
  {
    question: "Что такое user story и как их писать?",
    answer: "User story - это краткое описание функционала с точки зрения пользователя. Формат: 'Как [роль], я хочу [действие], чтобы [цель/ценность]'. Важно добавлять критерии приемки и оценку трудозатрат."
  },
  {
    question: "Как создавать эффективные презентации?",
    answer: "Структурируйте информацию, используйте визуализации (графики, диаграммы), придерживайтесь правила '7±2' элементов на слайде, начните с ключевого сообщения, используйте понятный язык и подготовьте ответы на возможные вопросы."
  },
  {
    question: "Как оценивать риски проекта?",
    answer: "Определите потенциальные риски, оцените их вероятность и влияние, создайте матрицу рисков, разработайте стратегии митигации для каждого значимого риска, регулярно мониторьте и обновляйте оценки."
  },
  {
    question: "Как работать с требованиями заказчика?",
    answer: "Собирайте требования через интервью и воркшопы, документируйте их, приоритизируйте, валидируйте с заинтересованными сторонами, декомпозируйте на задачи. Важно уметь выявлять скрытые требования и управлять изменениями."
  }
];

const Index = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/program');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navigation />
      
      {/* Hero Section */}
      <main className="flex-grow">
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Курс Бизнес Аналитик
              <span className="text-primary"> с ИИ-наставником</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-slide-up">
              Освойте профессию бизнес-аналитика с персональным ИИ-учителем, который адаптируется под ваш темп обучения
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
              <button 
                onClick={handleStartLearning}
                className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
              >
                Начать обучение
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => navigate('/program')}
                className="border border-white/20 hover:border-primary/50 text-white px-8 py-3 rounded-full transition-colors"
              >
                Смотреть программу
              </button>
            </div>
          </div>
        </section>

        {/* Новая эра обучения */}
        <section className="py-20 px-4 bg-gradient-to-b from-secondary to-secondary-dark">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Новая эра обучения
                </h2>
                <p className="text-gray-300 mb-8">
                  Используйте силу искусственного интеллекта для персонализированного обучения. 
                  Наш ИИ-наставник адаптируется под ваш стиль обучения и помогает достичь максимальных результатов.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <span>Персонализированное обучение</span>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <span>Постоянное развитие</span>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mic className="w-6 h-6 text-primary" />
                    </div>
                    <span>Интерактивные уроки</span>
                  </div>
                </div>
              </div>
              <div className="relative animate-fade-in">
                <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl"></div>
                <div className="relative bg-secondary-dark p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <BookOpen className="w-16 h-16 text-primary mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Инновационный подход</h3>
                  <p className="text-gray-400">
                    Используйте современные технологии для эффективного обучения и развития навыков бизнес-аналитика
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Пройти обучение */}
        <section className="py-20 px-4 bg-gradient-to-b from-secondary-dark to-secondary">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 animate-fade-in">
              Пройти обучение
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group p-8 rounded-2xl bg-secondary-hover border border-white/10 transition-all duration-300 hover:scale-105 animate-fade-in">
                <Users className="w-12 h-12 text-primary mb-6 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-4">Начальный уровень</h3>
                <p className="text-gray-400 mb-6">Основы бизнес-анализа и базовые инструменты</p>
                <button 
                  onClick={handleStartLearning}
                  className="bg-primary/10 hover:bg-primary/20 text-primary px-6 py-2 rounded-full transition-colors"
                >
                  Начать
                </button>
              </div>
              <div className="group p-8 rounded-2xl bg-secondary-hover border border-white/10 transition-all duration-300 hover:scale-105 animate-fade-in delay-100">
                <Users className="w-12 h-12 text-primary mb-6 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-4">Средний уровень</h3>
                <p className="text-gray-400 mb-6">Продвинутые техники и методологии</p>
                <button 
                  onClick={handleStartLearning}
                  className="bg-primary/10 hover:bg-primary/20 text-primary px-6 py-2 rounded-full transition-colors"
                >
                  Начать
                </button>
              </div>
              <div className="group p-8 rounded-2xl bg-secondary-hover border border-white/10 transition-all duration-300 hover:scale-105 animate-fade-in delay-200">
                <Users className="w-12 h-12 text-primary mb-6 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-4">Продвинутый уровень</h3>
                <p className="text-gray-400 mb-6">Экспертные навыки и реальные проекты</p>
                <button 
                  onClick={handleStartLearning}
                  className="bg-primary/10 hover:bg-primary/20 text-primary px-6 py-2 rounded-full transition-colors"
                >
                  Начать
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Start Learning Now Section */}
        <StartLearning />

        {/* Кому подходит обучение */}
        <SuitableFor />

        {/* Отзывы */}
        <Reviews />

        {/* Топ 10 вопросов */}
        <section className="py-20 px-4 bg-gradient-to-b from-secondary to-[#0A0A0A]">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center animate-fade-in">
                Топ 10 вопросов
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="group px-6 rounded-xl bg-secondary-hover border border-white/10 transition-all duration-300 hover:border-primary/50 animate-fade-in data-[state=open]:border-primary/50"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <AccordionTrigger className="py-6">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                          <HelpCircle className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors">
                          {item.question}
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-6 pl-14">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
