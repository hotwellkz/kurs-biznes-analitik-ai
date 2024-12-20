import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Pricing = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-secondary to-secondary-dark">
      <Helmet>
        <title>Цены на курс бизнес-аналитика с ИИ | БизнесАналитик.AI</title>
        <meta name="description" content="Выгодные тарифы на онлайн курс бизнес-аналитика с ИИ-наставником. Доступные цены, гибкая система оплаты, персональное обучение." />
        <meta name="keywords" content="онлайн курс бизнес-аналитик цена, стоимость курса бизнес-аналитика, цены на обучение бизнес-аналитике" />
      </Helmet>

      <Navigation />
      <Breadcrumbs />

      <main className="flex-grow">
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 text-transparent bg-clip-text mb-6 animate-fade-in">
              Тарифные планы
            </h1>
            <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto animate-slide-up">
              Выберите подходящий тарифный план и начните обучение уже сегодня
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* AI Старт */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-light via-purple-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-secondary/90 backdrop-blur-xl rounded-2xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2 animate-fade-in">
                  <div className="absolute -top-4 -right-4 size-24 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-2xl" />
                  <h3 className="text-2xl font-semibold text-primary mb-4">AI Старт</h3>
                  <div className="text-4xl font-bold text-white mb-4">
                    14,900 ₸
                  </div>
                  <p className="text-gray-400 mb-8 h-24">
                    100 токенов - Достаточно для знакомства с платформой и изучения основ бизнес-анализа
                  </p>
                  <Button 
                    onClick={handleStartLearning}
                    className="w-full bg-gradient-to-r from-primary to-primary-hover text-white mb-8 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Начать обучение
                  </Button>
                  <div className="flex items-center text-gray-400 mb-4">
                    <Check className="text-green-500 mr-2" />
                    <span>100 токенов</span>
                  </div>
                </div>
              </div>

              {/* AI Прорыв */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-secondary backdrop-blur-xl rounded-2xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2 animate-fade-in">
                  <div className="absolute -top-4 -right-4 size-32 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-2xl" />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm animate-pulse">
                    Популярный выбор
                  </div>
                  <h3 className="text-2xl font-semibold text-blue-500 mb-4">AI Прорыв</h3>
                  <div className="text-4xl font-bold text-white mb-4">
                    24,900 ₸
                  </div>
                  <p className="text-gray-400 mb-8 h-24">
                    300 токенов - Оптимальный набор для полноценного изучения бизнес-анализа с помощью ИИ
                  </p>
                  <Button 
                    onClick={handleStartLearning}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-8 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Начать обучение
                  </Button>
                  <div className="flex items-center text-gray-400 mb-4">
                    <Check className="text-green-500 mr-2" />
                    <span>300 токенов</span>
                  </div>
                </div>
              </div>

              {/* AI Эксперт */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-primary rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-secondary/90 backdrop-blur-xl rounded-2xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2 animate-fade-in">
                  <div className="absolute -top-4 -right-4 size-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
                  <h3 className="text-2xl font-semibold text-purple-500 mb-4">AI Эксперт</h3>
                  <div className="text-4xl font-bold text-white mb-4">
                    54,900 ₸
                  </div>
                  <p className="text-gray-400 mb-8 h-24">
                    1000 токенов - Максимальный набор для полного курса и будущих обновлений
                  </p>
                  <Button 
                    onClick={handleStartLearning}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-8 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Начать обучение
                  </Button>
                  <div className="flex items-center text-gray-400 mb-4">
                    <Check className="text-green-500 mr-2" />
                    <span>1000 токенов</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;