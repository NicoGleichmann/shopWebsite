import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  glow?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const GlassButton: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  glow = false, 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 z-10";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-100",
    secondary: "glass-panel text-white hover:bg-white/10",
    outline: "border border-white/30 text-white hover:bg-white/5"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const glowEffect = glow ? "shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)]" : "";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${glowEffect} ${className}`}
      {...props}
    >
      {/* Button specific internal sheen */}
      <div className="absolute inset-0 -translate-x-full hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
      {children}
    </motion.button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<CardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div 
      className={`glass-panel rounded-2xl p-6 transition-all duration-500 ${hoverEffect ? 'glass-panel-hover hover:-translate-y-2' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; color?: 'cyan' | 'hot' | 'accent' }> = ({ children, color = 'cyan' }) => {
  const colors = {
    cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    hot: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    accent: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md uppercase tracking-wider ${colors[color]}`}>
      {children}
    </span>
  );
};
