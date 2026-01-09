import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, Linkedin, Instagram, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer id="contact" className="bg-footer text-footer-text">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-xl">VK</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-primary-foreground">
                  Vara Krishna
                </h3>
                <p className="text-sm text-footer-text">Infra</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-80 mb-6">
              Vara Krishna Infra is a premier real estate and infrastructure company in Hyderabad, 
              delivering quality projects with transparency and trust since 2009.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Youtube, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary text-footer-text hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-primary-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary" />
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {["Home", "About Us", "Our Projects", "Services", "Gallery", "Contact Us"].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition-all duration-300"
                  >
                    <ArrowRight className="w-3 h-3" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-primary-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary" />
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "Residential Projects",
                "Plot Development",
                "Commercial Spaces",
                "Construction",
                "Infrastructure",
                "Farm Houses"
              ].map((service) => (
                <li key={service}>
                  <a 
                    href="#services" 
                    className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition-all duration-300"
                  >
                    <ArrowRight className="w-3 h-3" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-primary-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary" />
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm mb-8">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+919515541663" className="hover:text-primary transition-colors">
                  +91 95155 41663
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@varakrishnainfra.com" className="hover:text-primary transition-colors">
                  info@varakrishnainfra.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <p className="text-sm mb-3 opacity-80">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-background/10 border-background/20 text-primary-foreground placeholder:text-footer-text/50 rounded-none"
                />
                <Button className="bg-primary hover:bg-primary/80 rounded-none px-4">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-70 text-center md:text-left">
            © {new Date().getFullYear()} Vara Krishna Infra. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm opacity-70">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
