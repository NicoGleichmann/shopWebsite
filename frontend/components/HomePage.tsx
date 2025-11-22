import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Zap, TrendingUp, Box, Check, Instagram, Twitter, Facebook } from 'lucide-react';
import { Navbar } from './Navbar';
import { GlassButton, GlassCard, Badge } from './GlassUI';
import { PRODUCTS, TESTIMONIALS } from '../constants';
import { Product, ProductCategory } from '../types';

// --- HELPER COMPONENTS WITHIN APP.TSX TO SIMPLIFY ---

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <GlassCard className="group relative flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {product.isNew && <Badge color="cyan">New Arrival</Badge>}
        {product.isBestseller && <Badge color="hot">Bestseller</Badge>}
      </div>
      
      {/* Stock Status */}
      {product.stockLevel === 'low' && (
        <div className="absolute top-4 right-4 z-20 bg-red-500/20 border border-red-500/50 px-2 py-1 rounded text-[10px] font-bold text-red-200 animate-pulse">
          Only 3 left!
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden rounded-xl mb-4 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        {/* Add to Cart Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <GlassButton size="sm" className="w-full bg-white/90 text-black backdrop-blur-none">
                Schnellansicht
            </GlassButton>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
           <span className="text-xs text-gray-400 uppercase tracking-wider">{product.category}</span>
           <div className="flex items-center gap-1">
             <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
             <span className="text-xs text-gray-300">{product.rating}</span>
           </div>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-lumio-neon transition-colors">
            {product.name}
        </h3>
        
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
            {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
                {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">€{product.originalPrice.toFixed(2)}</span>
                )}
                <span className="text-xl font-display font-bold text-white">€{product.price.toFixed(2)}</span>
            </div>
            <a 
                href={product.affiliateLink} 
                target="_blank" 
                rel="noreferrer"
                className="bg-lumio-neon text-black font-bold py-2 px-4 rounded-lg text-sm hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(0,243,255,0.4)]"
            >
                Kaufen
            </a>
        </div>
      </div>
    </GlassCard>
  );
};

const Footer = () => (
  <footer className="border-t border-white/10 bg-black py-12 px-6 mt-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
      <div>
        <div className="flex items-center gap-2 mb-4">
           <Zap className="w-5 h-5 text-lumio-neon" />
           <span className="font-display font-bold text-lg text-white">LUMIO</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          Die Destination für futuristische Beleuchtung und ästhetische Setups. Wir kuratieren die besten Produkte für deinen Vibe.
        </p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Shop</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="#" className="hover:text-lumio-neon transition-colors">Alle Produkte</a></li>
          <li><a href="#" className="hover:text-lumio-neon transition-colors">Bestseller</a></li>
          <li><a href="#" className="hover:text-lumio-neon transition-colors">Neuheiten</a></li>
          <li><a href="#" className="hover:text-lumio-neon transition-colors">Geschenkgutscheine</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Support</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="#" className="hover:text-lumio-neon transition-colors">Versand & Rückgabe</a></li>
          <li><a href="#" className="hover:text-lumio-neon transition-colors">FAQ</a></li>
          <li><a href="#" className="hover:text-lumio-neon transition-colors">Kontakt</a></li>
          <li><a href="#" className="hover:text-lumio-neon transition-colors">Affiliate Partner</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Stay Glowing</h4>
        <div className="flex gap-4 mb-4">
            <Instagram className="w-5 h-5 text-gray-400 hover:text-lumio-hot cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-lumio-neon cursor-pointer transition-colors" />
            <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
        </div>
        <p className="text-xs text-gray-500">© 2024 Lumio. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export const HomePage: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(PRODUCTS);
    } else {
      setFilteredProducts(PRODUCTS.filter(p => p.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-lumio-dark text-white font-sans selection:bg-lumio-neon selection:text-black">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background simulating video/glow */}
        <div className="absolute inset-0 bg-black">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-lumio-neon/20 rounded-full blur-[120px] animate-blob mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-lumio-accent/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
            <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] bg-lumio-hot/20 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-screen" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        </div>
        
        <motion.div 
          style={{ y: y1, opacity: opacityHero }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge color="cyan">Next Gen Lighting</Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 leading-[1.1]"
          >
            BRING DEIN LEBEN<br />
            <span className="text-glow-neon text-white">ZUM LEUCHTEN</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Entdecke die kuratierte Kollektion für futuristische Setups, 
            Smart Homes und atmosphärische Vibes.
          </motion.p>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.8 }}
             className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <GlassButton variant="primary" glow size="lg" onClick={() => document.getElementById('shop')?.scrollIntoView({behavior: 'smooth'})}>
              Jetzt shoppen <ArrowRight className="w-5 h-5" />
            </GlassButton>
            <GlassButton variant="secondary" size="lg">
              Bestseller ansehen
            </GlassButton>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* CATEGORIES / SHOP SECTION */}
      <section id="shop" className="py-20 px-6 relative z-20 bg-lumio-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Curated Collection</h2>
             <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {['All', ...Object.values(ProductCategory)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as any)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat 
                        ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                        : 'glass-panel text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          <div className="mt-12 text-center">
            <GlassButton variant="outline" size="lg">
              Alle Produkte anzeigen
            </GlassButton>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 bg-lumio-panel border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: Zap, title: "Ultra Energy Efficient", desc: "Modernste LED Technologie spart bis zu 90% Strom." },
               { icon: Box, title: "Premium Qualität", desc: "Handverlesene Materialien und robuster Bau für Langlebigkeit." },
               { icon: TrendingUp, title: "Trending Ästhetik", desc: "Wir kuratieren nur, was auf TikTok und IG viral geht." },
             ].map((feature, idx) => (
               <GlassCard key={idx} className="flex flex-col items-center text-center" hoverEffect={false}>
                  <div className="p-4 rounded-full bg-white/5 mb-6 text-lumio-neon">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
               </GlassCard>
             ))}
           </div>
        </div>
      </section>

      {/* INSPIRATION / MASONRY */}
      <section id="inspiration" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <Badge color="accent">Inspiration</Badge>
             <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6">
               CREATE YOUR <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-lumio-accent to-lumio-hot">DREAM SETUP</span>
             </h2>
             <p className="text-gray-300 text-lg mb-8">
               Egal ob Gaming-Höhle, Home-Office oder Chill-Lounge. Licht verändert alles.
               Lass dich von tausenden Setups unserer Community inspirieren.
             </p>
             <div className="space-y-4">
               {["RGB Sync Technologie", "App Steuerung", "Einfache Installation"].map((item, i) => (
                 <div key={i} className="flex items-center gap-3">
                   <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400">
                     <Check className="w-3 h-3" />
                   </div>
                   <span className="text-gray-200">{item}</span>
                 </div>
               ))}
             </div>
             <div className="mt-10">
               <GlassButton variant="primary">Lookbook ansehen</GlassButton>
             </div>
          </div>
          
          <div className="md:w-1/2 grid grid-cols-2 gap-4 relative">
             {/* Decorative glows behind images */}
             <div className="absolute inset-0 bg-lumio-accent/30 blur-[100px] -z-10" />
             
             <motion.div 
               whileHover={{ y: -10 }} 
               className="h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
             >
               <img src="https://picsum.photos/400/600?random=20" className="w-full h-full object-cover" alt="Setup" />
             </motion.div>
             <motion.div 
               whileHover={{ y: -10 }} 
               className="h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-12"
             >
               <img src="https://picsum.photos/400/600?random=21" className="w-full h-full object-cover" alt="Setup" />
             </motion.div>
             <motion.div 
               whileHover={{ y: -10 }} 
               className="h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
             >
               <img src="https://picsum.photos/400/600?random=22" className="w-full h-full object-cover" alt="Setup" />
             </motion.div>
             <motion.div 
               whileHover={{ y: -10 }} 
               className="h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-[-3rem]"
             >
               <img src="https://picsum.photos/400/600?random=23" className="w-full h-full object-cover" alt="Setup" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-black relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Community Vibe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <GlassCard key={t.id} className="bg-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-lumio-neon" />
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <span className="text-xs text-lumio-neon uppercase">{t.role}</span>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{t.content}"</p>
                <div className="flex gap-1 mt-4">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="relative overflow-hidden p-8 md:p-12 text-center border border-lumio-neon/30">
             <div className="absolute inset-0 bg-gradient-to-br from-lumio-neon/10 via-transparent to-lumio-hot/10 pointer-events-none" />
             <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">JOIN THE GLOW CLUB</h2>
               <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                 Erhalte exklusive Deals, Setup-Guides und Early-Access zu neuen Drops. Kein Spam, nur Vibes.
               </p>
               <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                 <input 
                   type="email" 
                   placeholder="Deine Email Adresse" 
                   className="flex-grow bg-black/50 border border-white/20 rounded-full px-6 py-3 text-white focus:outline-none focus:border-lumio-neon transition-colors"
                 />
                 <GlassButton variant="primary" glow className="px-8">
                   Anmelden
                 </GlassButton>
               </form>
             </div>
          </GlassCard>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};
