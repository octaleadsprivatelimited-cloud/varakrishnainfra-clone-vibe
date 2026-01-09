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
    <section id="about" className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Grid */}
          <div className={`relative fade-left ${isVisible ? 'in-view' : ''}`}>
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
            <div className="absolute -bottom-6 -right-6 md:right-8 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl z-10 animate-float">
              <div className="text-center">
                <span className="text-5xl font-serif font-bold">15+</span>
                <p className="text-sm font-medium mt-1">Years of<br />Excellence</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`fade-right ${isVisible ? 'in-view' : ''}`}>
            <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-primary" />
              About Vara Krishna Infra
            </div>

            <h2 className="section-title mb-6">
              Building Dreams Into <span className="text-gradient">Reality</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Vara Krishna Infra is a leading real estate and infrastructure development company based in Hyderabad. 
              With over 15 years of experience, we have successfully delivered 150+ projects that exceed our clients' expectations.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Our commitment to quality, transparency, and customer satisfaction has made us one of the most trusted names 
              in the real estate industry. We specialize in residential plots, premium villas, commercial spaces, 
              and comprehensive infrastructure development.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Check className="w-3.5 h-3.5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="cta-button rounded-none">
              Learn More About Us <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
