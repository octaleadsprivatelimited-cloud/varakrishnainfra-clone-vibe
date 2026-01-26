import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

const slides = [
  {
    image: heroSlide1,
    title: "Premium Residential Villas",
    subtitle: "Experience luxury living in Hyderabad",
    tag: "Featured Project",
  },
  {
    image: heroSlide2,
    title: "Premium Plot Development",
    subtitle: "Invest in your future with prime locations",
    tag: "New Launch",
  },
  {
    image: heroSlide3,
    title: "Luxurious Villa Projects",
    subtitle: "Your dream home awaits in serene surroundings",
    tag: "Exclusive",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-[85vh] md:h-[90vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            index === currentSlide 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Slide Content */}
          {index === currentSlide && (
            <div className="absolute inset-0 flex items-center pb-32 md:pb-20">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-3xl">
                  {/* Tag */}
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/90 text-primary-foreground text-xs md:text-sm font-medium mb-4 md:mb-6 animate-fade-in"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary-foreground animate-pulse" />
                    {slide.tag}
                  </div>
                  
                  {/* Title */}
                  <h2 
                    className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-serif font-bold text-primary-foreground mb-3 md:mb-6 leading-tight animate-fade-in"
                    style={{ animationDelay: "0.4s" }}
                  >
                    {slide.title}
                  </h2>
                  
                  {/* Subtitle */}
                  <p 
                    className="text-sm sm:text-base md:text-xl lg:text-2xl text-primary-foreground/90 mb-5 md:mb-8 animate-fade-in leading-relaxed"
                    style={{ animationDelay: "0.6s" }}
                  >
                    {slide.subtitle}
                  </p>
                  
                  {/* Buttons */}
                  <div 
                    className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-in"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <Button className="cta-button rounded-none text-xs md:text-sm px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
                      Explore Projects <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white bg-white/10 hover:bg-white hover:text-foreground rounded-none text-xs md:text-sm font-semibold uppercase tracking-wider w-full sm:w-auto"
                    >
                      <Play className="w-4 h-4 md:w-4 md:h-4 mr-2 flex-shrink-0" /> 
                      <span>Watch Video</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Progress Bar */}
      <div className="absolute bottom-24 md:bottom-0 left-0 right-0 h-1 bg-primary-foreground/20">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 border-2 border-primary-foreground/30 hover:border-primary hover:bg-primary text-primary-foreground flex items-center justify-center transition-all duration-300 group"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 border-2 border-primary-foreground/30 hover:border-primary hover:bg-primary text-primary-foreground flex items-center justify-center transition-all duration-300 group"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Counter */}
      <div className="absolute right-8 bottom-32 md:bottom-24 text-primary-foreground font-medium hidden md:block">
        <span className="text-4xl font-serif">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="text-lg opacity-50"> / {String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-28 md:bottom-20 flex gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 md:h-3 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "bg-primary w-8 md:w-12"
                : "bg-primary-foreground/40 w-2 md:w-3 hover:bg-primary-foreground"
            }`}
          />
        ))}
      </div>

      {/* CTA Banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary py-3 md:py-5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-primary-foreground text-center md:text-left font-medium text-xs sm:text-sm md:text-lg leading-snug">
            We are an experienced and affordable <span className="font-bold">Real Estate & Infrastructure</span> Service Provider
          </p>
          <Button 
            variant="outline" 
            className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-primary rounded-none px-6 md:px-8 py-2 md:py-3 font-semibold text-xs md:text-sm whitespace-nowrap flex-shrink-0"
          >
            <span>Contact Us</span> <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 flex-shrink-0" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
