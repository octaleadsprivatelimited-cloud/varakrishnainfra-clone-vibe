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

        {/* Gallery Grid - uniform layout so every image fits the same cell */}
        <section className="pt-12 pb-24 md:pt-16 md:pb-24 bg-background" ref={ref}>
          <div className="container mx-auto px-4 max-w-7xl">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <ShimmerSkeleton key={i} className="rounded-xl aspect-[4/3] w-full" />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No gallery items found in this category.</p>
              </div>
            ) : (
              <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 stagger-children ${isVisible ? 'in-view' : ''}`}>
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative group cursor-pointer overflow-hidden rounded-xl bg-muted min-h-0 aspect-[4/3] shadow-sm hover:shadow-md transition-shadow duration-300"
                    onClick={() => openLightbox(index)}
                  >
                    {item.type === 'video' && item.youtubeId ? (
                      <img
                        src={`https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading={index < 12 ? 'eager' : 'lazy'}
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading={index < 12 ? 'eager' : 'lazy'}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                      <div className="flex items-center justify-center gap-2 text-white">
                        {item.type === 'video' ? (
                          <Play className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" />
                        ) : (
                          <ZoomIn className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" />
                        )}
                        <h3 className="text-sm sm:text-base font-medium line-clamp-2 text-center">{item.title}</h3>
                      </div>
                      <span className="text-white/80 text-xs sm:text-sm text-center">{item.category}</span>
                    </div>
                    {item.type === 'video' && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded">
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