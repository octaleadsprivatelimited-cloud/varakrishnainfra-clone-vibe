import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import { MapPin, Home, Maximize, ArrowRight, Filter, Grid, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShimmerSkeleton } from "@/components/ui/shimmer-skeleton";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useProjects } from "@/hooks/useFirestore";

const categories = ["All", "Residential", "Commercial", "Plots", "Villas", "Farm Houses", "Construction", "Infrastructure"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
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
        <section className="bg-secondary border-b border-border sticky top-[52px] z-40">
          {/* Desktop Filters */}
          <div className="hidden md:block py-4 lg:py-6">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
                {/* Category Filters */}
                <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                  <Filter className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground flex-shrink-0" />
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    {categories.map((cat) => (
                      <Button
                        key={cat}
                        variant={activeCategory === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveCategory(cat)}
                        className={`text-xs lg:text-sm whitespace-nowrap ${
                          activeCategory === cat 
                            ? "" 
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-background rounded-lg p-1 border border-border">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded transition-colors ${
                      viewMode === "grid" 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded transition-colors ${
                      viewMode === "list" 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="md:hidden">
            {/* Mobile Filter Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2 flex-1 overflow-x-auto scrollbar-hide">
                <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex items-center gap-2 flex-1 overflow-x-auto scrollbar-hide">
                  {categories.slice(0, 4).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                        activeCategory === cat
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-foreground border border-border"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                  {categories.length > 4 && (
                    <button
                      onClick={() => setShowMobileFilters(!showMobileFilters)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 border border-border transition-all ${
                        showMobileFilters
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-foreground"
                      }`}
                    >
                      More
                    </button>
                  )}
                </div>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-background rounded-lg p-1 border border-border ml-2 flex-shrink-0">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "grid" 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "list" 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expanded Mobile Filters */}
            {showMobileFilters && (
              <div className="px-4 py-3 bg-background border-b border-border animate-in slide-in-from-top-2">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold">All Categories</span>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-1 rounded-full hover:bg-secondary transition-colors"
                    aria-label="Close filters"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setShowMobileFilters(false);
                      }}
                      className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                        activeCategory === cat
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-8 md:py-16 lg:py-24 bg-background pb-24 lg:pb-24" ref={ref}>
          <div className="container mx-auto px-4">
            {/* Results Count */}
            <div className="mb-4 md:mb-8">
              <p className="text-sm md:text-base text-muted-foreground">
                Showing <span className="text-foreground font-semibold">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'}
                {activeCategory !== "All" && (
                  <span className="ml-1">in <span className="text-foreground font-semibold">{activeCategory}</span></span>
                )}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
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
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 stagger-children ${isVisible ? 'in-view' : ''}`}>
                {filteredProjects.map((project) => (
                  <div key={project.id} className="group bg-background rounded-xl md:rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2" style={{ boxShadow: 'var(--shadow-card)' }}>
                    {/* Image */}
                    <div className="relative h-48 md:h-64 overflow-hidden">
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
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                        <span className="line-clamp-1">{project.location}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 md:gap-4 mb-3 md:mb-4">
                        <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                          <Maximize className="w-3 h-3 md:w-4 md:h-4 text-primary flex-shrink-0" />
                          <span className="truncate">{project.specifications?.area || "N/A"}</span>
                        </div>
                        {project.specifications?.bedrooms && (
                          <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                            <Home className="w-3 h-3 md:w-4 md:h-4 text-primary flex-shrink-0" />
                            <span>{project.specifications.bedrooms} BHK</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Amenities */}
                      {project.amenities && project.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                          {project.amenities.slice(0, 3).map((amenity, idx) => (
                            <span key={idx} className="text-[10px] md:text-xs bg-secondary px-2 py-0.5 md:py-1 rounded-full">
                              {amenity}
                            </span>
                          ))}
                          {project.amenities.length > 3 && (
                            <span className="text-[10px] md:text-xs bg-secondary px-2 py-0.5 md:py-1 rounded-full">
                              +{project.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      <Button className="w-full group/btn text-xs md:text-sm" size="sm" asChild>
                        <Link to={`/projects/${project.id}`}>
                          View Details
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`space-y-4 md:space-y-6 stagger-children ${isVisible ? 'in-view' : ''}`}>
                {filteredProjects.map((project) => (
                  <div key={project.id} className="group bg-background rounded-xl md:rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 flex flex-col md:flex-row" style={{ boxShadow: 'var(--shadow-card)' }}>
                    {/* Image */}
                    <div className="relative w-full md:w-80 h-48 md:h-64 lg:h-auto overflow-hidden flex-shrink-0">
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
                    <div className="p-4 md:p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-3 md:mb-4 gap-2">
                        <div className="flex-1 min-w-0">
                          <Badge variant="outline" className="mb-2 text-xs">{categoryMap[project.category] || project.category}</Badge>
                          <h3 className="text-lg md:text-2xl font-serif font-bold group-hover:text-primary transition-colors line-clamp-2">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-2 text-muted-foreground mt-1 text-xs md:text-sm">
                            <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                            <span className="line-clamp-1">{project.location}</span>
                          </div>
                        </div>
                        <p className="text-primary font-bold text-base md:text-xl flex-shrink-0">{project.price} {project.priceUnit}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 md:gap-6 mb-3 md:mb-4">
                        <div className="flex items-center gap-2">
                          <Maximize className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                          <span className="font-medium text-xs md:text-sm">{project.specifications?.area || "N/A"}</span>
                        </div>
                        {project.specifications?.bedrooms && (
                          <div className="flex items-center gap-2">
                            <Home className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                            <span className="font-medium text-xs md:text-sm">{project.specifications.bedrooms} BHK</span>
                          </div>
                        )}
                      </div>
                      
                      {project.amenities && project.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4 flex-1">
                          {project.amenities.slice(0, 5).map((amenity, idx) => (
                            <span key={idx} className="text-[10px] md:text-xs bg-secondary px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                              {amenity}
                            </span>
                          ))}
                          {project.amenities.length > 5 && (
                            <span className="text-[10px] md:text-xs bg-secondary px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                              +{project.amenities.length - 5} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      <Button className="self-start group/btn text-xs md:text-sm" size="sm" asChild>
                        <Link to={`/projects/${project.id}`}>
                          View Details
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
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