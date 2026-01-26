import { useState, useEffect } from "react";
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
    <section id="projects" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-12 fade-up ${isVisible ? 'in-view' : ''}`}>
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            <span className="w-8 h-0.5 bg-primary" />
            Our Projects
            <span className="w-8 h-0.5 bg-primary" />
          </div>
          <h2 className="section-title">
            Featured <span className="text-gradient">Properties</span>
          </h2>
          <p className="section-subtitle mt-4">
            Explore our premium collection of residential and commercial projects
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 fade-up ${isVisible ? 'in-view' : ''}`} style={{ transitionDelay: '0.2s' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-300 rounded-full ${
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children ${isVisible ? 'in-view' : ''}`}>
            {filteredProjects.map((project, index) => (
              <div 
                key={index} 
                className="group bg-background rounded-xl overflow-hidden border border-border transition-all duration-500 hover:-translate-y-2 hover:border-primary/30"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider rounded-full">
                    {project.status}
                  </div>

                  {/* Quick View */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 cursor-pointer">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {project.location}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Details */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-4">
                    {project.beds && (
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4" />
                        {project.beds}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Square className="w-4 h-4" />
                      {project.area}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button className="cta-button-outline rounded-none">
            View All Projects <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
