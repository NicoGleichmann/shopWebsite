import React from 'react';
import { motion } from 'framer-motion';
import { INSPIRATIONS } from '../lookbookConstants';
import { Badge } from './GlassUI';

const InspirationCard: React.FC<{ inspiration: typeof INSPIRATIONS[0] }> = ({ inspiration }) => {
  return (
    <motion.div 
      className="mb-4 break-inside-avoid group relative"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={inspiration.imageUrl} alt={inspiration.title} className="w-full h-auto rounded-lg shadow-lg" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-xl">{inspiration.title}</h3>
        <p className="text-gray-300 text-sm">by {inspiration.author}</p>
      </div>
    </motion.div>
  );
};

export const LookbookPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-lumio-dark text-white font-sans selection:bg-lumio-neon selection:text-black">
      <section id="lookbook" className="py-20 px-6 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge color="accent">Inspiration</Badge>
            <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6">
              CREATE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lumio-accent to-lumio-hot">DREAM SETUP</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Lass dich von Setups unserer Community inspirieren. Egal ob Gaming-Höhle, Home-Office oder Chill-Lounge. Licht verändert alles.
            </p>
          </div>
          
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {INSPIRATIONS.map((inspiration) => (
              <InspirationCard key={inspiration.id} inspiration={inspiration} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
