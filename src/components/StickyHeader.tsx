import { useState, useEffect, useRef } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

const StickyHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      
      // Show header when scrolling up or at the top
      if (currentScrollY < 50) {
        setIsVisible(true);
        setIsCompact(false);
      } else if (scrollDelta > 10) {
        // Scrolling down - hide header
        setIsVisible(false);
        setIsCompact(true);
      } else if (scrollDelta < -10) {
        // Scrolling up - show header
        setIsVisible(true);
        setIsCompact(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isCompact ? "shadow-lg" : ""}`}
    >
      {/* Hide TopBar on compact mode for mobile */}
      <div className={`transition-all duration-300 ${isCompact ? "hidden md:block" : ""}`}>
        <TopBar />
      </div>
      <Header />
      <Navbar />
    </div>
  );
};

export default StickyHeader;