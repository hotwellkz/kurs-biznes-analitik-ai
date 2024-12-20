import { Check } from "lucide-react";

const suitableForItems = [
  {
    title: "Начинающим",
    description: "Тем, кто хочет освоить профессию бизнес-аналитика с нуля",
    points: ["Базовые знания", "Практические навыки", "Поддержка кураторов"]
  },
  {
    title: "Аналитикам",
    description: "Практикующим аналитикам, желающим повысить квалификацию",
    points: ["Углубленные техники", "Реальные кейсы", "Новые инструменты"]
  },
  {
    title: "Менеджерам",
    description: "Руководителям, желающим улучшить бизнес-процессы",
    points: ["Системный подход", "Оптимизация процессов", "Принятие решений"]
  }
];

export const SuitableFor = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#0A0A0A] to-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center animate-fade-in">
          Кому подходит обучение
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {suitableForItems.map((item, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-secondary-hover border border-white/10 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-400 mb-6">{item.description}</p>
              <ul className="space-y-3">
                {item.points.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};