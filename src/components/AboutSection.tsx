import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

const features = [
  "Trusted by 2500+ Happy Customers",
  "15+ Years of Industry Experience",
  "Premium Quality Construction",
  "Transparent Pricing & Deals",
  "On-Time Project Delivery",
  "Legal Clarity & Documentation",
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section id="about" className="py-12 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Image Grid - Hidden on mobile, shown on larger screens */}
          <div className={`relative fade-left hidden md:block ${isVisible ? 'in-view' : ''}`}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={heroSlide1} 
                    alt="Modern Villa Project" 
                    className="w-full h-80 object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>
              </div>
              <div className="col-span-5 pt-12">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={heroSlide3} 
                    alt="Luxury Villa" 
                    className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 right-8 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl z-10 animate-float">
              <div className="text-center">
                <span className="text-5xl font-serif font-bold">15+</span>
                <p className="text-sm font-medium mt-1">Years of<br />Excellence</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`fade-right ${isVisible ? 'in-view' : ''}`}>
            {/* Mobile: Compact single image with badge overlay */}
            <div className="relative md:hidden mb-6">
              <div className="relative overflow-hidden rounded-xl">
                <img 
                  src={heroSlide1} 
                  alt="Modern Villa Project" 
                  className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-3xl font-serif font-bold text-primary">15+</span>
                  <p className="text-xs font-medium opacity-90">Years of Excellence</p>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-4">
              <span className="w-6 md:w-8 h-0.5 bg-primary" />
              About Us
            </div>

            <h2 className="text-xl md:text-3xl lg:text-4xl font-serif font-bold mb-3 md:mb-6">
              Building Dreams Into <span className="text-gradient">Reality</span>
            </h2>

            <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
              Vara Krishna Infra is a leading real estate company in Hyderabad with 15+ years of experience and 150+ successful projects.
            </p>

            {/* Features - Compact grid on mobile */}
            <div className="grid grid-cols-2 gap-2 md:gap-4 mb-6 md:mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary" />
                  </div>
                  <span className="text-foreground text-xs md:text-sm font-medium leading-tight">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="cta-button rounded-none text-sm md:text-base py-2 md:py-3 px-4 md:px-6">
              Learn More <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
