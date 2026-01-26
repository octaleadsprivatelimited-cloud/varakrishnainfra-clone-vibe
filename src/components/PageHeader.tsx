import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import heroBackground from "@/assets/hero-slide-1.jpg";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

const PageHeader = ({ title, subtitle, breadcrumbs = [] }: PageHeaderProps) => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Gradient Overlay for Brand Feel */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
          <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-primary transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white font-medium">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>

        {/* Title */}
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            {title.split(' ').map((word, i) => (
              <span key={i}>
                {i === title.split(' ').length - 1 ? (
                  <span className="text-gradient">{word}</span>
                ) : (
                  word + ' '
                )}
              </span>
            ))}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
