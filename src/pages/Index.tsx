import { Link } from "react-router-dom";
import HeroSlider from "@/components/HeroSlider";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <PageTransition>
      <SEO 
        title="Vara Krishna Infra | Real Estate & Infrastructure in Hyderabad"
        description="Vara Krishna Infra - Leading Real Estate & Infrastructure Company in Hyderabad. Premium plots, villas, apartments & construction services. Call +91 8143341663"
        keywords="real estate hyderabad, plots in hyderabad, infrastructure company, construction company, villas hyderabad, vara krishna infra, DTCP approved plots, HMDA approved plots, residential projects hyderabad"
        url="https://varakrishnainfra.com"
      />
      <div className="min-h-screen bg-background overflow-x-hidden pb-16 lg:pb-0">
        <HeroSlider />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        
        {/* Featured Projects Preview with CTA */}
        <ProjectsSection />
        <div className="bg-secondary py-8 text-center">
          <Link to="/projects">
            <Button size="lg" className="cta-button group">
              View All Projects
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        <WhyChooseUs />
        <TestimonialsSection />
        <CTASection />
        <Footer />
        <WhatsAppFloat />
      </div>
    </PageTransition>
  );
};

export default Index;
