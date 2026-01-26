import { useState, useEffect } from "react";
import { ArrowRight, Building, Home, Landmark, HardHat, TreePine, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { ServiceCardSkeleton } from "@/components/ui/shimmer-skeleton";

const services = [
  {
    icon: Home,
    title: "Residential Projects",
    description: "Premium villas and apartments designed for modern living with world-class amenities and contemporary architecture.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Landmark,
    title: "Plot Development",
    description: "DTCP/HMDA approved plots in prime locations with clear titles, proper documentation, and excellent infrastructure.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Building,
    title: "Commercial Spaces",
    description: "State-of-the-art commercial complexes and office spaces in strategic locations for business growth.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: HardHat,
    title: "Construction",
    description: "End-to-end construction services with quality materials, skilled workforce, and timely project delivery.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Factory,
    title: "Infrastructure",
    description: "Large-scale infrastructure development including roads, utilities, and public facilities.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: TreePine,
    title: "Farm Houses",
    description: "Serene farmhouse projects away from city chaos, perfect for weekend getaways and investment.",
    color: "from-green-500 to-lime-600",
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load delay for skeleton demonstration
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="services" className="py-12 md:py-28 bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-8 md:mb-16 fade-up ${isVisible ? 'in-view' : ''}`}>
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-4">
            <span className="w-6 md:w-8 h-0.5 bg-primary" />
            Our Services
            <span className="w-6 md:w-8 h-0.5 bg-primary" />
          </div>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-serif font-bold">
            What We <span className="text-gradient">Offer</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2 md:mt-4">
            Comprehensive real estate solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {[...Array(6)].map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 stagger-children ${isVisible ? 'in-view' : ''}`}>
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-background rounded-lg md:rounded-xl p-4 md:p-8 transition-all duration-500 hover:-translate-y-2 group cursor-pointer border border-transparent hover:border-primary/20"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                {/* Icon */}
                <div className={`w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 md:mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <service.icon className="w-5 h-5 md:w-8 md:h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-sm md:text-xl font-serif font-bold text-foreground mb-1 md:mb-4 group-hover:text-primary transition-colors leading-tight">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-xs md:text-base leading-relaxed mb-2 md:mb-6 line-clamp-2 md:line-clamp-none">
                  {service.description}
                </p>

                {/* Link - Hidden on mobile */}
                <Button 
                  variant="link" 
                  className="p-0 text-primary font-semibold uppercase tracking-wide text-xs md:text-sm group-hover:gap-4 transition-all hidden md:inline-flex"
                >
                  Learn More 
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
