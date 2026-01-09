import { useState } from "react";
import servicePlots from "@/assets/service-plots.jpg";
import serviceConstruction from "@/assets/service-construction.jpg";
import serviceApartments from "@/assets/service-apartments.jpg";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

const tabs = ["Residential", "Commercial", "Plots"];

const projectsData = {
  Residential: [
    { image: heroSlide1, title: "Luxury Villas", location: "Hyderabad" },
    { image: heroSlide3, title: "Premium Apartments", location: "Secunderabad" },
  ],
  Commercial: [
    { image: serviceConstruction, title: "Business Complex", location: "Gachibowli" },
    { image: serviceApartments, title: "Office Towers", location: "HITEC City" },
  ],
  Plots: [
    { image: servicePlots, title: "Premium Plots", location: "Shamshabad" },
    { image: heroSlide2, title: "Farm Land", location: "Outer Ring Road" },
  ],
};

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("Residential");

  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4">Our Services</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore our wide range of real estate and infrastructure services
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-primary/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData[activeTab as keyof typeof projectsData].map((project, index) => (
            <div key={index} className="service-card group cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-primary-foreground">
                    <h3 className="text-xl font-serif font-bold mb-1">{project.title}</h3>
                    <p className="text-sm opacity-80">{project.location}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-secondary">
                <h3 className="text-lg font-serif font-bold text-primary uppercase">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
