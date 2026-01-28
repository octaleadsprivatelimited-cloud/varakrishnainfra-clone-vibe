import { Link, useLocation } from "react-router-dom";
import { Home, Building2, Phone, Mail } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Projects", href: "/projects", icon: Building2 },
  { label: "Contact", href: "/contact", icon: Mail },
];

const MobileBottomNav = () => {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around h-16 px-2 pb-safe">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
              isActive(item.href)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className={`w-5 h-5 ${isActive(item.href) ? "scale-110" : ""} transition-transform`} />
            <span className="text-[10px] font-medium uppercase tracking-wide">{item.label}</span>
            {isActive(item.href) && (
              <span className="absolute bottom-0 w-12 h-0.5 bg-primary rounded-t-full" />
            )}
          </Link>
        ))}
        
        {/* Call Button */}
        <a
          href="tel:+918143341663"
          className="flex flex-col items-center justify-center flex-1 h-full"
        >
          <div className="w-12 h-12 -mt-6 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
            <Phone className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wide text-primary mt-1">Call</span>
        </a>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
