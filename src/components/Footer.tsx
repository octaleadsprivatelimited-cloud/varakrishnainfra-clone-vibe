import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  ArrowRight,
  Send,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-text">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
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
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary" />
              Quick Links
            </h4>
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
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-serif font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary" />
              Our Services
            </h4>
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
          </div>

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

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-white mb-3">Subscribe to Newsletter</h5>
              <div className="flex gap-2">
                <Input 
                  placeholder="Your email" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-10 rounded-lg"
                />
                <Button size="icon" className="h-10 w-10 flex-shrink-0 rounded-lg">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
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
