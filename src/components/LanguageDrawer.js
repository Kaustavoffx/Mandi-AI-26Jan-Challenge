import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { languageOptions, translations } from '../translations';
import { Globe, X, Search } from 'lucide-react';

const LanguageDrawer = ({ onLanguageSelect, selectedLanguage, isIntroPage = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Use English for intro page, selected language otherwise
  const displayText = isIntroPage ? {
    chooseLanguage: "Choose Your Language",
    selectLanguage: "Select Language",
    helpText: {
      languageSelector: "Choose your preferred language for the app"
    }
  } : (translations[selectedLanguage] || translations.en);

  const filteredLanguages = languageOptions.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLanguageSelect = (langCode) => {
    console.log('Language selected:', langCode); // Debug log
    onLanguageSelect(langCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => {
      console.log('Dialog state changed:', open); // Debug log
      setIsOpen(open);
    }}>
      <Dialog.Trigger asChild>
        <motion.button
          className="organic-card p-4 flex items-center gap-3 hover:shadow-leaf transition-all duration-300 relative"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => console.log('Language button clicked')} // Debug log
        >
          <Globe className="text-leaf-green" size={24} />
          <div className="text-left">
            <div className="font-medium text-earth-soil">
              {selectedLanguage ? 
                languageOptions.find(l => l.code === selectedLanguage)?.nativeName :
                displayText?.chooseLanguage || "Choose Your Language"
              }
            </div>
            <div className="text-sm text-earth-soil/60">
              {displayText?.selectLanguage || "Select Language"}
            </div>
          </div>
        </motion.button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] bg-clay-white rounded-organic shadow-organic z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <Dialog.Title className="text-2xl font-semibold text-earth-soil font-rounded">
                  {displayText?.chooseLanguage || "Choose Your Language"}
                </Dialog.Title>
                <Dialog.Description className="text-earth-soil/60 mt-1">
                  {displayText?.selectLanguage || "Select your preferred language"}
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <motion.button
                  className="p-2 rounded-gentle hover:bg-earth-soil/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} className="text-earth-soil" />
                </motion.button>
              </Dialog.Close>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-soil/40" size={20} />
              <input
                type="text"
                placeholder="Search languages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-gentle border border-leaf-green/20 focus:border-leaf-green focus:outline-none bg-white/80 text-earth-soil font-rounded"
              />
            </div>

            {/* Language Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {filteredLanguages.map((lang, index) => (
                  <motion.button
                    key={lang.code}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`
                      p-4 rounded-gentle border-2 transition-all duration-300 text-left
                      ${selectedLanguage === lang.code
                        ? 'border-leaf-green bg-leaf-green/10 shadow-leaf'
                        : 'border-earth-soil/10 hover:border-leaf-green/50 hover:bg-leaf-green/5'
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-leaf-green to-leaf-fresh text-white rounded-gentle flex items-center justify-center font-bold text-sm">
                        {lang.logo}
                      </div>
                      <div>
                        <div className={`font-medium text-earth-soil language-script font-${lang.script === 'devanagari' ? 'hindi' : lang.script === 'bengali' ? 'bengali' : lang.script === 'tamil' ? 'tamil' : lang.script === 'telugu' ? 'telugu' : 'rounded'}`}>
                          {lang.nativeName}
                        </div>
                        <div className="text-xs text-earth-soil/60 font-rounded">
                          {lang.name}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LanguageDrawer;