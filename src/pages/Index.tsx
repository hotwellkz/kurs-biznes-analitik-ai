import { Brain, Upload, Mic, ArrowRight } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

const Index = () => {
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
              <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-colors">
                Начать обучение
                <ArrowRight size={20} />
              </button>
              <button className="border border-white/20 hover:border-primary/50 text-white px-8 py-3 rounded-full transition-colors">
                Смотреть программу
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-secondary">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
              Преимущества обучения
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-radial from-secondary-hover to-secondary p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">ИИ-наставник</h3>
                <p className="text-gray-400">
                  Персональный ИИ-ассистент поможет освоить материал в удобном для вас темпе
                </p>
              </div>
              
              <div className="bg-gradient-radial from-secondary-hover to-secondary p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Практика</h3>
                <p className="text-gray-400">
                  Реальные проекты и задачи от действующих бизнес-аналитиков
                </p>
              </div>
              
              <div className="bg-gradient-radial from-secondary-hover to-secondary p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Поддержка</h3>
                <p className="text-gray-400">
                  Круглосуточная поддержка от кураторов и сообщества студентов
                </p>
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