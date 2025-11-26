import React from 'react';
import { Zap, Youtube, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const shopLinks = [
    { name: 'Alle Produkte', href: '/products' },
    { name: 'Neue Kollektion', href: '/products?category=neuheiten' },
    { name: 'Angebote', href: '/products?category=bestseller' },
    { name: 'Lookbook', href: '/lookbook' },
  ];

  const companyLinks = [
    { name: 'Über uns', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Kontakt', href: '/contact' },
  ];
  
  const legalLinks = [
      { name: 'AGB', href: '/agb' },
      { name: 'Datenschutz', href: '/datenschutz' },
      { name: 'Impressum', href: '/impressum' },
  ]

  const socialLinks = [
    { name: 'Youtube', icon: Youtube, href: 'https://www.youtube.com/@NicoGleichmann' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/nico.gleichmann/' },
  ];

  return (
    <footer className="glass-panel border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Branding */}
          <div className="lg:col-span-1 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="relative">
                <Zap className="w-8 h-8 text-lumio-neon group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-lumio-neon blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
              </div>
              <span className="font-display font-bold text-3xl tracking-widest text-white">LUMIO</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">Mode, die ein Statement setzt und die Zukunft der Beleuchtung neu definiert.</p>
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
          
          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold tracking-wider mb-6">Rechtliches</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 hover:text-white hover:text-glow-neon transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom part */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Lumio. Alle Rechte vorbehalten.</p>
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
