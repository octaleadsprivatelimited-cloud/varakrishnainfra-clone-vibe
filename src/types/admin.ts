export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'residential' | 'commercial' | 'plots' | 'construction' | 'farmhouse' | 'infrastructure';
  status: 'ongoing' | 'completed' | 'upcoming';
  location: string;
  price: string;
  priceUnit: string;
  amenities: string[];
  specifications: {
    area: string;
    bedrooms?: string;
    bathrooms?: string;
    parking?: string;
    floors?: string;
  };
  floorPlanImages: string[];
  images: string[];
  featured: boolean;
  youtubeVideoId?: string;
  mapCoordinates?: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  youtubeId?: string;
  title: string;
  category: string;
  createdAt: Date;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  whatsapp: string;
}

export interface SiteSettings {
  id: string;
  socialLinks: SocialLinks;
  updatedAt: Date;
}

export interface Enquiry {
  id: string;
  projectId: string;
  projectTitle: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: Date;
}
