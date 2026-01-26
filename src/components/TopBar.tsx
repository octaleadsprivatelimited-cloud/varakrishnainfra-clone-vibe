import { FaFacebookF, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between py-1.5 md:py-2 px-4">
        <div className="text-[10px] md:text-xs font-medium tracking-wide uppercase truncate">
          Real Estate | Infrastructure | Tourism
        </div>
        <div className="flex items-center gap-0.5 md:gap-1 flex-shrink-0">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 md:p-2 hover:bg-primary-foreground/10 transition-colors rounded"
            aria-label="Facebook"
          >
            <FaFacebookF className="w-3 h-3 md:w-4 md:h-4" />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 md:p-2 hover:bg-primary-foreground/10 transition-colors rounded"
            aria-label="Twitter"
          >
            <FaTwitter className="w-3 h-3 md:w-4 md:h-4" />
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 md:p-2 hover:bg-primary-foreground/10 transition-colors rounded"
            aria-label="YouTube"
          >
            <FaYoutube className="w-3 h-3 md:w-4 md:h-4" />
          </a>
          <a 
            href="https://wa.me/919515541663" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 md:p-2 hover:bg-primary-foreground/10 transition-colors rounded"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="w-3 h-3 md:w-4 md:h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
