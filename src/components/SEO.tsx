import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  url?: string;
  noindex?: boolean;
  structuredData?: object;
}

const SEO = ({ 
  title = "Vara Krishna Infra | Real Estate & Infrastructure in Hyderabad",
  description = "Vara Krishna Infra - Leading Real Estate & Infrastructure Company in Hyderabad. Premium plots, villas, apartments & construction services. Call +91 8143341663",
  keywords = "real estate hyderabad, plots in hyderabad, infrastructure company, construction company, villas hyderabad, vara krishna infra",
  image = "https://varakrishnainfra.com/logo.png",
  type = "website",
  url,
  noindex = false,
  structuredData
}: SEOProps) => {
  const location = useLocation();
  const baseUrl = "https://varakrishnainfra.com";
  const currentUrl = url || `${baseUrl}${location.pathname}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Remove existing meta tags if they exist (to avoid duplicates)
    const removeMetaTag = (name: string, attribute: string = 'name') => {
      const element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (element) {
        element.remove();
      }
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Vara Krishna Infra');
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    
    // Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', fullImageUrl, 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');
    updateMetaTag('og:image:alt', title, 'property');
    updateMetaTag('og:url', currentUrl, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', 'Vara Krishna Infra', 'property');
    updateMetaTag('og:locale', 'en_IN', 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullImageUrl);
    updateMetaTag('twitter:image:alt', title);
    updateMetaTag('twitter:site', '@VaraKrishnaInfra');
    updateMetaTag('twitter:creator', '@VaraKrishnaInfra');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Add structured data (JSON-LD)
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Default Organization structured data
    const defaultStructuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Vara Krishna Infra",
      "url": baseUrl,
      "logo": `${baseUrl}/logo.png`,
      "description": "Leading Real Estate & Infrastructure Company in Hyderabad",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Pillor no, P-55, 3rd Floor Dwaraka Heights, Plot no 132, Raghavendra Colony",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500039",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-8143341663",
        "contactType": "Customer Service",
        "areaServed": "IN",
        "availableLanguage": ["en", "hi", "te"]
      },
      "sameAs": [
        "https://www.facebook.com/varakrishnainfra",
        "https://www.instagram.com/varakrishnainfra/",
        "https://www.linkedin.com/company/varakrishnainfra",
        "https://www.youtube.com/@varakrishnainfra",
        "https://x.com/varakrishninfra"
      ]
    };

    const finalStructuredData = structuredData || defaultStructuredData;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(finalStructuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [title, description, keywords, fullImageUrl, type, currentUrl, noindex, structuredData]);

  return null;
};

export default SEO;
