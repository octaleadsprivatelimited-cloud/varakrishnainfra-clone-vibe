import { useEffect, useState } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Building2, Users, Award, MapPin } from "lucide-react";

const stats = [
  { icon: Building2, value: 150, suffix: "+", label: "Projects Completed" },
  { icon: Users, value: 2500, suffix: "+", label: "Happy Clients" },
  { icon: Award, value: 15, suffix: "+", label: "Years Experience" },
  { icon: MapPin, value: 50, suffix: "+", label: "Locations" },
];

const Counter = ({ end, suffix, isVisible }: { end: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end, isVisible]);

  return (
    <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary font-serif whitespace-nowrap">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-10 md:py-16 lg:py-20 bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative" ref={ref}>
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 stagger-children ${isVisible ? 'in-view' : ''}`}>
          {stats.map((stat, index) => (
            <div key={index} className="stat-card group p-4 sm:p-6 md:p-8">
              <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary mx-auto mb-2 sm:mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110" />
              <Counter end={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              <p className="text-muted-foreground mt-1 sm:mt-2 md:mt-3 font-medium text-xs sm:text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
