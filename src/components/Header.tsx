import { Link } from "react-router-dom";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-background border-b border-border py-4">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
            <span className="text-primary-foreground font-serif font-bold text-xl">VK</span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-primary uppercase tracking-wide group-hover:text-primary/80 transition-colors">
              Vara Krishna
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground font-semibold tracking-[0.3em] uppercase">
              Infra
            </p>
          </div>
        </Link>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-8">
          <div className="flex items-center gap-3 text-sm group cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
              <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground block uppercase tracking-wider">Email Support</span>
              <a href="mailto:info@varakrishnainfra.com" className="font-medium hover:text-primary transition-colors">
                info@varakrishnainfra.com
              </a>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-border" />
          <div className="flex items-center gap-3 text-sm group cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
              <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground block uppercase tracking-wider">Call Support</span>
              <a href="tel:+919515541663" className="font-medium hover:text-primary transition-colors">
                +91 95155 41663
              </a>
            </div>
          </div>
          <Link to="/projects">
            <Button className="cta-button rounded-lg group">
              Our Projects
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
