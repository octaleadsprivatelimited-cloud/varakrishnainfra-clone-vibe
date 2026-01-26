import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

const StickyHeader = () => {
  return (
    <div className="sticky top-0 z-50 bg-background shadow-md">
      <TopBar />
      <Header />
      <Navbar />
    </div>
  );
};

export default StickyHeader;