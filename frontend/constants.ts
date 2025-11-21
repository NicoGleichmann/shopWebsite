import { Product, ProductCategory, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Quantum Hex Tiles PRO',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.9,
    reviews: 1240,
    category: ProductCategory.GAMER,
    image: 'https://picsum.photos/600/600?random=1',
    isBestseller: true,
    stockLevel: 'low',
    affiliateLink: '#',
    description: 'Modulare Touch-sensitive RGB Panels für das ultimative Setup.'
  },
  {
    id: '2',
    name: 'Cyberpunk Neon City Sign',
    price: 89.95,
    rating: 4.7,
    reviews: 450,
    category: ProductCategory.NEON,
    image: 'https://picsum.photos/600/600?random=2',
    stockLevel: 'medium',
    affiliateLink: '#',
    description: 'Handgefertigtes Glas-Neon mit futuristischem City-Vibe.'
  },
  {
    id: '3',
    name: 'Aura Corner Floor Lamp',
    price: 79.00,
    originalPrice: 110.00,
    rating: 4.8,
    reviews: 3200,
    category: ProductCategory.AMBIENT,
    image: 'https://picsum.photos/600/600?random=3',
    isBestseller: true,
    stockLevel: 'low',
    affiliateLink: '#',
    description: 'Minimalistische Ecklampe mit 16 Mio. Farben und App-Steuerung.'
  },
  {
    id: '4',
    name: 'GlowShift Monitor Bar',
    price: 45.99,
    rating: 4.6,
    reviews: 890,
    category: ProductCategory.GAMER,
    image: 'https://picsum.photos/600/600?random=4',
    stockLevel: 'high',
    affiliateLink: '#',
    description: 'Augenschonende Monitorbeleuchtung mit Backlight-Glow.'
  },
  {
    id: '5',
    name: 'Nebula Galaxy Projector 3.0',
    price: 59.99,
    originalPrice: 89.99,
    rating: 4.9,
    reviews: 5600,
    category: ProductCategory.AMBIENT,
    image: 'https://picsum.photos/600/600?random=5',
    isNew: true,
    stockLevel: 'low',
    affiliateLink: '#',
    description: 'Verwandle dein Zimmer in eine Galaxie. Laser-Präzision.'
  },
  {
    id: '6',
    name: 'Vaporwave Cloud Neon',
    price: 34.50,
    rating: 4.5,
    reviews: 210,
    category: ProductCategory.NEON,
    image: 'https://picsum.photos/600/600?random=6',
    stockLevel: 'medium',
    affiliateLink: '#',
    description: 'Dreamy Ästhetik für gemütliche Ecken.'
  },
  {
    id: '7',
    name: 'Smart WiFi LED Strip 10m',
    price: 29.99,
    rating: 4.4,
    reviews: 8800,
    category: ProductCategory.SMART,
    image: 'https://picsum.photos/600/600?random=7',
    stockLevel: 'high',
    affiliateLink: '#',
    description: 'Sprachgesteuert (Alexa/Google). Sync zur Musik.'
  },
  {
    id: '8',
    name: 'Pocket Glow Cube',
    price: 19.99,
    rating: 4.3,
    reviews: 150,
    category: ProductCategory.PORTABLE,
    image: 'https://picsum.photos/600/600?random=8',
    isNew: true,
    stockLevel: 'medium',
    affiliateLink: '#',
    description: 'Tragbares Ambient Light für Fotografie und Camping.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Alex K.',
    role: 'Tech Streamer',
    content: 'Mein Setup hat sich komplett verändert. Die Hex Tiles sind der Wahnsinn im Hintergrund!',
    avatar: 'https://picsum.photos/100/100?random=10'
  },
  {
    id: '2',
    name: 'Sarah M.',
    role: 'Interior Designer',
    content: 'Endlich Beleuchtung, die nicht billig aussieht. Das minimalistische Design überzeugt.',
    avatar: 'https://picsum.photos/100/100?random=11'
  },
  {
    id: '3',
    name: 'Jonas D.',
    role: 'Gamer',
    content: 'Schnelle Lieferung, geiler Vibe. Die Synchronisation mit Razer Chroma ist top.',
    avatar: 'https://picsum.photos/100/100?random=12'
  }
];
