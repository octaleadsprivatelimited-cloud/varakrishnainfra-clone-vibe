import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShimmerSkeleton } from "@/components/ui/shimmer-skeleton";
import { 
  MapPin, 
  IndianRupee, 
  Maximize, 
  BedDouble, 
  Bath, 
  Car, 
  Building2, 
  ChevronLeft, 
  ChevronRight,
  X,
  Phone,
  Mail,
  ArrowLeft,
  Check
} from "lucide-react";
import { Project } from "@/types/admin";
import { Link } from "react-router-dom";
import ProjectEnquiryForm from "@/components/ProjectEnquiryForm";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'images' | 'floorplans'>('images');

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProject({
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate(),
            updatedAt: docSnap.data().updatedAt?.toDate()
          } as Project);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const categoryMap: Record<string, string> = {
    residential: "Residential",
    commercial: "Commercial",
    plots: "Plots",
    construction: "Construction",
    farmhouse: "Farm House",
    infrastructure: "Infrastructure",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-500";
      case "ongoing": return "bg-amber-500";
      case "upcoming": return "bg-blue-500";
      default: return "bg-muted";
    }
  };

  const currentImages = activeTab === 'images' 
    ? (project?.images || []) 
    : (project?.floorPlanImages || []);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <PageTransition>
        <Layout>
          <div className="container mx-auto px-4 py-8">
            <ShimmerSkeleton className="h-8 w-48 mb-8" />
            <div className="grid lg:grid-cols-2 gap-8">
              <ShimmerSkeleton className="aspect-[4/3] rounded-2xl" />
              <div className="space-y-4">
                <ShimmerSkeleton className="h-10 w-3/4" />
                <ShimmerSkeleton className="h-6 w-1/2" />
                <ShimmerSkeleton className="h-24 w-full" />
                <ShimmerSkeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </Layout>
      </PageTransition>
    );
  }

  if (!project) {
    return (
      <PageTransition>
        <Layout>
          <div className="container mx-auto px-4 py-16 text-center">
            <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/projects')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </div>
        </Layout>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Layout>
        <PageHeader 
          title={project.title}
          subtitle={project.location}
          breadcrumbs={[
            { label: "Projects", href: "/projects" },
            { label: project.title }
          ]}
        />

        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              className="mb-6"
              onClick={() => navigate('/projects')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div 
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => currentImages.length > 0 && openLightbox(activeImageIndex)}
                >
                  {currentImages.length > 0 ? (
                    <>
                      <img
                        src={currentImages[activeImageIndex]}
                        alt={`${project.title} - Image ${activeImageIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      
                      {/* Navigation Arrows */}
                      {currentImages.length > 1 && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-4 right-4 bg-background/80 px-3 py-1 rounded-full text-sm">
                        {activeImageIndex + 1} / {currentImages.length}
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Building2 className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Tab Switcher */}
                {(project.images?.length > 0 || project.floorPlanImages?.length > 0) && (
                  <div className="flex gap-2">
                    <Button
                      variant={activeTab === 'images' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => { setActiveTab('images'); setActiveImageIndex(0); }}
                      disabled={!project.images?.length}
                    >
                      Photos ({project.images?.length || 0})
                    </Button>
                    <Button
                      variant={activeTab === 'floorplans' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => { setActiveTab('floorplans'); setActiveImageIndex(0); }}
                      disabled={!project.floorPlanImages?.length}
                    >
                      Floor Plans ({project.floorPlanImages?.length || 0})
                    </Button>
                  </div>
                )}

                {/* Thumbnails */}
                {currentImages.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {currentImages.slice(0, 5).map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          index === activeImageIndex 
                            ? 'border-primary ring-2 ring-primary/20' 
                            : 'border-transparent hover:border-primary/50'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {index === 4 && currentImages.length > 5 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-medium">
                            +{currentImages.length - 5}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                {/* Status & Category */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${getStatusColor(project.status)} text-white border-0`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                  <Badge variant="secondary">
                    {categoryMap[project.category] || project.category}
                  </Badge>
                  {project.featured && (
                    <Badge variant="outline" className="border-primary text-primary">
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Title & Location */}
                <div>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                    {project.title}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">{project.location}</span>
                  </div>
                </div>

                {/* Price */}
                {project.price && (
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                    <div className="flex items-center gap-1 text-3xl font-bold text-primary">
                      <IndianRupee className="w-7 h-7" />
                      <span>{project.price} {project.priceUnit}</span>
                    </div>
                  </div>
                )}

                {/* Specifications */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.specifications?.area && (
                    <div className="p-4 bg-secondary rounded-xl text-center">
                      <Maximize className="w-6 h-6 mx-auto text-primary mb-2" />
                      <p className="text-sm text-muted-foreground">Area</p>
                      <p className="font-semibold">{project.specifications.area}</p>
                    </div>
                  )}
                  {project.specifications?.bedrooms && (
                    <div className="p-4 bg-secondary rounded-xl text-center">
                      <BedDouble className="w-6 h-6 mx-auto text-primary mb-2" />
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <p className="font-semibold">{project.specifications.bedrooms} BHK</p>
                    </div>
                  )}
                  {project.specifications?.bathrooms && (
                    <div className="p-4 bg-secondary rounded-xl text-center">
                      <Bath className="w-6 h-6 mx-auto text-primary mb-2" />
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                      <p className="font-semibold">{project.specifications.bathrooms}</p>
                    </div>
                  )}
                  {project.specifications?.parking && (
                    <div className="p-4 bg-secondary rounded-xl text-center">
                      <Car className="w-6 h-6 mx-auto text-primary mb-2" />
                      <p className="text-sm text-muted-foreground">Parking</p>
                      <p className="font-semibold">{project.specifications.parking}</p>
                    </div>
                  )}
                </div>

                {/* Description */}
                {project.description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About This Property</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                )}

                {/* Amenities */}
                {project.amenities && project.amenities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {project.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button size="lg" className="flex-1" asChild>
                    <a href="#enquiry-form">
                      <Phone className="w-4 h-4 mr-2" />
                      Schedule a Visit
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1" asChild>
                    <Link to="/contact">
                      <Mail className="w-4 h-4 mr-2" />
                      General Enquiry
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Enquiry Form Section */}
            <div id="enquiry-form" className="mt-16 max-w-2xl mx-auto scroll-mt-24">
              <ProjectEnquiryForm projectId={project.id} projectTitle={project.title} />
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightboxOpen && currentImages.length > 0 && (
          <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center">
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <button 
              onClick={prevImage}
              className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="max-w-5xl max-h-[80vh] px-16">
              <img 
                src={currentImages[activeImageIndex]} 
                alt={`${project.title} - Image ${activeImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="text-center mt-4">
                <span className="text-white/60">{activeImageIndex + 1} / {currentImages.length}</span>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </PageTransition>
  );
};

export default ProjectDetail;
