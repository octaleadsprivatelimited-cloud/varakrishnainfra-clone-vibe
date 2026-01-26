import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import { MapPin, Home, Maximize, ArrowRight, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShimmerSkeleton } from "@/components/ui/shimmer-skeleton";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useProjects } from "@/hooks/useFirestore";

const categories = ["All", "Residential", "Commercial", "Plots", "Villas", "Farm Houses", "Construction", "Infrastructure"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { projects, loading } = useProjects();

  // Map Firebase categories to display categories
  const categoryMap: Record<string, string> = {
    residential: "Residential",
    commercial: "Commercial",
    plots: "Plots",
    construction: "Construction",
    farmhouse: "Farm Houses",
    infrastructure: "Infrastructure",
  };

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter(p => {
      const displayCategory = categoryMap[p.category] || p.category;
      return displayCategory === activeCategory;
    });
  }, [projects, activeCategory]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-500";
      case "ongoing": return "bg-amber-500";
      case "upcoming": return "bg-blue-500";
      default: return "bg-muted";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <PageTransition>
      <SEO 
        title="Our Projects | Vara Krishna Infra - Real Estate Projects in Hyderabad"
        description="Explore our portfolio of premium residential projects, commercial spaces, DTCP/HMDA approved plots, villas, and infrastructure developments across Hyderabad. View ongoing and completed projects."
        keywords="real estate projects hyderabad, residential projects hyderabad, commercial projects, DTCP approved plots, HMDA approved plots, villas hyderabad, infrastructure projects"
        url="https://varakrishnainfra.com/projects"
      />
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

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-background rounded-2xl overflow-hidden border border-border">
                    <ShimmerSkeleton className="h-64 w-full" />
                    <div className="p-6 space-y-4">
                      <ShimmerSkeleton className="h-6 w-3/4" />
                      <ShimmerSkeleton className="h-4 w-1/2" />
                      <div className="grid grid-cols-2 gap-4">
                        <ShimmerSkeleton className="h-4" />
                        <ShimmerSkeleton className="h-4" />
                      </div>
                      <ShimmerSkeleton className="h-10 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No projects found in this category.</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children ${isVisible ? 'in-view' : ''}`}>
                {filteredProjects.map((project) => (
                  <div key={project.id} className="group bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2" style={{ boxShadow: 'var(--shadow-card)' }}>
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={project.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Status Badge */}
                      <Badge className={`absolute top-4 left-4 ${getStatusColor(project.status)} text-white border-0`}>
                        {getStatusLabel(project.status)}
                      </Badge>
                      
                      {/* Type Badge */}
                      <Badge variant="secondary" className="absolute top-4 right-4">
                        {categoryMap[project.category] || project.category}
                      </Badge>
                      
                      {/* Price */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white font-bold text-xl">{project.price} {project.priceUnit}</p>
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
                          <span>{project.specifications?.area || "N/A"}</span>
                        </div>
                        {project.specifications?.bedrooms && (
                          <div className="flex items-center gap-2 text-sm">
                            <Home className="w-4 h-4 text-primary" />
                            <span>{project.specifications.bedrooms} BHK</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Amenities */}
                      {project.amenities && project.amenities.length > 0 && (
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
                      )}
                      
                      <Button className="w-full group/btn" asChild>
                        <Link to={`/projects/${project.id}`}>
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
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
                        src={project.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <Badge className={`absolute top-4 left-4 ${getStatusColor(project.status)} text-white border-0`}>
                        {getStatusLabel(project.status)}
                      </Badge>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge variant="outline" className="mb-2">{categoryMap[project.category] || project.category}</Badge>
                          <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-2 text-muted-foreground mt-1">
                            <MapPin className="w-4 h-4" />
                            <span>{project.location}</span>
                          </div>
                        </div>
                        <p className="text-primary font-bold text-xl">{project.price} {project.priceUnit}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-6 mb-4">
                        <div className="flex items-center gap-2">
                          <Maximize className="w-5 h-5 text-primary" />
                          <span className="font-medium">{project.specifications?.area || "N/A"}</span>
                        </div>
                        {project.specifications?.bedrooms && (
                          <div className="flex items-center gap-2">
                            <Home className="w-5 h-5 text-primary" />
                            <span className="font-medium">{project.specifications.bedrooms} BHK</span>
                          </div>
                        )}
                      </div>
                      
                      {project.amenities && project.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4 flex-1">
                          {project.amenities.map((amenity, idx) => (
                            <span key={idx} className="text-xs bg-secondary px-3 py-1 rounded-full">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <Button className="self-start group/btn" asChild>
                        <Link to={`/projects/${project.id}`}>
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
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