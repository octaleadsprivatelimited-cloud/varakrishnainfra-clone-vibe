import { FaFacebookF, FaYoutube, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

const TopBar = () => {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between py-0.5 lg:py-0.5 px-4">
        <div className="text-[10px] lg:text-[11px] font-medium tracking-wide uppercase truncate text-center md:text-left flex-1 md:flex-none">
          Real Estate | Infrastructure | Tourism
        </div>
        <div className="hidden md:flex items-center gap-0 flex-shrink-0">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1 lg:p-1.5 hover:bg-primary-foreground/10 transition-colors rounded"
            aria-label="Facebook"
          >
            <FaFacebookF className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
          </a>
          <a 
            href="https://x.com/varakrishninfra" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1 lg:p-1.5 hover:bg-primary-foreground/10 transition-colors rounded"
            aria-label="X"
          >
            <FaXTwitter className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
          </a>
          <a 
            href="https://www.youtube.com/@varakrishnainfra" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1 lg:p-1.5 hover:bg-primary-foreground/10 transition-colors rounded"
            aria-label="YouTube"
          >
            <FaYoutube className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
          </a>
          <a 
            href="https://wa.me/918143341663" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1 lg:p-1.5 hover:bg-primary-foreground/10 transition-colors rounded"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
