import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building, Home, Landmark, HardHat, TreePine, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { ServiceCardSkeleton } from "@/components/ui/shimmer-skeleton";
import servicesBg from "@/assets/services-bg.jpg";
import serviceResidential from "@/assets/service-residential.jpg";
import servicePlots from "@/assets/service-plots.jpg";
import serviceCommercial from "@/assets/service-commercial.jpg";
import serviceConstruction from "@/assets/service-construction-new.jpg";
import serviceInfrastructure from "@/assets/service-infrastructure.jpg";
import serviceFarmhouse from "@/assets/service-farmhouse.jpg";

const services = [
  {
    icon: Home,
    title: "Residential Projects",
    description: "Premium villas and apartments designed for modern living with world-class amenities and contemporary architecture.",
    color: "from-amber-500 to-orange-600",
    image: serviceResidential,
  },
  {
    icon: Landmark,
    title: "Plot Development",
    description: "DTCP/HMDA approved plots in prime locations with clear titles, proper documentation, and excellent infrastructure.",
    color: "from-emerald-500 to-teal-600",
    image: servicePlots,
  },
  {
    icon: Building,
    title: "Commercial Spaces",
    description: "State-of-the-art commercial complexes and office spaces in strategic locations for business growth.",
    color: "from-blue-500 to-indigo-600",
    image: serviceCommercial,
  },
  {
    icon: HardHat,
    title: "Construction",
    description: "End-to-end construction services with quality materials, skilled workforce, and timely project delivery.",
    color: "from-rose-500 to-pink-600",
    image: serviceConstruction,
  },
  {
    icon: Factory,
    title: "Infrastructure",
    description: "Large-scale infrastructure development including roads, utilities, and public facilities.",
    color: "from-purple-500 to-violet-600",
    image: serviceInfrastructure,
  },
  {
    icon: TreePine,
    title: "Farm Houses",
    description: "Serene farmhouse projects away from city chaos, perfect for weekend getaways and investment.",
    color: "from-green-500 to-lime-600",
    image: serviceFarmhouse,
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
    <section id="services" className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${servicesBg})` }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-background/90" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-8 md:mb-10 gravity-drop ${isVisible ? 'in-view' : ''}`}>
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-3">
            <span className="w-6 md:w-8 h-0.5 bg-primary" />
            Our Services
            <span className="w-6 md:w-8 h-0.5 bg-primary" />
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold">
            What We <span className="text-gradient">Offer</span>
          </h2>
          <p className="text-sm md:text-sm text-muted-foreground mt-2 md:mt-3">
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
          <div className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 stagger-children ${isVisible ? 'in-view' : ''}`}>
            {services.map((service, index) => (
              <div 
                key={index} 
                className="relative rounded-lg md:rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 group cursor-pointer border border-transparent hover:border-primary/20"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                {/* Background Image with 30% fade */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-70"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/85 group-hover:via-black/50 transition-all duration-300" />
                
                {/* Content */}
                <div className="relative z-10 p-3 md:p-6 min-h-[140px] md:min-h-[220px] flex flex-col justify-end">
                  {/* Icon */}
                  <div className={`w-8 h-8 md:w-11 md:h-11 rounded-md md:rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-2 md:mb-3 transition-transform duration-500 group-hover:scale-110`}>
                    <service.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>

                  <h3 className="text-xs md:text-base font-serif font-bold text-white mb-1 md:mb-2 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-[10px] md:text-xs leading-snug md:leading-relaxed mb-0 md:mb-3">
                    {service.description}
                  </p>

                  {/* Link - Hidden on mobile */}
                  <Button 
                    variant="link" 
                    className="p-0 text-primary-foreground font-semibold uppercase tracking-wide text-xs md:text-sm group-hover:gap-4 transition-all hidden md:inline-flex"
                    asChild
                  >
                    <Link to="/services">
                      Learn More 
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
