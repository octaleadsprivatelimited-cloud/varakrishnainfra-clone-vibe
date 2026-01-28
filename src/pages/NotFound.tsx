import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "404 - Page Not Found",
    "description": "The page you are looking for does not exist on Vara Krishna Infra website.",
    "url": `https://varakrishnainfra.com${location.pathname}`,
    "mainEntity": {
      "@type": "Organization",
      "name": "Vara Krishna Infra"
    }
  };

  return (
    <>
      <SEO 
        title="404 - Page Not Found | Vara Krishna Infra"
        description="The page you are looking for does not exist. Return to Vara Krishna Infra homepage or explore our projects, services, and contact information."
        url={`https://varakrishnainfra.com${location.pathname}`}
        noindex={true}
        structuredData={structuredData}
      />
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center bg-background py-16">
          <div className="text-center max-w-2xl mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Page Not Found</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild className="cta-button">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Return to Home
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/projects">
                  <Search className="w-4 h-4 mr-2" />
                  View Projects
                </Link>
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Popular Pages:</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link to="/about" className="text-primary hover:underline">About Us</Link>
                <Link to="/services" className="text-primary hover:underline">Services</Link>
                <Link to="/projects" className="text-primary hover:underline">Projects</Link>
                <Link to="/gallery" className="text-primary hover:underline">Gallery</Link>
                <Link to="/contact" className="text-primary hover:underline">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NotFound;
