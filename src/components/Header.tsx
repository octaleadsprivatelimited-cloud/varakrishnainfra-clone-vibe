import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background border-b border-border py-3 md:py-4">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
            <span className="text-primary-foreground font-serif font-bold text-base md:text-xl">VK</span>
          </div>
          <div>
            <h1 className="text-base md:text-2xl font-serif font-bold text-primary uppercase tracking-wide group-hover:text-primary/80 transition-colors">
              Vara Krishna
            </h1>
            <p className="text-[10px] md:text-sm text-muted-foreground font-semibold tracking-[0.2em] md:tracking-[0.3em] uppercase">
              Infra
            </p>
          </div>
        </Link>

        {/* Desktop Contact Info */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block uppercase tracking-wider">Email Support</span>
              <a href="mailto:info@varakrishnainfra.com" className="font-medium hover:text-primary transition-colors">
                info@varakrishnainfra.com
              </a>
            </div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground block uppercase tracking-wider">Call Support</span>
              <a href="tel:+919515541663" className="font-medium hover:text-primary transition-colors">
                +91 95155 41663
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Call Button */}
        <a 
          href="tel:+919515541663" 
          className="lg:hidden flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">Call Now</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
