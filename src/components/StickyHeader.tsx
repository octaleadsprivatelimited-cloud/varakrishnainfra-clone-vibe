import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

const StickyHeader = () => {
  const [hideTopHeader, setHideTopHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide top header after scrolling down 100px
      if (currentScrollY > 100) {
        setHideTopHeader(true);
      } else {
        setHideTopHeader(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="sticky top-0 z-50 bg-background shadow-md">
      <div 
        className={`transition-all duration-300 overflow-hidden ${
          hideTopHeader ? 'max-h-0 opacity-0' : 'max-h-40 opacity-100'
        }`}
      >
        <TopBar />
        <Header />
      </div>
      <Navbar />
    </div>
  );
};

export default StickyHeader;