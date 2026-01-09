import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-footer text-footer-text">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-lg">VK</span>
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-primary-foreground">
                  Vara Krishna
                </h3>
                <p className="text-xs text-footer-text">Infra</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              Vara Krishna Infra is a leading real estate and infrastructure company based in Hyderabad. 
              We are committed to delivering quality projects and excellent customer service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-primary-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {["Home", "About Us", "Projects", "Services", "Gallery", "Contact Us"].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-primary-foreground mb-6">Our Services</h4>
            <ul className="space-y-3 text-sm">
              {["Real Estate", "Infrastructure", "Construction", "Plot Development", "Commercial Projects"].map((service) => (
                <li key={service}>
                  <a href="#services" className="hover:text-primary transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-primary-foreground mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm">
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

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Youtube, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-primary/20 hover:bg-primary text-footer-text hover:text-primary-foreground rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm opacity-70">
            © {new Date().getFullYear()} Vara Krishna Infra. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
