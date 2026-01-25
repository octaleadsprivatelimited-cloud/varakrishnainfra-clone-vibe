import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import PageTransition from "@/components/PageTransition";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const categories = ["All", "Residential", "Commercial", "Plots", "Construction", "Interiors"];

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop", category: "Residential", title: "Royal Gardens - Living Room" },
  { id: 2, src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop", category: "Commercial", title: "Skyline Towers - Exterior" },
  { id: 3, src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop", category: "Plots", title: "Green Valley - Aerial View" },
  { id: 4, src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", category: "Residential", title: "Palm Villas - Villa Front" },
  { id: 5, src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop", category: "Construction", title: "Infrastructure Project" },
  { id: 6, src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", category: "Residential", title: "Sunrise Farm Houses" },
  { id: 7, src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", category: "Interiors", title: "Modern Kitchen Design" },
  { id: 8, src: "https://images.unsplash.com/photo-1464938050520-ef2571e95e44?w=800&h=600&fit=crop", category: "Commercial", title: "Business Center Lobby" },
  { id: 9, src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop", category: "Commercial", title: "Metro Business Park" },
  { id: 10, src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", category: "Interiors", title: "Luxury Bathroom" },
  { id: 11, src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop", category: "Residential", title: "Swimming Pool" },
  { id: 12, src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop", category: "Interiors", title: "Master Bedroom" },
  { id: 13, src: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=800&h=600&fit=crop", category: "Construction", title: "Construction Progress" },
  { id: 14, src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop", category: "Residential", title: "Modern Apartment" },
  { id: 15, src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop", category: "Interiors", title: "Living Space" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation(0.1);

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <PageTransition>
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
        <section className="py-16 md:py-24 bg-background pb-24 lg:pb-24" ref={ref}>
          <div className="container mx-auto px-4">
            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 stagger-children ${isVisible ? 'in-view' : ''}`}>
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                    index % 7 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className={`w-full ${index % 7 === 0 ? 'h-[400px] md:h-full' : 'h-48 md:h-64'} object-cover transition-transform duration-700 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                      <ZoomIn className="w-10 h-10 text-white mx-auto mb-2" />
                      <h3 className="text-white font-medium">{image.title}</h3>
                      <span className="text-white/70 text-sm">{image.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightboxOpen && (
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

            {/* Image */}
            <div className="max-w-5xl max-h-[80vh] px-16">
              <img 
                src={filteredImages[currentImageIndex].src} 
                alt={filteredImages[currentImageIndex].title}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="text-center mt-4">
                <h3 className="text-white text-xl font-medium">{filteredImages[currentImageIndex].title}</h3>
                <span className="text-white/60">{currentImageIndex + 1} / {filteredImages.length}</span>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </PageTransition>
  );
};

export default Gallery;
