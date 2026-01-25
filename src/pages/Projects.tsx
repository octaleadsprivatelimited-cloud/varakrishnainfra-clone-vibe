import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import PageTransition from "@/components/PageTransition";
import { MapPin, Home, Maximize, ArrowRight, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const categories = ["All", "Residential", "Commercial", "Plots", "Villas", "Farm Houses"];

const allProjects = [
  {
    id: 1,
    title: "Royal Gardens",
    location: "Shamshabad, Hyderabad",
    type: "Residential",
    status: "Completed",
    price: "₹45L - 1.2Cr",
    area: "1200 - 3500 sqft",
    units: "250 Units",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    amenities: ["Swimming Pool", "Gym", "Clubhouse", "Park"],
  },
  {
    id: 2,
    title: "Emerald Heights",
    location: "Gachibowli, Hyderabad",
    type: "Residential",
    status: "Ongoing",
    price: "₹65L - 1.8Cr",
    area: "1500 - 4200 sqft",
    units: "180 Units",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    amenities: ["Rooftop Garden", "Smart Home", "EV Charging"],
  },
  {
    id: 3,
    title: "Green Valley Plots",
    location: "Mokila, Hyderabad",
    type: "Plots",
    status: "Available",
    price: "₹25L - 80L",
    area: "200 - 500 sqyds",
    units: "120 Plots",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    amenities: ["DTCP Approved", "Wide Roads", "Park"],
  },
  {
    id: 4,
    title: "Skyline Towers",
    location: "Madhapur, Hyderabad",
    type: "Commercial",
    status: "Completed",
    price: "₹1.5Cr - 5Cr",
    area: "500 - 5000 sqft",
    units: "50 Units",
    image: "https://images.unsplash.com/photo-1464938050520-ef2571e95e44?w=800&h=600&fit=crop",
    amenities: ["24/7 Security", "Parking", "Cafeteria"],
  },
  {
    id: 5,
    title: "Palm Villas",
    location: "Shankarpally, Hyderabad",
    type: "Villas",
    status: "Ongoing",
    price: "₹1.2Cr - 2.5Cr",
    area: "2500 - 4500 sqft",
    units: "45 Villas",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    amenities: ["Private Garden", "Clubhouse", "Tennis Court"],
  },
  {
    id: 6,
    title: "Sunrise Farm Houses",
    location: "Chevella, Hyderabad",
    type: "Farm Houses",
    status: "Available",
    price: "₹35L - 1.2Cr",
    area: "500 - 2000 sqyds",
    units: "30 Units",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    amenities: ["Organic Farm", "Lake View", "Eco-friendly"],
  },
  {
    id: 7,
    title: "Metro Business Park",
    location: "Hitech City, Hyderabad",
    type: "Commercial",
    status: "Completed",
    price: "₹2Cr - 10Cr",
    area: "1000 - 10000 sqft",
    units: "100 Units",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    amenities: ["Metro Access", "Food Court", "Conference Rooms"],
  },
  {
    id: 8,
    title: "Lake View Residency",
    location: "Kondapur, Hyderabad",
    type: "Residential",
    status: "Ongoing",
    price: "₹55L - 1.5Cr",
    area: "1300 - 3800 sqft",
    units: "200 Units",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    amenities: ["Lake View", "Jogging Track", "Kids Play Area"],
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { ref, isVisible } = useScrollAnimation(0.1);

  const filteredProjects = activeCategory === "All" 
    ? allProjects 
    : allProjects.filter(p => p.type === activeCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-emerald-500";
      case "Ongoing": return "bg-amber-500";
      case "Available": return "bg-blue-500";
      default: return "bg-muted";
    }
  };

  return (
    <PageTransition>
      <Layout>
        <PageHeader 
          title="Our Projects"
          subtitle="Explore our portfolio of premium residential, commercial, and plot developments across Hyderabad."
          breadcrumbs={[{ label: "Projects" }]}
        />

        {/* Filters Section */}
        <section className="py-8 bg-secondary border-b border-border sticky top-[52px] z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <Filter className="w-5 h-5 text-muted-foreground" />
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(cat)}
                    className={activeCategory === cat ? "" : "border-border"}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-background rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 md:py-24 bg-background pb-24 lg:pb-24" ref={ref}>
          <div className="container mx-auto px-4">
            {/* Results Count */}
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing <span className="text-foreground font-semibold">{filteredProjects.length}</span> projects
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children ${isVisible ? 'in-view' : ''}`}>
                {filteredProjects.map((project) => (
                  <div key={project.id} className="group bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2" style={{ boxShadow: 'var(--shadow-card)' }}>
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Status Badge */}
                      <Badge className={`absolute top-4 left-4 ${getStatusColor(project.status)} text-white border-0`}>
                        {project.status}
                      </Badge>
                      
                      {/* Type Badge */}
                      <Badge variant="secondary" className="absolute top-4 right-4">
                        {project.type}
                      </Badge>
                      
                      {/* Price */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white font-bold text-xl">{project.price}</p>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Maximize className="w-4 h-4 text-primary" />
                          <span>{project.area}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Home className="w-4 h-4 text-primary" />
                          <span>{project.units}</span>
                        </div>
                      </div>
                      
                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.amenities.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-secondary px-2 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                        {project.amenities.length > 3 && (
                          <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                            +{project.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <Button className="w-full group/btn">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`space-y-6 stagger-children ${isVisible ? 'in-view' : ''}`}>
                {filteredProjects.map((project) => (
                  <div key={project.id} className="group bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 flex flex-col md:flex-row" style={{ boxShadow: 'var(--shadow-card)' }}>
                    {/* Image */}
                    <div className="relative w-full md:w-80 h-64 md:h-auto overflow-hidden flex-shrink-0">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <Badge className={`absolute top-4 left-4 ${getStatusColor(project.status)} text-white border-0`}>
                        {project.status}
                      </Badge>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge variant="outline" className="mb-2">{project.type}</Badge>
                          <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-2 text-muted-foreground mt-1">
                            <MapPin className="w-4 h-4" />
                            <span>{project.location}</span>
                          </div>
                        </div>
                        <p className="text-primary font-bold text-xl">{project.price}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-6 mb-4">
                        <div className="flex items-center gap-2">
                          <Maximize className="w-5 h-5 text-primary" />
                          <span className="font-medium">{project.area}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Home className="w-5 h-5 text-primary" />
                          <span className="font-medium">{project.units}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4 flex-1">
                        {project.amenities.map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-secondary px-3 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <Button className="self-start group/btn">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </Layout>
    </PageTransition>
  );
};

export default Projects;
