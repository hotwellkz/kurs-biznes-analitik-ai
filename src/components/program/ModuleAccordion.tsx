import { Accordion } from "@/components/ui/accordion";
import { Module1 } from './modules/Module1';
import { Module2 } from './modules/Module2';
import { Module3 } from './modules/Module3';
import { Module4 } from './modules/Module4';
import { Module5 } from './modules/Module5';

interface ModuleAccordionProps {
  completedLessons: string[];
}

export const ModuleAccordion = ({ completedLessons }: ModuleAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      <Module1 completedLessons={completedLessons} />
      <Module2 completedLessons={completedLessons} />
      <Module3 />
      <Module4 />
      <Module5 />
    </Accordion>
  );
};