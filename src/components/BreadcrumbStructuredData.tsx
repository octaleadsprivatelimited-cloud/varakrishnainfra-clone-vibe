import { useEffect } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbStructuredDataProps {
  items: BreadcrumbItem[];
  currentUrl: string;
}

const BreadcrumbStructuredData = ({ items, currentUrl }: BreadcrumbStructuredDataProps) => {
  useEffect(() => {
    const baseUrl = "https://varakrishnainfra.com";
    
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        ...items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 2,
          "name": item.label,
          "item": item.href ? `${baseUrl}${item.href}` : currentUrl
        }))
      ]
    };

    // Remove existing breadcrumb script if any
    const existingScript = document.querySelector('script[data-breadcrumb="true"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb', 'true');
    script.text = JSON.stringify(breadcrumbList);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [items, currentUrl]);

  return null;
};

export default BreadcrumbStructuredData;
