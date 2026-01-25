import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-secondary shadow-md'}`}>
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
            <Link to="/" className="font-serif font-bold text-lg text-foreground">
              Menu
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Slide Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-background z-50 lg:hidden transform transition-transform duration-300 ease-out shadow-2xl ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-secondary">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold">VK</span>
            </div>
            <div>
              <span className="font-serif font-bold text-primary">Vara Krishna</span>
              <span className="text-xs text-muted-foreground block">Infra</span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="overflow-y-auto h-[calc(100%-180px)]">
          <nav className="p-4">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center justify-between py-4 px-4 mb-2 rounded-lg font-medium transition-all
                  ${isActive(item.href) 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-secondary"
                  }`}
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="uppercase tracking-wide text-sm">{item.label}</span>
                <ChevronRight className="w-5 h-5 opacity-50" />
              </Link>
            ))}
          </nav>

          {/* Contact Info in Mobile Menu */}
          <div className="px-4 py-6 border-t border-border">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a href="tel:+919515541663" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                +91 95155 41663
              </a>
              <a href="mailto:info@varakrishnainfra.com" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                info@varakrishnainfra.com
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Hyderabad, India
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Footer with Social */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-secondary">
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="https://wa.me/919515541663" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
              <FaWhatsapp className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
