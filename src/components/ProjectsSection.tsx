import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Bed, Square, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { ProjectCardSkeleton } from "@/components/ui/shimmer-skeleton";
import { useMultipleImageLoader } from "@/hooks/useImageLoader";
import servicePlots from "@/assets/service-plots.jpg";
import serviceConstruction from "@/assets/service-construction.jpg";
import serviceApartments from "@/assets/service-apartments.jpg";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import projectsBg from "@/assets/projects-bg.jpg";

const tabs = ["All", "Residential", "Commercial", "Plots"];

const allProjects = [
  { 
    image: heroSlide1, 
    title: "Green Valley Villas", 
    location: "Shamshabad, Hyderabad",
    type: "Residential",
    beds: "3-5 BHK",
    area: "2400-4500 sq.ft",
    status: "Ready to Move"
  },
  { 
    image: heroSlide2, 
    title: "Krishna Premium Plots", 
    location: "Outer Ring Road",
    type: "Plots",
    beds: null,
    area: "150-500 sq.yards",
    status: "New Launch"
  },
  { 
    image: heroSlide3, 
    title: "Sunrise Apartments", 
    location: "Gachibowli",
    type: "Residential",
    beds: "2-4 BHK",
    area: "1200-2800 sq.ft",
    status: "Under Construction"
  },
  { 
    image: serviceConstruction, 
    title: "Tech Hub Complex", 
    location: "HITEC City",
    type: "Commercial",
    beds: null,
    area: "5000-20000 sq.ft",
    status: "Coming Soon"
  },
  { 
    image: servicePlots, 
    title: "Golden Meadows", 
    location: "Mokila",
    type: "Plots",
    beds: null,
    area: "200-1000 sq.yards",
    status: "Available"
  },
  { 
    image: serviceApartments, 
    title: "Skyline Residency", 
    location: "Kondapur",
    type: "Residential",
    beds: "2-3 BHK",
    area: "1100-1800 sq.ft",
    status: "Ready to Move"
  },
];

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("All");
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [imagesReady, setImagesReady] = useState(false);
  
  const imageUrls = allProjects.map(p => p.image);
  const { allLoaded } = useMultipleImageLoader(imageUrls);

  useEffect(() => {
    if (allLoaded) {
      // Small delay for smooth transition
      const timer = setTimeout(() => setImagesReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [allLoaded]);

  const filteredProjects = activeTab === "All" 
    ? allProjects 
    : allProjects.filter(p => p.type === activeTab);

  return (
    <section id="projects" className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${projectsBg})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/95" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-6 md:mb-8 gravity-drop ${isVisible ? 'in-view' : ''}`}>
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-3">
            <span className="w-6 md:w-8 h-0.5 bg-primary" />
            Our Projects
            <span className="w-6 md:w-8 h-0.5 bg-primary" />
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold">
            Featured <span className="text-gradient">Properties</span>
          </h2>
          <p className="text-sm md:text-sm text-muted-foreground mt-2 md:mt-3">
            Explore our premium collection of properties
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 md:gap-2 mb-6 md:mb-8 fade-up ${isVisible ? 'in-view' : ''}`} style={{ transitionDelay: '0.2s' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-xs font-semibold uppercase tracking-wide transition-all duration-300 rounded-full ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-foreground hover:bg-primary/10"
              }`}
              style={activeTab === tab ? { boxShadow: 'var(--shadow-primary)' } : {}}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {!imagesReady ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {[...Array(6)].map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className={`grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 stagger-children ${isVisible ? 'in-view' : ''}`}>
            {filteredProjects.map((project, index) => (
              <div 
                key={index} 
                className="group bg-background rounded-lg md:rounded-xl overflow-hidden border border-border transition-all duration-500 hover:-translate-y-2 hover:border-primary/30"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                {/* Image */}
                <div className="relative h-28 md:h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 left-2 md:top-3 md:left-3 px-2 md:px-3 py-1 md:py-1 bg-primary text-primary-foreground text-[10px] md:text-[11px] font-semibold uppercase tracking-wider rounded-full">
                    {project.status}
                  </div>

                  {/* Quick View - Hidden on mobile */}
                  <div className="absolute bottom-3 right-3 w-10 h-10 bg-primary text-primary-foreground rounded-full items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 cursor-pointer hidden md:flex">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 md:p-4">
                  <div className="flex items-center gap-1 md:gap-2 text-muted-foreground text-[10px] md:text-xs mb-1 md:mb-1.5">
                    <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary flex-shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                  <h3 className="text-xs md:text-base font-serif font-bold text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-1 md:line-clamp-none">
                    {project.title}
                  </h3>
                  
                  {/* Details */}
                  <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-muted-foreground border-t border-border pt-2 md:pt-3">
                    {project.beds && (
                      <div className="items-center gap-1 hidden md:flex">
                        <Bed className="w-3.5 h-3.5" />
                        {project.beds}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Square className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                      <span className="truncate">{project.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-6 md:mt-8">
          <Button className="cta-button-outline rounded-none text-sm md:text-sm py-2 md:py-2.5 px-4 md:px-5" asChild>
            <Link to="/projects">
              View All Projects <ArrowRight className="w-4 h-4 md:w-4 md:h-4 ml-1 md:ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
