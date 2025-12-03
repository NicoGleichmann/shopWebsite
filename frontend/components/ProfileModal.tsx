
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './GlassUI';
import { X, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { token, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        setError('Nicht authentifiziert');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(''); // Reset error on new fetch
        const response = await fetch('/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
            if (response.status === 401) {
                logout();
                onClose();
                alert("Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.");
                return;
            }
            const errorData = await response.json().catch(() => ({})); // Catch if body is not JSON
            throw new Error(errorData.msg || errorData.err || 'Fehler beim Abrufen des Profils');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchUserProfile();
    }
  }, [token, isOpen, logout, onClose]);

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-[100] p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <GlassCard className="relative overflow-hidden">
                <div className='p-6 border-b border-white/10'>
                    <div className="flex items-center justify-between">
                        <div className='flex items-center gap-3'>
                            <div className='p-2 bg-lumio-neon/10 rounded-lg'>
                                <UserIcon className="text-lumio-neon" size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-white">Dein Profil</h2>
                        </div>
                        <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="p-6 min-h-[100px]">
                    {loading && <div className="text-center text-gray-300">Lade Profil...</div>}
                    {error && <div className="text-center text-red-400">{error}</div>}
                    {user && !loading && !error && (
                         <div className="flex flex-col space-y-4">
                            <div>
                                <label className="font-bold text-gray-400">Email:</label>
                                <p className="text-white">{user.email}</p>
                            </div>
                            <div>
                                <label className="font-bold text-gray-400">Mitglied seit:</label>
                                <p className="text-white">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                 <div className="p-4 bg-black/20 border-t border-white/10 flex justify-center items-center">
                    <button 
                        type="button"
                        onClick={handleClose}
                        className="bg-transparent border border-white/20 text-gray-300 font-bold py-2 px-6 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-300"
                    >
                        Schließen
                    </button>
                </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
