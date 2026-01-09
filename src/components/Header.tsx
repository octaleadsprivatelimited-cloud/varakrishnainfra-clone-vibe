import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-background shadow-sm py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-serif font-bold text-xl">VK</span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-primary uppercase tracking-wide">
              Vara Krishna
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium tracking-wider">
              Infra
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <div>
              <span className="text-xs text-muted-foreground block">EMAIL SUPPORT</span>
              <a href="mailto:info@varakrishnainfra.com" className="font-medium hover:text-primary transition-colors">
                info@varakrishnainfra.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <div>
              <span className="text-xs text-muted-foreground block">CALL SUPPORT</span>
              <a href="tel:+919515541663" className="font-medium hover:text-primary transition-colors">
                +91 95155 41663
              </a>
            </div>
          </div>
          <Button className="cta-button rounded-none">
            Our Projects
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
