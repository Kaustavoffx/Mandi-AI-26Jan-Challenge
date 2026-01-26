import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Building, ShoppingCart, TrendingUp, Check, Package } from 'lucide-react';
import GuideTooltip from './GuideTooltip';

const BuyerProfileCreation = ({ t, onProfileComplete, existingProfile = null, isEditing = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState({
    name: existingProfile?.name || '',
    email: existingProfile?.email || '',
    phone: existingProfile?.phone || '',
    address: existingProfile?.address || '',
    businessName: existingProfile?.businessName || '',
    businessType: existingProfile?.businessType || '',
    interestedCrops: existingProfile?.interestedCrops || [],
    purchaseVolume: existingProfile?.purchaseVolume || '',
    businessExperience: existingProfile?.businessExperience || '',
    paymentTerms: existingProfile?.paymentTerms || [],
    certifications: existingProfile?.certifications || []
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

  const businessTypes = [
    { value: 'retailer', label: 'Retailer', emoji: '🏪' },
    { value: 'wholesaler', label: 'Wholesaler', emoji: '🏬' },
    { value: 'exporter', label: 'Exporter', emoji: '🚢' },
    { value: 'processor', label: 'Food Processor', emoji: '🏭' },
    { value: 'restaurant', label: 'Restaurant Chain', emoji: '🍽️' },
    { value: 'cooperative', label: 'Cooperative', emoji: '🤝' }
  ];

  const volumeOptions = [
    { value: 'small', label: 'Small (< 10 tons/month)', emoji: '📦' },
    { value: 'medium', label: 'Medium (10-100 tons/month)', emoji: '🚛' },
    { value: 'large', label: 'Large (> 100 tons/month)', emoji: '🏭' }
  ];

  const experienceOptions = [
    { value: 'new', label: 'New to Business (< 2 years)', emoji: '🌱' },
    { value: 'experienced', label: 'Experienced (2-10 years)', emoji: '🌿' },
    { value: 'expert', label: 'Industry Expert (> 10 years)', emoji: '🌳' }
  ];

  const paymentOptions = [
    { value: 'advance', label: 'Advance Payment', emoji: '💰' },
    { value: 'cod', label: 'Cash on Delivery', emoji: '🚚' },
    { value: 'net15', label: 'Net 15 Days', emoji: '📅' },
    { value: 'net30', label: 'Net 30 Days', emoji: '🗓️' },
    { value: 'immediate', label: 'Immediate Payment', emoji: '⚡' }
  ];

  const certificationOptions = [
    { value: 'organic', label: 'Organic Certified', emoji: '🌿' },
    { value: 'fair_trade', label: 'Fair Trade', emoji: '🤝' },
    { value: 'iso', label: 'ISO Certified', emoji: '📋' },
    { value: 'fssai', label: 'FSSAI Licensed', emoji: '🏛️' },
    { value: 'export', label: 'Export License', emoji: '🌍' }
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
      if (!profile.businessName.trim()) newErrors.businessName = 'Business name is required';
    }
    
    if (step === 2) {
      if (profile.interestedCrops.length === 0) {
        newErrors.interestedCrops = 'Please select at least one crop of interest';
      }
      if (!profile.businessType) {
        newErrors.businessType = 'Please select your business type';
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
      userType: 'buyer',
      createdAt: existingProfile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onProfileComplete(profileData);
  };

  const handleCropToggle = (cropId) => {
    setProfile(prev => ({
      ...prev,
      interestedCrops: prev.interestedCrops.includes(cropId)
        ? prev.interestedCrops.filter(id => id !== cropId)
        : [...prev.interestedCrops, cropId]
    }));
  };

  const handlePaymentToggle = (paymentId) => {
    setProfile(prev => ({
      ...prev,
      paymentTerms: prev.paymentTerms.includes(paymentId)
        ? prev.paymentTerms.filter(id => id !== paymentId)
        : [...prev.paymentTerms, paymentId]
    }));
  };

  const handleCertificationToggle = (certId) => {
    setProfile(prev => ({
      ...prev,
      certifications: prev.certifications.includes(certId)
        ? prev.certifications.filter(id => id !== certId)
        : [...prev.certifications, certId]
    }));
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return isEditing ? 'Edit Business Information' : 'Welcome, Buyer!';
      case 2: return 'Your Business Profile';
      case 3: return 'Business Preferences';
      default: return 'Profile Setup';
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1: return isEditing ? 'Update your business details' : 'Let\'s set up your buyer profile';
      case 2: return 'Tell us about your crop interests and business';
      case 3: return 'Set your purchase preferences';
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
            <ShoppingCart className="text-sun-yellow" size={20 + i * 3} />
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
                    ? 'bg-sun-yellow text-earth-soil shadow-clay'
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
              className="bg-gradient-to-r from-sun-yellow to-sun-yellow-light h-2 rounded-full"
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
              {currentStep === 1 ? '🏪' : currentStep === 2 ? '📊' : '⚙️'}
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
                        : 'border-earth-soil/20 focus:border-sun-yellow'
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

                {/* Business Name Field */}
                <div>
                  <label className="flex items-center gap-2 text-earth-soil font-semibold mb-2">
                    <Building size={18} />
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={profile.businessName}
                    onChange={(e) => setProfile(prev => ({ ...prev, businessName: e.target.value }))}
                    className={`w-full p-4 rounded-gentle border-2 transition-all duration-300 ${
                      errors.businessName 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-earth-soil/20 focus:border-sun-yellow'
                    } focus:outline-none bg-white`}
                    placeholder="Your company/business name"
                  />
                  {errors.businessName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.businessName}
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
                        : 'border-earth-soil/20 focus:border-sun-yellow'
                    } focus:outline-none bg-white`}
                    placeholder="business@example.com"
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
                    className="w-full p-4 rounded-gentle border-2 border-earth-soil/20 focus:border-sun-yellow focus:outline-none bg-white transition-all duration-300"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Address Field */}
                <div>
                  <label className="flex items-center gap-2 text-earth-soil font-semibold mb-2">
                    <MapPin size={18} />
                    Business Address (Optional)
                  </label>
                  <textarea
                    value={profile.address}
                    onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full p-4 rounded-gentle border-2 border-earth-soil/20 focus:border-sun-yellow focus:outline-none bg-white transition-all duration-300 resize-none"
                    rows="3"
                    placeholder="Business address, City, State"
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
                {/* Business Type */}
                <div>
                  <label className="text-earth-soil font-semibold mb-4 block">
                    Business Type *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {businessTypes.map((type) => (
                      <motion.button
                        key={type.value}
                        type="button"
                        onClick={() => setProfile(prev => ({ ...prev, businessType: type.value }))}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-gentle border-2 transition-all duration-300 ${
                          profile.businessType === type.value
                            ? 'border-sun-yellow bg-sun-yellow/10 text-sun-yellow'
                            : 'border-earth-soil/20 hover:border-earth-soil/40 bg-white'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{type.emoji}</div>
                          <div className="text-sm font-medium">{type.label}</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  {errors.businessType && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2"
                    >
                      {errors.businessType}
                    </motion.p>
                  )}
                </div>

                {/* Interested Crops */}
                <div>
                  <label className="flex items-center gap-2 text-earth-soil font-semibold mb-4">
                    <Package size={18} />
                    Crops You're Interested In *
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
                          profile.interestedCrops.includes(crop.id)
                            ? 'border-sun-yellow bg-sun-yellow/10 text-sun-yellow'
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

                  {errors.interestedCrops && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2"
                    >
                      {errors.interestedCrops}
                    </motion.p>
                  )}

                  <div className="mt-4 text-sm text-earth-soil/60">
                    Selected: {profile.interestedCrops.length} crop(s)
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
                {/* Purchase Volume */}
                <div>
                  <label className="text-earth-soil font-semibold mb-4 block">
                    Monthly Purchase Volume
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {volumeOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => setProfile(prev => ({ ...prev, purchaseVolume: option.value }))}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-gentle border-2 transition-all duration-300 ${
                          profile.purchaseVolume === option.value
                            ? 'border-sun-yellow bg-sun-yellow/10 text-sun-yellow'
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

                {/* Business Experience */}
                <div>
                  <label className="text-earth-soil font-semibold mb-4 block">
                    Business Experience
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {experienceOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => setProfile(prev => ({ ...prev, businessExperience: option.value }))}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-gentle border-2 transition-all duration-300 ${
                          profile.businessExperience === option.value
                            ? 'border-sun-yellow bg-sun-yellow/10 text-sun-yellow'
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

                {/* Payment Terms */}
                <div>
                  <label className="text-earth-soil font-semibold mb-4 block">
                    Preferred Payment Terms (Select multiple)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {paymentOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => handlePaymentToggle(option.value)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-3 rounded-gentle border-2 transition-all duration-300 ${
                          profile.paymentTerms.includes(option.value)
                            ? 'border-sun-yellow bg-sun-yellow/10 text-sun-yellow'
                            : 'border-earth-soil/20 hover:border-earth-soil/40 bg-white'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-lg mb-1">{option.emoji}</div>
                          <div className="text-xs font-medium">{option.label}</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <label className="text-earth-soil font-semibold mb-4 block">
                    Business Certifications (Optional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {certificationOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => handleCertificationToggle(option.value)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-3 rounded-gentle border-2 transition-all duration-300 ${
                          profile.certifications.includes(option.value)
                            ? 'border-sun-yellow bg-sun-yellow/10 text-sun-yellow'
                            : 'border-earth-soil/20 hover:border-earth-soil/40 bg-white'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-lg mb-1">{option.emoji}</div>
                          <div className="text-xs font-medium">{option.label}</div>
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
              className="px-8 py-3 bg-gradient-to-r from-sun-yellow to-sun-yellow-light text-earth-soil rounded-gentle font-semibold shadow-clay hover:shadow-earth transition-all duration-300 ml-auto"
            >
              {currentStep === 3 ? (isEditing ? 'Update Profile' : 'Complete Setup') : 'Next'}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BuyerProfileCreation;