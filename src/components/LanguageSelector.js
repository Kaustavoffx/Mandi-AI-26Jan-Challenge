import React from 'react';
import { motion } from 'framer-motion';
import { languageOptions } from '../translations';

const LanguageSelector = ({ onLanguageSelect, selectedLanguage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto p-6"
    >
      <motion.h2
        className="text-3xl font-bold text-center mb-8 text-neon-green"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        Select Your Language
      </motion.h2>
      
      <div className="flex flex-wrap justify-center gap-4">
        {languageOptions.map((lang, index) => (
          <motion.button
            key={lang.code}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: selectedLanguage === lang.code 
                ? '0 0 30px rgba(0, 255, 136, 0.6)' 
                : '0 0 20px rgba(255, 107, 53, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onLanguageSelect(lang.code)}
            className={`
              glass-morphism rounded-2xl px-6 py-4 min-w-[140px]
              border-2 transition-all duration-300
              ${selectedLanguage === lang.code 
                ? 'border-neon-green neon-glow' 
                : 'border-neon-orange/30 hover:border-neon-orange'
              }
            `}
          >
            <div className="text-3xl mb-2">{lang.flag}</div>
            <div className="font-semibold text-lg">{lang.name}</div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default LanguageSelector;