import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  ChevronRight,
  ChevronDown
} from "lucide-react";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/contact" },
];

const services = [
  "Residential Projects",
  "Plot Development",
  "Commercial Spaces",
  "Construction",
  "Farm Houses",
  "Infrastructure",
];

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({ title, children, defaultOpen = false }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="md:block">
      {/* Mobile Collapsible Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between py-4 border-b border-white/10"
      >
        <h4 className="text-lg font-serif font-bold text-white flex items-center gap-2">
          <span className="w-8 h-0.5 bg-primary" />
          {title}
        </h4>
        <ChevronDown 
          className={`w-5 h-5 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Desktop Header */}
      <h4 className="hidden md:flex text-lg font-serif font-bold text-white mb-6 items-center gap-2">
        <span className="w-8 h-0.5 bg-primary" />
        {title}
      </h4>

      {/* Content */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out md:!max-h-none md:!opacity-100 md:!py-0 ${
          isOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-text">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="pb-6 md:pb-0 border-b border-white/10 md:border-0">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-primary-foreground font-serif font-bold text-lg">VK</span>
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-white">Vara Krishna</h3>
                <p className="text-xs text-primary tracking-[0.2em] uppercase">Infra</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-footer-text">
              Building dreams into reality since 2008. Your trusted partner for premium real estate and infrastructure development in Hyderabad.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Collapsible on Mobile */}
          <CollapsibleSection title="Quick Links">
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="group flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* Services - Collapsible on Mobile */}
          <CollapsibleSection title="Our Services">
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to="/services"
                    className="group flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary" />
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Plot No. 123, Road No. 10, Jubilee Hills, Hyderabad - 500033</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+919515541663" className="text-sm hover:text-primary transition-colors">
                  +91 95155 41663
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@varakrishnainfra.com" className="text-sm hover:text-primary transition-colors">
                  info@varakrishnainfra.com
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">Mon - Sat: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-center md:text-left">
              © {new Date().getFullYear()} <span className="text-primary font-semibold">Vara Krishna Infra</span>. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/contact" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
