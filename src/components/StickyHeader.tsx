import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

const StickyHeader = () => {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only compact mode (hide TopBar on mobile) when scrolled
      setIsCompact(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        isCompact ? "shadow-lg" : ""
      }`}
    >
      {/* Hide TopBar on compact mode for mobile to save space */}
      <div className={`transition-all duration-300 overflow-hidden ${isCompact ? "max-h-0 md:max-h-20" : "max-h-20"}`}>
        <TopBar />
      </div>
      <Header />
      <Navbar />
    </div>
  );
};

export default StickyHeader;