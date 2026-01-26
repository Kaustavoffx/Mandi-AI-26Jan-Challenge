import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Scan, CheckCircle } from 'lucide-react';

const CropScanner = ({ t, onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      
      // Mock scan results
      const mockResults = {
        crop: t.onions,
        quality: 'A+',
        price: '₹18/kg',
        confidence: 95
      };
      
      setTimeout(() => {
        onScanComplete(mockResults);
      }, 1500);
    }, 3000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        className="glass-morphism rounded-3xl p-8 text-center relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
      >
        {/* Scanning Animation Overlay */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neon-green/10 rounded-3xl"
            >
              <motion.div
                className="absolute inset-x-0 h-1 bg-neon-green"
                animate={{ y: [0, 300, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button */}
        <motion.button
          onClick={handleScan}
          disabled={isScanning}
          className={`
            w-full py-6 px-8 rounded-2xl font-bold text-xl
            transition-all duration-300 relative z-10
            ${isScanning 
              ? 'bg-neon-green/20 text-neon-green cursor-not-allowed' 
              : 'bg-gradient-to-r from-neon-green to-neon-orange hover:from-neon-orange hover:to-neon-green'
            }
          `}
          whileTap={!isScanning ? { scale: 0.95 } : {}}
        >
          <div className="flex items-center justify-center gap-3">
            {isScanning ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Scan size={28} />
                </motion.div>
                {t.scanning}
              </>
            ) : scanComplete ? (
              <>
                <CheckCircle size={28} />
                {t.detected}
              </>
            ) : (
              <>
                <Camera size={28} />
                {t.sellCrop}
              </>
            )}
          </div>
        </motion.button>

        {/* Scan Results */}
        <AnimatePresence>
          {scanComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-3"
            >
              <div className="glass-morphism rounded-xl p-4">
                <div className="text-neon-green font-semibold">
                  {t.detected}: {t.premium} {t.onions}
                </div>
                <div className="text-neon-orange">
                  {t.quality}: A+
                </div>
                <div className="text-white font-bold text-lg">
                  {t.suggestedPrice}: ₹18/kg
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CropScanner;