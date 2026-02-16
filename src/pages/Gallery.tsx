import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import { X, ChevronLeft, ChevronRight, ZoomIn, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShimmerSkeleton } from "@/components/ui/shimmer-skeleton";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useGallery } from "@/hooks/useFirestore";

const categories = ["All", "Residential", "Commercial", "Plots", "Construction", "Interiors"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { galleryItems, loading } = useGallery();

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter(item => item.category === activeCategory);
  }, [galleryItems, activeCategory]);

  const openLightbox = (index: number) => {
    setCurrentItemIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextItem = () => {
    setCurrentItemIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevItem = () => {
    setCurrentItemIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentItem = filteredItems[currentItemIndex];

  return (
    <PageTransition>
      <SEO 
        title="Project Gallery | Vara Krishna Infra - Portfolio & Project Images"
        description="Explore our portfolio of completed and ongoing real estate projects in Hyderabad. View stunning visuals of residential projects, commercial spaces, plots, and infrastructure developments."
        keywords="vara krishna infra gallery, project images hyderabad, real estate portfolio, construction photos, property gallery hyderabad"
        url="https://varakrishnainfra.com/gallery"
      />
      <Layout>
        <PageHeader 
          title="Project Gallery"
          subtitle="Explore our portfolio of completed and ongoing projects through stunning visuals."
          breadcrumbs={[{ label: "Gallery" }]}
        />

        {/* Category Filter */}
        <section className="py-8 bg-secondary border-b border-border sticky top-[52px] z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
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
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="pt-12 pb-24 md:pt-16 md:pb-24 bg-background" ref={ref}>
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <ShimmerSkeleton 
                    key={i} 
                    className={`rounded-xl ${i === 1 ? 'md:col-span-2 md:row-span-2 h-[400px]' : 'h-48 md:h-64'}`} 
                  />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No gallery items found in this category.</p>
              </div>
            ) : (
              <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 stagger-children ${isVisible ? 'in-view' : ''}`}>
                {filteredItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`relative group cursor-pointer overflow-hidden rounded-xl aspect-[4/3] ${
                      index % 7 === 0 ? 'md:col-span-2 md:row-span-2 md:aspect-[4/3]' : ''
                    }`}
                    onClick={() => openLightbox(index)}
                  >
                    {item.type === 'video' && item.youtubeId ? (
                      <img 
                        src={`https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`}
                        alt={item.title}
                        className="img-uploaded transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <img 
                        src={item.url} 
                        alt={item.title}
                        className="img-uploaded transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                        {item.type === 'video' ? (
                          <Play className="w-10 h-10 text-white mx-auto mb-2" />
                        ) : (
                          <ZoomIn className="w-10 h-10 text-white mx-auto mb-2" />
                        )}
                        <h3 className="text-white font-medium">{item.title}</h3>
                        <span className="text-white/70 text-sm">{item.category}</span>
                      </div>
                    </div>
                    {item.type === 'video' && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        VIDEO
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        {lightboxOpen && currentItem && (
          <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center">
            {/* Close Button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button 
              onClick={prevItem}
              className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button 
              onClick={nextItem}
              className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Content */}
            <div className="max-w-5xl max-h-[80vh] px-16 w-full">
              {currentItem.type === 'video' && currentItem.youtubeId ? (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${currentItem.youtubeId}?autoplay=1`}
                    title={currentItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img 
                  src={currentItem.url} 
                  alt={currentItem.title}
                  className="max-w-full max-h-[80vh] object-contain mx-auto"
                />
              )}
              <div className="text-center mt-4">
                <h3 className="text-white text-xl font-medium">{currentItem.title}</h3>
                <span className="text-white/60">{currentItemIndex + 1} / {filteredItems.length}</span>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </PageTransition>
  );
};

export default Gallery;