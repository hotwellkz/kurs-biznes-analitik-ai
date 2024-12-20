import { ArrowRight, Gift, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const StartLearning = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#0A0A0A] to-secondary overflow-hidden">
      <div className="container mx-auto relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-fade-in">
            <Gift className="w-5 h-5" />
            <span>Начни бесплатно</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Начни проходить обучение
            <span className="text-primary"> прямо сейчас</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 animate-slide-up">
            Получи доступ к курсу бизнес-аналитика с персональным ИИ-наставником и начни развивать свою карьеру уже сегодня
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Button
              onClick={() => navigate('/program')}
              size="lg"
              className="group bg-primary hover:bg-primary-hover text-white px-8 py-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <Play className="w-5 h-5" />
              Начать обучение
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              onClick={() => navigate('/program')}
              variant="outline"
              size="lg"
              className="border-white/20 hover:border-primary/50 text-white px-8 py-6 rounded-full transition-all duration-300 hover:scale-105"
            >
              Смотреть программу
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};