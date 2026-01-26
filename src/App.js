import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Switch from '@radix-ui/react-switch';
import { HelpCircle, Sprout, Leaf, Settings, User } from 'lucide-react';
import { translations } from './translations';
import { GuideProvider, useGuide } from './components/GuideProvider';
import RoleSelection from './components/RoleSelection';
import LanguageDrawer from './components/LanguageDrawer';
import ProfileCreation from './components/ProfileCreation';
import BuyerProfileCreation from './components/BuyerProfileCreation';
import BuyerDashboard from './components/BuyerDashboard';
import EarningsDashboard from './components/EarningsDashboard';
import CropCard from './components/CropCard';
import QuantitySelector from './components/QuantitySelector';
import BuyerSelection from './components/BuyerSelection';
import NegotiationVisual from './components/NegotiationVisual';
import ContractCard from './components/ContractCard';
import profileService from './services/profileService';

const AppContent = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [cropData, setCropData] = useState(null);
  const [quantityData, setQuantityData] = useState(null);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [dealData, setDealData] = useState(null);
  const [currentStep, setCurrentStep] = useState('loading');
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const { isGuideMode, toggleGuideMode } = useGuide();

  // Initialize app state on mount
  useEffect(() => {
    const initializeApp = async () => {
      // Check if user has completed onboarding
      const hasCompletedOnboarding = profileService.hasCompletedOnboarding();
      const savedLanguage = profileService.getSelectedLanguage();
      const savedProfile = profileService.getProfile();
      const savedRole = profileService.getUserRole();

      if (!hasCompletedOnboarding) {
        // First time user - start with role selection
        setCurrentStep('role');
      } else if (!savedRole) {
        // User has started but not selected role
        setCurrentStep('role');
        if (savedLanguage) setSelectedLanguage(savedLanguage);
      } else if (!savedLanguage) {
        // User has role but not language
        setUserRole(savedRole);
        setCurrentStep('language');
      } else if (!savedProfile || !profileService.isProfileComplete()) {
        // User has role and language but not complete profile
        setUserRole(savedRole);
        setSelectedLanguage(savedLanguage);
        setCurrentStep('profile');
      } else {
        // Returning user - load their data
        setUserRole(savedRole);
        setSelectedLanguage(savedLanguage);
        setUserProfile(savedProfile);
        setCurrentStep('dashboard');
      }
    };

    initializeApp();
  }, []);

  // Use English for intro/language selection, then switch to selected language
  const t = selectedLanguage ? translations[selectedLanguage] : translations.en;

  const handleRoleSelect = (role) => {
    console.log('App: Role selected:', role);
    setUserRole(role);
    profileService.saveUserRole(role);
    
    setTimeout(() => {
      setCurrentStep('language');
    }, 800);
  };

  const handleLanguageSelect = (langCode) => {
    console.log('App: Language selected:', langCode);
    setSelectedLanguage(langCode);
    profileService.saveSelectedLanguage(langCode);
    
    setTimeout(() => {
      setCurrentStep('profile');
    }, 800);
  };

  const handleProfileComplete = (profileData) => {
    setUserProfile(profileData);
    profileService.saveProfile(profileData);
    profileService.setOnboardingComplete();
    setIsProfileEditing(false);
    
    setTimeout(() => {
      setCurrentStep('dashboard');
    }, 500);
  };

  const handleScanComplete = (scanResults) => {
    setCropData(scanResults);
    setTimeout(() => {
      setCurrentStep('quantity');
    }, 500);
  };

  const handleQuantitySelect = (quantity) => {
    setQuantityData(quantity);
    setTimeout(() => {
      setCurrentStep('buyers');
    }, 500);
  };

  const handleBuyerSelect = (buyer) => {
    setSelectedBuyer(buyer);
    setTimeout(() => {
      setCurrentStep('negotiate');
    }, 500);
  };

  const handleDealComplete = (deal) => {
    setDealData(deal);
    setTimeout(() => {
      setCurrentStep('contract');
    }, 500);
  };

  const resetApp = () => {
    setCropData(null);
    setQuantityData(null);
    setSelectedBuyer(null);
    setDealData(null);
    setCurrentStep('dashboard');
  };

  const openProfileEditor = () => {
    setIsProfileEditing(true);
    setCurrentStep('profile');
  };

  // Show loading state
  if (currentStep === 'loading') {
    return (
      <div className="min-h-screen earth-texture flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            🌾
          </motion.div>
          <h2 className="text-2xl font-bold text-earth-soil font-rounded">
            Loading Mandi.AI...
          </h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen earth-texture relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {i % 2 === 0 ? (
              <Leaf className="text-leaf-green" size={24 + i * 2} />
            ) : (
              <Sprout className="text-leaf-fresh" size={20 + i * 2} />
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sprout className="text-leaf-green" size={40} />
              </motion.div>
              <div className="text-left">
                <h1 className="text-4xl font-bold text-earth-soil font-rounded">
                  {t.appName}
                </h1>
                {userProfile && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-earth-soil/70 font-rounded"
                  >
                    {profileService.getPersonalizedGreeting()}
                  </motion.p>
                )}
              </div>
            </motion.div>

            <div className="flex items-center gap-4">
              {/* Profile Button */}
              {userProfile && currentStep !== 'profile' && (
                <motion.button
                  onClick={openProfileEditor}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-gentle bg-earth-soil/10 hover:bg-earth-soil/20 text-earth-soil transition-colors duration-300"
                >
                  <User size={20} />
                </motion.button>
              )}

              {/* Guide Mode Toggle */}
              <div className="flex items-center gap-3">
                <HelpCircle className="text-earth-soil/60" size={20} />
                <Switch.Root
                  checked={isGuideMode}
                  onCheckedChange={toggleGuideMode}
                  className="w-11 h-6 bg-earth-soil/20 rounded-full relative data-[state=checked]:bg-leaf-green transition-colors duration-200"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px] shadow-sm" />
                </Switch.Root>
                <span className="text-sm text-earth-soil/70 font-rounded">
                  {t.guideMode}
                </span>
              </div>
            </div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-earth-soil/80 font-rounded"
          >
            {t.tagline}
          </motion.p>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 'role' && (
              <RoleSelection
                key="role"
                t={t}
                onRoleSelect={handleRoleSelect}
              />
            )}

            {currentStep === 'language' && (
              <motion.div
                key="language"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h2 className="text-3xl font-semibold text-earth-soil mb-4 font-rounded">
                    Choose Your Language
                  </h2>
                  <p className="text-earth-soil/70 font-rounded">
                    Select your preferred language to continue
                  </p>
                </motion.div>
                
                <div className="flex justify-center">
                  <LanguageDrawer
                    onLanguageSelect={handleLanguageSelect}
                    selectedLanguage={selectedLanguage}
                    isIntroPage={true}
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 'profile' && (
              <>
                {userRole === 'buyer' ? (
                  <BuyerProfileCreation
                    key="buyer-profile"
                    t={t}
                    onProfileComplete={handleProfileComplete}
                    existingProfile={userProfile}
                    isEditing={isProfileEditing}
                  />
                ) : (
                  <ProfileCreation
                    key="seller-profile"
                    t={t}
                    onProfileComplete={handleProfileComplete}
                    existingProfile={userProfile}
                    isEditing={isProfileEditing}
                  />
                )}
              </>
            )}

            {currentStep === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
              >
                {userRole === 'buyer' ? (
                  <BuyerDashboard
                    t={t}
                    userProfile={userProfile}
                    onCropSelect={(crop) => {
                      // Handle buyer crop selection - could open negotiation directly
                      console.log('Buyer selected crop:', crop);
                    }}
                  />
                ) : (
                  <>
                    <EarningsDashboard t={t} />
                    
                    <motion.h2
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl font-semibold mb-8 text-earth-soil font-rounded text-center"
                    >
                      {t.sellCrop}
                    </motion.h2>
                    <CropCard t={t} onScanComplete={handleScanComplete} />
                  </>
                )}
                
                {/* Language Change Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-6"
                >
                  <LanguageDrawer
                    onLanguageSelect={handleLanguageSelect}
                    selectedLanguage={selectedLanguage}
                    isIntroPage={false}
                  />
                </motion.div>
              </motion.div>
            )}

            {currentStep === 'quantity' && userRole === 'seller' && (
              <motion.div
                key="quantity"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
              >
                <QuantitySelector
                  t={t}
                  selectedCrop={cropData}
                  onQuantitySelect={handleQuantitySelect}
                />
                
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setCurrentStep('dashboard')}
                  className="mt-6 px-4 py-2 text-earth-soil/70 hover:text-earth-soil transition-colors duration-300 font-rounded"
                >
                  ← Back to Dashboard
                </motion.button>
              </motion.div>
            )}

            {currentStep === 'buyers' && userRole === 'seller' && (
              <motion.div
                key="buyers"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
              >
                <BuyerSelection
                  t={t}
                  cropData={cropData}
                  quantityData={quantityData}
                  onBuyerSelect={handleBuyerSelect}
                />
                
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setCurrentStep('quantity')}
                  className="mt-6 px-4 py-2 text-earth-soil/70 hover:text-earth-soil transition-colors duration-300 font-rounded"
                >
                  ← Change Quantity
                </motion.button>
              </motion.div>
            )}

            {currentStep === 'negotiate' && userRole === 'seller' && (
              <motion.div
                key="negotiate"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
              >
                <NegotiationVisual
                  t={t}
                  language={selectedLanguage}
                  cropData={cropData}
                  quantityData={quantityData}
                  selectedBuyer={selectedBuyer}
                  onDealComplete={handleDealComplete}
                />
              </motion.div>
            )}

            {currentStep === 'contract' && userRole === 'seller' && (
              <motion.div
                key="contract"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ContractCard
                  t={t}
                  dealData={dealData}
                  cropData={cropData}
                  quantityData={quantityData}
                  selectedBuyer={selectedBuyer}
                />
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="text-center mt-8"
                >
                  <motion.button
                    onClick={resetApp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="organic-card px-8 py-3 bg-gradient-to-r from-leaf-green to-leaf-fresh text-earth-soil font-semibold rounded-gentle shadow-leaf hover:shadow-earth transition-all duration-300"
                  >
                    Start New Deal
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 text-earth-soil/60 text-sm font-rounded"
        >
          <p>Grown from the Earth • Powered by AI • Made for Farmers</p>
        </motion.footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <GuideProvider>
      <AppContent />
    </GuideProvider>
  );
}

export default App;