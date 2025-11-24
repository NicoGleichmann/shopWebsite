
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './GlassUI';
import { X, SlidersHorizontal, Palette, Languages, Bell, User, Image } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingRow: React.FC<{ icon: React.ReactNode; label: string; control: React.ReactNode }> = ({ icon, label, control }) => (
  <div className="flex items-center justify-between py-4 border-b border-white/10">
    <div className="flex items-center gap-4">
      {icon}
      <span className="text-gray-200">{label}</span>
    </div>
    <div>{control}</div>
  </div>
);

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
  <button
    type="button"
    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-lumio-neon' : 'bg-gray-600'}`}
    onClick={() => onChange(!enabled)}
  >
    <span
      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
    />
  </button>
);


const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
        isActive 
        ? 'bg-white/10 text-white'
        : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
    }`}>
        {label}
    </button>
)

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('Appearance');
  
  // States for settings
  const [theme, setTheme] = useState('Dark');
  const [language, setLanguage] = useState('German');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);


  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle saving settings logic here
    console.log({ theme, language, emailNotifications, pushNotifications });
    handleClose();
  };

  const renderContent = () => {
      switch(activeTab) {
          case 'General':
              return (
                <div className='mt-6'>
                    <SettingRow 
                        icon={<Languages className="text-lumio-neon/80" size={20} />}
                        label="Language"
                        control={
                            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-40 bg-gray-800/50 border border-gray-700 rounded-lg py-2 px-3 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-lumio-neon">
                                <option>English</option>
                                <option>German</option>
                                <option>Spanish</option>
                            </select>
                        }
                    />
                     <SettingRow 
                        icon={<User className="text-lumio-neon/80" size={20} />}
                        label="Manage Profile"
                        control={<button className="text-sm text-lumio-neon hover:underline">Edit Profile</button>}
                    />
                </div>
              );
            case 'Appearance':
                return (
                    <div className='mt-6'>
                         <SettingRow 
                            icon={<Palette className="text-lumio-neon/80" size={20} />}
                            label="Theme"
                            control={
                                <div className="flex gap-2 p-1 rounded-lg bg-gray-900/60 border border-gray-700">
                                    {['Light', 'Dark', 'System'].map(t => (
                                        <button key={t} onClick={() => setTheme(t)} className={`px-3 py-1 text-sm rounded-md transition-colors ${theme === t ? 'bg-lumio-neon text-gray-900 font-semibold' : 'text-gray-300 hover:bg-white/5'}`}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            }
                        />
                         <SettingRow 
                            icon={<Image className="text-lumio-neon/80" size={20} />}
                            label="Custom Background"
                            control={<button className="text-sm text-lumio-neon hover:underline">Upload</button>}
                        />
                    </div>
                );
            case 'Notifications':
                return (
                     <div className='mt-6'>
                        <SettingRow 
                            icon={<Bell className="text-lumio-neon/80" size={20} />}
                            label="Email Notifications"
                            control={<ToggleSwitch enabled={emailNotifications} onChange={setEmailNotifications} />}
                        />
                        <SettingRow 
                            icon={<Bell className="text-lumio-neon/80" size={20} />}
                            label="Push Notifications"
                            control={<ToggleSwitch enabled={pushNotifications} onChange={setPushNotifications} />}
                        />
                    </div>
                );
          default:
              return null;
      }
  }

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
          >
            <GlassCard className="w-full max-w-2xl relative overflow-hidden">
                {/* Header */}
                <div className='p-6 border-b border-white/10'>
                    <div className="flex items-center justify-between">
                        <div className='flex items-center gap-3'>
                            <div className='p-2 bg-lumio-neon/10 rounded-lg'>
                                <SlidersHorizontal className="text-lumio-neon" size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-white">Settings</h2>
                        </div>
                        <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    <div className='mt-6 flex items-center gap-2'>
                        <TabButton label="General" isActive={activeTab === 'General'} onClick={() => setActiveTab('General')} />
                        <TabButton label="Appearance" isActive={activeTab === 'Appearance'} onClick={() => setActiveTab('Appearance')} />
                        <TabButton label="Notifications" isActive={activeTab === 'Notifications'} onClick={() => setActiveTab('Notifications')} />
                    </div>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit}>
                    <div className="p-6 h-64 overflow-y-auto">
                        {renderContent()}
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-black/20 border-t border-white/10 flex justify-between items-center">
                         <button 
                            type="button"
                            onClick={handleClose}
                            className="bg-transparent border border-white/20 text-gray-300 font-bold py-2 px-6 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="bg-lumio-neon text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-lumio-neon/90 transition-all duration-300"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
