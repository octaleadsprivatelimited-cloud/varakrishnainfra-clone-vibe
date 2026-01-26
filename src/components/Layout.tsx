import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollToTop from "@/components/ScrollToTop";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden pb-16 lg:pb-0">
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
