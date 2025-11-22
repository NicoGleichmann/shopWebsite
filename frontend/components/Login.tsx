// frontend/components/Login.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './GlassUI';
import { User, Lock, Mail, X } from 'lucide-react';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      // Handle registration logic
      console.log('Registering with:', { email, password, confirmPassword });
    } else {
      // Handle login logic
      console.log('Logging in with:', { email, password });
    }
    onClose(); // Close modal on submit
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <GlassCard className="w-full max-w-md relative">
              <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <X size={24} />
              </button>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-center text-white mb-2">
                  {isRegistering ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-center text-gray-400 mb-8">
                  {isRegistering ? 'Join the Lumio community' : 'Sign in to continue'}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-lumio-neon"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-lumio-neon"
                      required
                    />
                  </div>

                  {isRegistering && (
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-lumio-neon"
                        required
                      />
                    </div>
                  )}

                  <button 
                    type="submit"
                    className="w-full bg-lumio-neon text-gray-900 font-bold py-3 rounded-lg hover:bg-lumio-neon/90 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">{isRegistering ? 'Register' : 'Login'}</span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-125 transition-all duration-500 rounded-full" />
                  </button>
                </form>
                
                <p className="text-center text-gray-400 mt-8">
                  {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                  <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="font-bold text-lumio-neon hover:underline ml-2"
                  >
                    {isRegistering ? 'Login' : 'Register'}
                  </button>
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Login;