import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
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
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background overflow-x-hidden pb-16 lg:pb-0">
        <TopBar />
        <Header />
        <Navbar />
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
