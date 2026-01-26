import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { ShimmerSkeleton } from "@/components/ui/shimmer-skeleton";

const testimonials = [
  {
    text: "I am really happy with Vara Krishna Infra. What they committed was fulfilled on time. The documentation process was smooth and transparent. Thanks to the entire team for their professionalism and dedication.",
    name: "Ravi Kumar",
    role: "Villa Owner, Green Valley",
    rating: 5,
  },
  {
    text: "Everything was perfectly arranged by Vara Krishna Infra. The quality of construction and attention to detail exceeded our expectations. Highly recommended for anyone looking to invest in real estate.",
    name: "Priya Sharma",
    role: "Apartment Owner, Gachibowli",
    rating: 5,
  },
  {
    text: "We are very thankful to Vara Krishna Infra for delivering our dream home on time. The infrastructure quality is outstanding. Their customer service is exceptional and they really care about their clients.",
    name: "Venkat Reddy",
    role: "Plot Owner, Shamshabad",
    rating: 5,
  },
  {
    text: "Investing with Vara Krishna Infra was the best decision we made. The property value has appreciated significantly and the location is perfect. Great infrastructure and amenities.",
    name: "Lakshmi Devi",
    role: "Plot Owner, Mokila",
    rating: 5,
  },
];

const TestimonialSkeleton = () => (
  <div className="bg-background rounded-xl md:rounded-2xl shadow-2xl p-5 md:p-12 relative overflow-hidden">
    {/* Stars */}
    <div className="flex gap-1 mb-3 md:mb-6">
      {[...Array(5)].map((_, i) => (
        <ShimmerSkeleton key={i} variant="circular" className="w-4 h-4 md:w-5 md:h-5" />
      ))}
    </div>
    {/* Quote */}
    <div className="space-y-2 md:space-y-3 mb-4 md:mb-8">
      <ShimmerSkeleton variant="text" className="h-4 md:h-5 w-full" />
      <ShimmerSkeleton variant="text" className="h-4 md:h-5 w-5/6" />
      <ShimmerSkeleton variant="text" className="h-4 md:h-5 w-4/6 hidden md:block" />
    </div>
    {/* Author */}
    <div className="flex items-center gap-3 md:gap-4">
      <ShimmerSkeleton variant="circular" className="w-10 h-10 md:w-16 md:h-16" />
      <div className="space-y-1 md:space-y-2">
        <ShimmerSkeleton variant="text" className="h-4 md:h-5 w-24 md:w-28" />
        <ShimmerSkeleton variant="text" className="h-3 md:h-4 w-28 md:w-36" />
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, isVisible } = useScrollAnimation(0.15);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    // Simulate initial load
    const loadTimer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const timer = setInterval(nextTestimonial, 7000);
    return () => clearInterval(timer);
  }, [isLoading]);

  return (
    <section className="py-12 md:py-28 bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-6 md:mb-16 fade-up ${isVisible ? 'in-view' : ''}`}>
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-4">
            <span className="w-6 md:w-8 h-0.5 bg-primary" />
            Testimonials
            <span className="w-6 md:w-8 h-0.5 bg-primary" />
          </div>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-serif font-bold">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
        </div>

        <div className={`relative max-w-4xl mx-auto scale-up ${isVisible ? 'in-view' : ''}`}>
          {isLoading ? (
            <TestimonialSkeleton />
          ) : (
            <>
              {/* Testimonial Card */}
              <div className="bg-background rounded-xl md:rounded-2xl shadow-2xl p-5 md:p-12 relative overflow-hidden">
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 md:w-24 md:h-24 text-primary/10" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-3 md:mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-primary fill-primary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm md:text-xl text-foreground leading-relaxed mb-4 md:mb-8 relative z-10 line-clamp-3 md:line-clamp-none">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center text-primary-foreground font-bold text-lg md:text-2xl font-serif flex-shrink-0">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm md:text-lg text-foreground">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-xs md:text-base text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mt-5 md:mt-8">
            <button
              onClick={prevTestimonial}
              disabled={isLoading}
              className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-background border-2 border-border text-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-1.5 md:gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  disabled={isLoading}
                  className={`h-2 md:h-2.5 rounded-full transition-all duration-300 disabled:opacity-50 ${
                    index === currentIndex
                      ? "bg-primary w-6 md:w-10"
                      : "bg-border w-2 md:w-2.5 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              disabled={isLoading}
              className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-background border-2 border-border text-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
