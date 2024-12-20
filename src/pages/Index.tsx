import { Brain, Upload, Mic, ArrowRight, BookOpen, Users, HelpCircle } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";

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

        {/* Топ 10 вопросов */}
        <section className="py-20 px-4 bg-gradient-to-b from-secondary to-[#0A0A0A]">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center animate-fade-in">
                Топ 10 вопросов
              </h2>
              <div className="space-y-6">
                {[
                  "Как начать карьеру бизнес-аналитика?",
                  "Какие навыки необходимы бизнес-аналитику?",
                  "Сколько зарабатывает бизнес-аналитик?",
                  "Как составлять технические задания?",
                  "Какие инструменты использует бизнес-аналитик?",
                  "Как проводить интервью с заказчиком?",
                  "Что такое user story и как их писать?",
                  "Как создавать эффективные презентации?",
                  "Как оценивать риски проекта?",
                  "Как работать с требованиями заказчика?"
                ].map((question, index) => (
                  <div 
                    key={index}
                    className="group p-6 rounded-xl bg-secondary-hover border border-white/10 transition-all duration-300 hover:border-primary/50 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <HelpCircle className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors">
                        {question}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;