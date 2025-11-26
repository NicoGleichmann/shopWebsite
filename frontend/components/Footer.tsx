import React, { useState } from 'react';
import { Zap, Twitter, Instagram, Facebook, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Bitte gib eine E-Mail-Adresse ein.');
      return;
    }

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Etwas ist schief gelaufen.');
      }

      setMessage(data.message);
      setEmail('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const shopLinks = [
    { name: 'Alle Produkte', href: '/products' },
    { name: 'Lookbook', href: '/lookbook' },
  ];

  const companyLinks = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Kontakt', href: '/contact' },
  ];
  
  const legalLinks = [
      { name: 'AGB', href: '#' },
      { name: 'Datenschutz', href: '#' },
      { name: 'Impressum', href: '#' },
  ]

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
  ];

  return (
    <footer className="glass-panel border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Branding */}
          <div className="flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="relative">
                <Zap className="w-8 h-8 text-lumio-neon group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-lumio-neon blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
              </div>
              <span className="font-display font-bold text-3xl tracking-widest text-white">LUMIO</span>
            </Link>
            <p className="text-gray-400 text-sm">Mode, die ein Statement setzt.</p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white font-semibold tracking-wider mb-6">Shop</h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 hover:text-white hover:text-glow-neon transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold tracking-wider mb-6">Unternehmen</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 hover:text-white hover:text-glow-neon transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold tracking-wider mb-6">Glow Club</h3>
            <p className="text-gray-400 mb-4 text-sm">Werde Teil des Glow Clubs und verpasse keine neuen Drops & exklusiven Rabatte mehr.</p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine-email@beispiel.de"
                className="glass-input w-full"
                aria-label="Email für Newsletter"
              />
              <button type="submit" className="glass-button p-2.5" aria-label="Newsletter abonnieren">
                <Send className="w-5 h-5" />
              </button>
            </form>
            <AnimatePresence>
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-lumio-neon text-sm mt-3"
                >
                  {message}
                </motion.p>
              )}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-sm mt-3"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className='flex flex-col md:flex-row gap-6 items-center'>
                 <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Lumio. Alle Rechte vorbehalten.</p>
                <div className="flex space-x-4">
                    {legalLinks.map((link) => (
                         <Link key={link.name} to={link.href} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">{link.name}</Link>
                    ))}
                </div>
            </div>
          <div className="flex space-x-5">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.href} className="text-gray-400 hover:text-white transition-colors" title={social.name}>
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
