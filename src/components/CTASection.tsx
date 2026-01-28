import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-12 md:py-28 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative" ref={ref}>
        <div className={`text-center max-w-4xl mx-auto fade-up ${isVisible ? 'in-view' : ''}`}>
          <h2 className="text-xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-foreground mb-3 md:mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-sm md:text-xl text-primary-foreground/90 mb-5 md:mb-10 max-w-2xl mx-auto line-clamp-2 md:line-clamp-none">
            Contact us today for a free consultation. Our expert team is ready to help you make the best investment decision.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4">
            <Button 
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 rounded-none px-5 md:px-8 py-3 md:py-6 text-xs md:text-lg font-semibold"
              asChild
            >
              <Link to="/contact">
                Get Free Consultation <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-primary rounded-none px-5 md:px-8 py-3 md:py-6 text-xs md:text-lg font-semibold"
              asChild
            >
              <Link to="/projects">
                View Our Projects
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
