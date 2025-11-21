export enum ProductCategory {
  AMBIENT = 'Ambient Lights',
  NEON = 'Neon Signs',
  GAMER = 'Gamer Setup',
  SMART = 'Smart Home',
  PORTABLE = 'Portable Gadgets'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: ProductCategory;
  image: string;
  isNew?: boolean;
  isBestseller?: boolean;
  stockLevel: 'high' | 'medium' | 'low';
  affiliateLink: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}
