import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassUI';
import { Zap, Target, Users, Sparkles } from 'lucide-react';

const teamMembers = [
  {
    name: 'Nico Gleichmann',
    role: 'Gründer & CEO',
    imageUrl: 'https://placehold.co/400x400/0f1115/00f3ff?text=NG',
  },
];

export const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-lumio-dark text-white font-sans selection:bg-lumio-neon selection:text-black">
      <section id="about" className="py-20 px-6 pt-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-white">
              Über <span className="text-lumio-neon">Lumio</span>
            </h1>
            <p className="text-lg text-gray-400">
              Wir bringen Licht in die Zukunft der Mode und des Lifestyles.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="mb-12 p-8 text-center">
              <Zap className="w-12 h-12 text-lumio-neon mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Unsere Geschichte</h2>
              <p className="text-gray-300">
                Lumio wurde 2023 aus einer Leidenschaft für Technologie und Design geboren. Was als kleines Experiment in einer Garage begann, hat sich zu einer Bewegung entwickelt, die futuristische Ästhetik in den Alltag bringt. Wir glauben, dass Licht nicht nur funktional ist, sondern ein Ausdruck von Persönlichkeit und Kreativität.
              </p>
            </GlassCard>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <GlassCard className="p-8 h-full">
                <Target className="w-10 h-10 text-lumio-hot mb-4" />
                <h3 className="text-xl font-bold mb-2">Unsere Mission</h3>
                <p className="text-gray-400">
                  Wir wollen die Grenzen zwischen Mode, Technologie und Kunst verschwimmen lassen. Unsere Mission ist es, innovative Produkte zu schaffen, die nicht nur gut aussehen, sondern das Leben unserer Kunden inspirieren und bereichern.
                </p>
              </GlassCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <GlassCard className="p-8 h-full">
                <Sparkles className="w-10 h-10 text-lumio-accent mb-4" />
                <h3 className="text-xl font-bold mb-2">Unsere Werte</h3>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Innovation an der Schnittstelle von Tech & Style</li>
                  <li>Kompromisslose Qualität und Langlebigkeit</li>
                  <li>Kreativität und Selbstausdruck fördern</li>
                  <li>Eine nachhaltige Zukunft gestalten</li>
                </ul>
              </GlassCard>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-20"
          >
            <h2 className="text-3xl font-display font-bold mb-8 text-white">Der Gründer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-8 max-w-xs mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <GlassCard className="p-6 text-center" hoverEffect>
                    <img src={member.imageUrl} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-lumio-neon" />
                    <h4 className="font-bold text-lg">{member.name}</h4>
                    <p className="text-lumio-hot text-sm">{member.role}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};
