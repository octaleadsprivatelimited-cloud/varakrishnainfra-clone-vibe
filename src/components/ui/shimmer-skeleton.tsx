import { cn } from "@/lib/utils";

interface ShimmerSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circular" | "text" | "card" | "image";
}

function ShimmerSkeleton({ 
  className, 
  variant = "default",
  ...props 
}: ShimmerSkeletonProps) {
  const baseClasses = "relative overflow-hidden bg-muted before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent";
  
  const variantClasses = {
    default: "rounded-md",
    circular: "rounded-full",
    text: "rounded h-4",
    card: "rounded-xl",
    image: "rounded-lg",
  };

  return (
    <div 
      className={cn(baseClasses, variantClasses[variant], className)} 
      {...props} 
    />
  );
}

// Pre-built skeleton patterns
function HeroSkeleton() {
  return (
    <div className="relative h-[85vh] md:h-[90vh] bg-muted overflow-hidden">
      <ShimmerSkeleton variant="image" className="absolute inset-0" />
      
      {/* Content skeleton */}
      <div className="absolute inset-0 flex items-center pb-32 md:pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-6">
            {/* Tag */}
            <ShimmerSkeleton className="h-8 w-32 rounded-full" />
            {/* Title */}
            <ShimmerSkeleton className="h-12 md:h-16 w-3/4" />
            <ShimmerSkeleton className="h-12 md:h-16 w-1/2" />
            {/* Subtitle */}
            <ShimmerSkeleton className="h-6 w-2/3" />
            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <ShimmerSkeleton className="h-12 w-40" />
              <ShimmerSkeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner skeleton */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary/80 py-3 md:py-5">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <ShimmerSkeleton className="h-6 w-2/3 bg-white/20" />
          <ShimmerSkeleton className="h-10 w-32 bg-white/20" />
        </div>
      </div>
    </div>
  );
}

function ServiceCardSkeleton() {
  return (
    <div className="bg-background rounded-xl p-8 border border-border" style={{ boxShadow: 'var(--shadow-card)' }}>
      {/* Icon */}
      <ShimmerSkeleton className="w-16 h-16 rounded-xl mb-6" />
      {/* Title */}
      <ShimmerSkeleton variant="text" className="h-6 w-3/4 mb-4" />
      {/* Description */}
      <div className="space-y-2 mb-6">
        <ShimmerSkeleton variant="text" className="h-4 w-full" />
        <ShimmerSkeleton variant="text" className="h-4 w-5/6" />
        <ShimmerSkeleton variant="text" className="h-4 w-4/6" />
      </div>
      {/* Link */}
      <ShimmerSkeleton variant="text" className="h-4 w-24" />
    </div>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="bg-background rounded-xl overflow-hidden border border-border" style={{ boxShadow: 'var(--shadow-card)' }}>
      {/* Image */}
      <ShimmerSkeleton variant="image" className="h-64 w-full rounded-none" />
      {/* Content */}
      <div className="p-6">
        {/* Location */}
        <div className="flex items-center gap-2 mb-2">
          <ShimmerSkeleton variant="circular" className="w-4 h-4" />
          <ShimmerSkeleton variant="text" className="h-4 w-32" />
        </div>
        {/* Title */}
        <ShimmerSkeleton variant="text" className="h-6 w-3/4 mb-4" />
        {/* Details */}
        <div className="flex items-center gap-4 border-t border-border pt-4">
          <ShimmerSkeleton variant="text" className="h-4 w-20" />
          <ShimmerSkeleton variant="text" className="h-4 w-28" />
        </div>
      </div>
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="stat-card p-4 sm:p-6 md:p-8">
      <ShimmerSkeleton variant="circular" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-auto mb-2 sm:mb-3 md:mb-4" />
      <ShimmerSkeleton variant="text" className="h-8 sm:h-10 md:h-12 w-24 mx-auto mb-2" />
      <ShimmerSkeleton variant="text" className="h-4 w-20 mx-auto" />
    </div>
  );
}

function TestimonialCardSkeleton() {
  return (
    <div className="bg-background rounded-xl p-6 border border-border">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <ShimmerSkeleton key={i} variant="circular" className="w-4 h-4" />
        ))}
      </div>
      {/* Quote */}
      <div className="space-y-2 mb-6">
        <ShimmerSkeleton variant="text" className="h-4 w-full" />
        <ShimmerSkeleton variant="text" className="h-4 w-5/6" />
        <ShimmerSkeleton variant="text" className="h-4 w-4/6" />
      </div>
      {/* Author */}
      <div className="flex items-center gap-3">
        <ShimmerSkeleton variant="circular" className="w-12 h-12" />
        <div className="space-y-2">
          <ShimmerSkeleton variant="text" className="h-4 w-24" />
          <ShimmerSkeleton variant="text" className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

export { 
  ShimmerSkeleton, 
  HeroSkeleton, 
  ServiceCardSkeleton, 
  ProjectCardSkeleton, 
  StatCardSkeleton,
  TestimonialCardSkeleton 
};
