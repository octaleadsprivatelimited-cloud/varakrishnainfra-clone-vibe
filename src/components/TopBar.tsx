import { Facebook, Twitter, Youtube, MessageCircle } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <div className="text-xs font-medium tracking-wide uppercase">
          Real Estate | Infrastructure | Tourism
        </div>
        <div className="flex items-center gap-1">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 hover:bg-primary-foreground/10 transition-colors"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 hover:bg-primary-foreground/10 transition-colors"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 hover:bg-primary-foreground/10 transition-colors"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a 
            href="https://wa.me/919515541663" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 hover:bg-primary-foreground/10 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
