import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="hidden lg:block bg-background border-b border-border py-4">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img 
            src={logo} 
            alt="Vara Krishna Infra" 
            className="h-16 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop Contact Info */}
        <div className="flex items-center gap-8">
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
          <div className="w-px h-10 bg-border" />
          <a
            href="/brochure.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-md transition-colors shadow-md hover:shadow-lg"
          >
            Download Brochure
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
