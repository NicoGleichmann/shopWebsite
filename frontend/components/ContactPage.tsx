// frontend/components/ContactPage.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, GlassButton } from './GlassUI';
import { Phone, Mail, MapPin, Send, CheckCircle, XCircle } from 'lucide-react';
import { Footer } from './Footer';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{type: 'sending' | 'success' | 'error', message: string} | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({type: 'sending', message: 'Sending...'});
    
    setTimeout(() => {
      if (name && email && message) {
        setStatus({type: 'success', message: 'Message sent successfully!'});
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus({type: 'error', message: 'Please fill out all fields.'});
      }
      setTimeout(() => setStatus(null), 5000);
    }, 2000);
  };

  return (
    <div className="h-full bg-lumio-dark text-white font-sans selection:bg-lumio-neon selection:text-black flex flex-col">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-lumio-neon/10 rounded-full blur-[150px] animate-blob" />
        <div className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] bg-lumio-accent/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      </div>

      <section id="contact" className="flex-grow py-20 px-6 pt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-white">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-400">
              We'd love to hear from you. Let's talk about light.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-lumio-neon">Contact Information</h2>
              <GlassCard className="p-6">
                <ul className="space-y-6">
                  {[
                    { icon: Phone, title: 'Phone', value: '+49 176 44444 856', href: 'tel:+4917644444856' },
                    { icon: Mail, title: 'Email', value: 'nicogleichmann1@gmail.com', href: 'mailto:nicogleichmann1@gmail.com' },
                    { icon: MapPin, title: 'Location', value: 'Cyberspace / Berlin, Germany', href: '#' }
                  ].map((item, i) => (
                    <motion.li 
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <item.icon className="w-6 h-6 text-lumio-neon shrink-0" />
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        <a href={item.href} className="text-gray-300 hover:text-white transition-colors break-all">{item.value}</a>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-lumio-neon">Send us a Message</h2>
              <GlassCard className="p-6" hoverEffect={false}>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div whileFocus={{ scale: 1.02}}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-lumio-neon focus:ring-1 focus:ring-lumio-neon transition-all"
                      placeholder="Your Name"
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02}}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-lumio-neon focus:ring-1 focus:ring-lumio-neon transition-all"
                      placeholder="Your Email"
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02}}>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-lumio-neon focus:ring-1 focus:ring-lumio-neon transition-all"
                      placeholder="How can we help you?"
                    ></textarea>
                  </motion.div>
                  <div className="flex justify-between items-center pt-2">
                    <GlassButton type="submit" variant="primary" glow disabled={status?.type === 'sending'}>
                      {status?.type === 'sending' ? 'Sending...' : 'Send Message'}
                      <Send className="w-4 h-4" />
                    </GlassButton>
                    <AnimatePresence>
                    {status && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className={`flex items-center gap-2 text-sm ${
                            status.type === 'success' ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {status.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          {status.message}
                        </motion.div>
                    )}
                    </AnimatePresence>
                  </div>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};