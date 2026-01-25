import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside or navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav className={`relative transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-secondary shadow-md'}`}>
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`nav-link relative ${isActive(item.href) ? "nav-link-active" : ""}`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-foreground" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden flex items-center justify-between py-3">
          <span className="font-serif font-bold text-lg text-foreground">
            Menu
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`lg:hidden absolute left-0 right-0 top-full bg-background border-b border-border shadow-xl z-50 overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          {/* Navigation Links */}
          <div className="space-y-1 mb-4">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center justify-between py-3 px-4 rounded-lg font-medium transition-all
                  ${isActive(item.href) 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-secondary"
                  }`}
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="uppercase tracking-wide text-sm">{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div className="pt-4 border-t border-border">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <a href="tel:+919515541663" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                +91 95155 41663
              </a>
              <div className="flex items-center gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <FaFacebookF className="w-3 h-3" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <FaInstagram className="w-3 h-3" />
                </a>
                <a href="https://wa.me/919515541663" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <FaWhatsapp className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
