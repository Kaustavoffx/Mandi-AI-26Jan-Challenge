import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Sprout, Check } from 'lucide-react';

const ProfileCreation = ({ t, onProfileComplete, existingProfile = null, isEditing = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState({
    name: existingProfile?.name || '',
    email: existingProfile?.email || '',
    phone: existingProfile?.phone || '',
    address: existingProfile?.address || '',
    primaryCrops: existingProfile?.primaryCrops || [],
    farmSize: existingProfile?.farmSize || '',
    experience: existingProfile?.experience || ''
  });
  const [errors, setErrors] = useState({});

  const cropOptions = [
    { id: 'rice', name: t.rice || 'Rice', emoji: '🌾' },
    { id: 'wheat', name: t.wheat || 'Wheat', emoji: '🌾' },
    { id: 'onions', name: t.onions || 'Onions', emoji: '🧅' },
    { id: 'tomatoes', name: t.tomatoes || 'Tomatoes', emoji: '🍅' },
    { id: 'cotton', name: t.cotton || 'Cotton', emoji: '🌱' },
    { id: 'corn', name: t.corn || 'Corn', emoji: '🌽' },
    { id: 'potato', name: t.potato || 'Potato', emoji: '🥔' },
    { id: 'brinjal', name: t.brinjal || 'Brinjal', emoji: '🍆' },
    { id: 'cabbage', name: t.cabbage || 'Cabbage', emoji: '🥬' },
    { id: 'carrot', name: t.carrot || 'Carrot', emoji: '🥕' },
    { id: 'cauliflower', name: t.cauliflower || 'Cauliflower', emoji: '🥦' },
    { id: 'spinach', name: t.spinach || 'Spinach', emoji: '🥬' },
    { id: 'okra', name: t.okra || 'Okra', emoji: '🌶️' },
    { id: 'peas', name: t.peas || 'Peas', emoji: '🟢' },
    { id: 'beans', name: t.beans || 'Beans', emoji: '🫘' },
    { id: 'cucumber', name: t.cucumber || 'Cucumber', emoji: '🥒' }
  ];

  const farmSizeOptions = [
    { value: 'small', label: 'Small (< 2 acres)', emoji: '🏡' },
    { value: 'medium', label: 'Medium (2-10 acres)', emoji: '🏞️' },
    { value: 'large', label: 'Large (> 10 acres)', emoji: '🌾' }
  ];

  const experienceOptions = [
    { value: 'beginner', label: 'New Farmer (< 2 years)', emoji: '🌱' },
    { value: 'intermediate', label: 'Experienced (2-10 years)', emoji: '🌿' },
    { value: 'expert', label: 'Expert (> 10 years)', emoji: '🌳' }
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!profile.name.trim()) newErrors.name = 'Name is required';
      if (!profile.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }
    
    if (step === 2) {
      if (profile.primaryCrops.length === 0) {
        newErrors.primaryCrops = 'Please select at least one crop';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleComplete();
      }
    }
  };

  const handleComplete = () => {
    const profileData = {
      ...profile,
      createdAt: existingProfile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('mandiAI_userProfile', JSON.stringify(profileData));
    
    onProfileComplete(profileData);
  };

  const handleCropToggle = (cropId) => {
    setProfile(prev => ({
      ...prev,
      primaryCrops: prev.primaryCrops.includes(cropId)
        ? prev.primaryCrops.filter(id => id !== cropId)
        : [...prev.primaryCrops, cropId]
    }));
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return isEditing ? 'Edit Personal Information' : 'Welcome to Mandi.AI!';
      case 2: return 'Your Farming Profile';
      case 3: return 'Farm Details';
      default: return 'Profile Setup';
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1: return isEditing ? 'Update your personal details' : 'Let\'s create your farmer profile';
      case 2: return 'Tell us about the crops you grow';
      case 3: return 'Share your farming experience';
      default: return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen earth-texture flex items-center justify-center p-4"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Sprout className="text-leaf-green" size={20 + i * 3} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <motion.div
                key={step}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                  step <= currentStep
                    ? 'bg-leaf-green text-white shadow-leaf'
                    : 'bg-clay-white text-earth-soil/50'
                }`}
                animate={{ scale: step === currentStep ? 1.1 : 1 }}
              >
                {step < currentStep ? <Check size={20} /> : step}
              </motion.div>
            ))}
          </div>
          <div className="w-full bg-clay-white rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-leaf-green to-leaf-fresh h-2 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="organic-card p-8 backdrop-blur-sm"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              {currentStep === 1 ? '👋' : currentStep === 2 ? '🌾' : '🚜'}
            </motion.div>
            <h2 className="text-3xl font-bold text-earth-soil mb-2 font-rounded">
              {getStepTitle()}
            </h2>
            <p className="text-earth-soil/70 font-rounded">
              {getStepSubtitle()}
            </p>
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Name Field */}
                <div>
                  <label className="flex items-center gap-2 text-earth-soil font-semibold mb-2">
                    <User size={18} />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full p-4 rounded-gentle border-2 transition-all duration-300 ${
                      errors.name 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-earth-soil/20 focus:border-leaf-green'
                    } focus:outline-none bg-white`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="flex items-center gap-2 text-earth-soil font-semibold mb-2">
                    <Mail size={18} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full p-4 rounded-gentle border-2 transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-earth-soil/20 focus:border-leaf-green'
                    } focus:outline-none bg-white`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="flex items-center gap-2 text-earth-soil font-semibold mb-2">
                    <Phone size={18} />
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-4 rounded-gentle border-2 border-earth-soil/20 focus:border-leaf-green focus:outline-none bg-white transition-all duration-300"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Address Field */}
                <div>
                  <label className="flex items-center gap-2 text-earth-soil font-semibold mb-2">
                    <MapPin size={18} />
                    Address (Optional)
                  </label>
                  <textarea
                    value={profile.address}
                    onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full p-4 rounded-gentle border-2 border-earth-soil/20 focus:border-leaf-green focus:outline-none bg-white transition-all duration-300 resize-none"
                    rows="3"
                    placeholder="Village, District, State"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="flex items-center gap-2 text-earth-soil font-semibold mb-4">
                    <Sprout size={18} />
                    Primary Crops You Grow *
                  </label>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto">
                    {cropOptions.map((crop) => (
                      <motion.button
                        key={crop.id}
                        type="button"
                        onClick={() => handleCropToggle(crop.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-gentle border-2 transition-all duration-300 ${
                          profile.primaryCrops.includes(crop.id)
                            ? 'border-leaf-green bg-leaf-green/10 text-leaf-green'
                            : 'border-earth-soil/20 hover:border-earth-soil/40 bg-white'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{crop.emoji}</div>
                          <div className="text-sm font-medium">{crop.name}</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {errors.primaryCrops && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2"
                    >
                      {errors.primaryCrops}
                    </motion.p>
                  )}

                  <div className="mt-4 text-sm text-earth-soil/60">
                    Selected: {profile.primaryCrops.length} crop(s)
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Farm Size */}
                <div>
                  <label className="text-earth-soil font-semibold mb-4 block">
                    Farm Size
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {farmSizeOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => setProfile(prev => ({ ...prev, farmSize: option.value }))}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-gentle border-2 transition-all duration-300 ${
                          profile.farmSize === option.value
                            ? 'border-leaf-green bg-leaf-green/10 text-leaf-green'
                            : 'border-earth-soil/20 hover:border-earth-soil/40 bg-white'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{option.emoji}</div>
                          <div className="text-sm font-medium">{option.label}</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="text-earth-soil font-semibold mb-4 block">
                    Farming Experience
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {experienceOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => setProfile(prev => ({ ...prev, experience: option.value }))}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-gentle border-2 transition-all duration-300 ${
                          profile.experience === option.value
                            ? 'border-leaf-green bg-leaf-green/10 text-leaf-green'
                            : 'border-earth-soil/20 hover:border-earth-soil/40 bg-white'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{option.emoji}</div>
                          <div className="text-sm font-medium">{option.label}</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-between mt-8"
          >
            {currentStep > 1 && (
              <motion.button
                onClick={() => setCurrentStep(currentStep - 1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-earth-soil/10 text-earth-soil rounded-gentle font-semibold hover:bg-earth-soil/20 transition-all duration-300"
              >
                Previous
              </motion.button>
            )}
            
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-leaf-green to-leaf-fresh text-white rounded-gentle font-semibold shadow-leaf hover:shadow-earth transition-all duration-300 ml-auto"
            >
              {currentStep === 3 ? (isEditing ? 'Update Profile' : 'Complete Setup') : 'Next'}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCreation;