import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Grid3X3, CheckCircle, TrendingUp, Leaf, Upload, MessageCircle } from 'lucide-react';
import GuideTooltip from './GuideTooltip';
import AIChat from './AIChat';
import imageAnalysisService from '../services/imageAnalysis';

const CropCard = ({ t, onScanComplete }) => {
  const [mode, setMode] = useState('scanner'); // 'scanner' or 'catalog'
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [cropData, setCropData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Mock crop data for catalog
  const cropCatalog = [
    { id: 'rice', name: t.rice, emoji: '🌾', price: '₹22/kg', quality: 'A+' },
    { id: 'wheat', name: t.wheat, emoji: '🌾', price: '₹18/kg', quality: 'A' },
    { id: 'onions', name: t.onions, emoji: '🧅', price: '₹25/kg', quality: 'A+' },
    { id: 'tomatoes', name: t.tomatoes, emoji: '🍅', price: '₹30/kg', quality: 'A' },
    { id: 'cotton', name: t.cotton, emoji: '🌱', price: '₹45/kg', quality: 'A+' },
    { id: 'corn', name: t.corn, emoji: '🌽', price: '₹20/kg', quality: 'A' },
    { id: 'potato', name: t.potato, emoji: '🥔', price: '₹15/kg', quality: 'B+' },
    { id: 'brinjal', name: t.brinjal, emoji: '🍆', price: '₹35/kg', quality: 'A' },
    { id: 'cabbage', name: t.cabbage, emoji: '🥬', price: '₹18/kg', quality: 'A' },
    { id: 'carrot', name: t.carrot, emoji: '🥕', price: '₹28/kg', quality: 'A+' },
    { id: 'cauliflower', name: t.cauliflower, emoji: '🥦', price: '₹32/kg', quality: 'A' },
    { id: 'spinach', name: t.spinach, emoji: '🥬', price: '₹40/kg', quality: 'A+' },
    { id: 'okra', name: t.okra, emoji: '🌶️', price: '₹45/kg', quality: 'A' },
    { id: 'peas', name: t.peas, emoji: '🟢', price: '₹60/kg', quality: 'A+' },
    { id: 'beans', name: t.beans, emoji: '🫘', price: '₹55/kg', quality: 'A' },
    { id: 'cucumber', name: t.cucumber, emoji: '🥒', price: '₹25/kg', quality: 'B+' },
  ];

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      await startRealAIAnalysis(file);
    }
  };

  const startRealAIAnalysis = async (imageFile) => {
    setIsScanning(true);
    setScanComplete(false);
    setCropData(null);
    
    try {
      // Use real AI image analysis
      const analysisResult = await imageAnalysisService.analyzeImage(imageFile);
      
      const mockData = {
        crop: analysisResult.cropType,
        quality: analysisResult.quality,
        price: analysisResult.pricePerKg,
        trend: analysisResult.marketTrend || 'up',
        confidence: analysisResult.confidence,
        emoji: analysisResult.emoji,
        notes: analysisResult.notes,
        source: 'ai-scanner'
      };
      
      setCropData(mockData);
      setIsScanning(false);
      setScanComplete(true);
      
      // Auto-proceed to negotiation
      setTimeout(() => {
        onScanComplete(mockData);
      }, 3000); // Give user time to see AI results
      
    } catch (error) {
      console.error('AI Analysis failed:', error);
      // Fallback to basic analysis
      setIsScanning(false);
      setScanComplete(false);
      alert('AI analysis failed. Please try again or select from catalog.');
    }
  };

  const handleCropSelect = (crop) => {
    const mockData = {
      crop: crop.name,
      quality: crop.quality,
      price: crop.price,
      trend: 'up',
      confidence: 98,
      emoji: crop.emoji,
      source: 'catalog'
    };
    
    setCropData(mockData);
    setScanComplete(true);
    
    // Auto-proceed to negotiation
    setTimeout(() => {
      onScanComplete(mockData);
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Mode Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center mb-8"
      >
        <div className="organic-card p-2 bg-clay-white/50 backdrop-blur-sm">
          <div className="flex rounded-gentle overflow-hidden">
            <motion.button
              onClick={() => setMode('scanner')}
              className={`px-6 py-3 font-semibold transition-all duration-300 ${
                mode === 'scanner'
                  ? 'bg-leaf-green text-white shadow-leaf'
                  : 'text-earth-soil hover:bg-clay-cream'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <Camera size={20} />
                Drishti Scanner
              </div>
            </motion.button>
            <motion.button
              onClick={() => setMode('catalog')}
              className={`px-6 py-3 font-semibold transition-all duration-300 ${
                mode === 'catalog'
                  ? 'bg-leaf-green text-white shadow-leaf'
                  : 'text-earth-soil hover:bg-clay-cream'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <Grid3X3 size={20} />
                Suchi Catalog
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* AI Chat Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <GuideTooltip content="Chat with AI for market insights and farming advice">
          <motion.button
            onClick={() => setIsChatOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              boxShadow: [
                '0 0 0 0px rgba(76, 175, 80, 0.4)',
                '0 0 0 10px rgba(76, 175, 80, 0)',
                '0 0 0 0px rgba(76, 175, 80, 0)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 bg-gradient-to-r from-leaf-green to-leaf-fresh text-white rounded-full shadow-leaf hover:shadow-earth flex items-center justify-center"
          >
            <MessageCircle size={24} />
          </motion.button>
        </GuideTooltip>
      </motion.div>

      <AnimatePresence mode="wait">
        {mode === 'scanner' && (
          <motion.div
            key="scanner"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="organic-card p-8 relative overflow-hidden"
          >
            {/* Scanning Animation Overlay */}
            <AnimatePresence>
              {isScanning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-b from-leaf-green/10 to-transparent rounded-organic z-10"
                >
                  <motion.div
                    className="absolute inset-0 border-4 border-leaf-green rounded-organic"
                    animate={{ 
                      boxShadow: [
                        '0 0 0 0px rgba(76, 175, 80, 0.4)',
                        '0 0 0 20px rgba(76, 175, 80, 0)',
                        '0 0 0 0px rgba(76, 175, 80, 0)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Selected Image Preview */}
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 rounded-gentle overflow-hidden relative"
              >
                <img 
                  src={selectedImage} 
                  alt="Selected crop" 
                  className="w-full h-48 object-cover"
                />
                {isScanning && (
                  <div className="absolute inset-0 bg-leaf-green/20 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="text-leaf-green"
                    >
                      <Camera size={48} />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Main Camera Button */}
            <GuideTooltip content={t?.helpText?.scanButton || "Taking a photo helps AI grade your quality better"}>
              <motion.button
                onClick={handleCameraClick}
                disabled={isScanning}
                className={`
                  w-full py-8 px-6 rounded-gentle font-bold text-2xl transition-all duration-300 relative z-20
                  ${isScanning 
                    ? 'bg-leaf-green/20 text-leaf-green cursor-not-allowed' 
                    : scanComplete
                    ? 'bg-gradient-to-r from-sun-yellow to-sun-yellow-light text-earth-soil shadow-clay'
                    : 'bg-gradient-to-r from-leaf-green to-leaf-fresh hover:from-leaf-fresh hover:to-leaf-green text-white shadow-leaf hover:shadow-earth'
                  }
                `}
                whileTap={!isScanning ? { scale: 0.98 } : {}}
                whileHover={!isScanning ? { scale: 1.02 } : {}}
                animate={!selectedImage && !isScanning ? {
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 4px 20px rgba(76, 175, 80, 0.2)',
                    '0 8px 40px rgba(76, 175, 80, 0.4)',
                    '0 4px 20px rgba(76, 175, 80, 0.2)'
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center justify-center gap-4">
                  {isScanning ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Camera size={32} />
                      </motion.div>
                      <div className="flex flex-col items-center">
                        <div>{t.aiAnalyzing}</div>
                        <div className="text-sm opacity-75 mt-1">
                          AI Vision Processing...
                        </div>
                      </div>
                    </>
                  ) : scanComplete ? (
                    <>
                      <CheckCircle size={32} />
                      <div className="flex flex-col items-center">
                        <div>AI {t.detected} ✓</div>
                        {cropData?.confidence && (
                          <div className="text-sm opacity-75 mt-1">
                            Confidence: {cropData.confidence}%
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <Camera size={32} />
                      {t.scanCrop}
                    </>
                  )}
                </div>
              </motion.button>
            </GuideTooltip>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Manual Selection Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-6"
            >
              <button
                onClick={() => setMode('catalog')}
                className="text-earth-soil/70 hover:text-earth-soil transition-colors duration-300 underline"
              >
                {t.orSelectManually}
              </button>
            </motion.div>
          </motion.div>
        )}

        {mode === 'catalog' && (
          <motion.div
            key="catalog"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="organic-card p-8"
          >
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-semibold text-earth-soil mb-6 text-center"
            >
              {t.cropCatalog}
            </motion.h3>

            <GuideTooltip content={t?.helpText?.catalogButton || "Browse and select your crop type manually"}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                {cropCatalog.map((crop, index) => (
                  <motion.button
                    key={crop.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleCropSelect(crop)}
                    className="organic-card p-4 bg-gradient-to-br from-clay-white to-clay-cream hover:from-leaf-green/10 hover:to-leaf-fresh/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-center">
                      <motion.div
                        className="text-4xl mb-2"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: index * 0.1 }}
                      >
                        {crop.emoji}
                      </motion.div>
                      <div className="font-semibold text-earth-soil text-sm mb-1">
                        {crop.name}
                      </div>
                      <div className="text-xs text-leaf-green font-medium">
                        {crop.price}
                      </div>
                      <div className="text-xs text-earth-soil/60">
                        {crop.quality}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </GuideTooltip>

            {/* Back to Scanner Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-6"
            >
              <button
                onClick={() => setMode('scanner')}
                className="text-earth-soil/70 hover:text-earth-soil transition-colors duration-300 underline"
              >
                ← Back to Scanner
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scan Results */}
      <AnimatePresence>
        {scanComplete && cropData && (
          <GuideTooltip content={t?.helpText?.priceCard || "Shows current market price and quality grade for your crop"}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <div className="organic-card p-6 bg-gradient-to-r from-clay-white to-clay-cream">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{cropData.emoji}</span>
                    <div>
                      <div className="font-bold text-earth-soil text-lg">
                        {cropData.crop}
                      </div>
                      <div className="text-sm text-leaf-green font-medium">
                        {t.quality}: {cropData.quality}
                      </div>
                      {cropData.source === 'scanner' && (
                        <div className="text-xs text-earth-soil/60">
                          AI Confidence: {cropData.confidence}%
                        </div>
                      )}
                    </div>
                  </div>
                  <motion.div
                    className={`flex items-center gap-1 ${
                      cropData.trend === 'up' ? 'text-leaf-green' : 'text-sun-yellow-warm'
                    }`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendingUp size={20} />
                    <Leaf size={20} />
                  </motion.div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-earth-soil">
                    {cropData.price}
                  </div>
                  <div className="text-sm text-earth-soil/60">
                    {t.suggestedPrice}
                  </div>
                </div>
              </div>
            </motion.div>
          </GuideTooltip>
        )}
      </AnimatePresence>

      {/* AI Chat Component */}
      <AIChat 
        t={t} 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default CropCard;