// Profile Service for managing user data in localStorage
class ProfileService {
  constructor() {
    this.PROFILE_KEY = 'mandiAI_userProfile';
    this.LANGUAGE_KEY = 'mandiAI_selectedLanguage';
    this.ONBOARDING_KEY = 'mandiAI_onboardingComplete';
    this.USER_ROLE_KEY = 'mandiAI_userRole';
  }

  // Get user role (seller/buyer)
  getUserRole() {
    return localStorage.getItem(this.USER_ROLE_KEY) || null;
  }

  // Save user role
  saveUserRole(role) {
    try {
      localStorage.setItem(this.USER_ROLE_KEY, role);
      return true;
    } catch (error) {
      console.error('Error saving user role to localStorage:', error);
      return false;
    }
  }

  // Check if user has completed onboarding
  hasCompletedOnboarding() {
    return localStorage.getItem(this.ONBOARDING_KEY) === 'true';
  }

  // Mark onboarding as complete
  setOnboardingComplete() {
    localStorage.setItem(this.ONBOARDING_KEY, 'true');
  }

  // Get user profile
  getProfile() {
    try {
      const profileData = localStorage.getItem(this.PROFILE_KEY);
      return profileData ? JSON.parse(profileData) : null;
    } catch (error) {
      console.error('Error reading profile from localStorage:', error);
      return null;
    }
  }

  // Save user profile
  saveProfile(profileData) {
    try {
      const dataToSave = {
        ...profileData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(this.PROFILE_KEY, JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      console.error('Error saving profile to localStorage:', error);
      return false;
    }
  }

  // Get selected language
  getSelectedLanguage() {
    return localStorage.getItem(this.LANGUAGE_KEY) || null;
  }

  // Save selected language
  saveSelectedLanguage(languageCode) {
    try {
      localStorage.setItem(this.LANGUAGE_KEY, languageCode);
      return true;
    } catch (error) {
      console.error('Error saving language to localStorage:', error);
      return false;
    }
  }

  // Clear all user data (for testing or reset)
  clearAllData() {
    try {
      localStorage.removeItem(this.PROFILE_KEY);
      localStorage.removeItem(this.LANGUAGE_KEY);
      localStorage.removeItem(this.ONBOARDING_KEY);
      localStorage.removeItem(this.USER_ROLE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing user data:', error);
      return false;
    }
  }

  // Get user's crops with details (works for both sellers and buyers)
  getUserCropsWithDetails() {
    const profile = this.getProfile();
    if (!profile) return [];

    // Handle both seller (primaryCrops) and buyer (interestedCrops) profiles
    const cropIds = profile.primaryCrops || profile.interestedCrops || [];
    if (!cropIds.length) return [];

    const cropDetails = {
      rice: { name: 'Rice', emoji: '🌾', category: 'grain' },
      wheat: { name: 'Wheat', emoji: '🌾', category: 'grain' },
      onions: { name: 'Onions', emoji: '🧅', category: 'vegetable' },
      tomatoes: { name: 'Tomatoes', emoji: '🍅', category: 'vegetable' },
      cotton: { name: 'Cotton', emoji: '🌱', category: 'cash_crop' },
      corn: { name: 'Corn', emoji: '🌽', category: 'grain' },
      potato: { name: 'Potato', emoji: '🥔', category: 'vegetable' },
      brinjal: { name: 'Brinjal', emoji: '🍆', category: 'vegetable' },
      cabbage: { name: 'Cabbage', emoji: '🥬', category: 'vegetable' },
      carrot: { name: 'Carrot', emoji: '🥕', category: 'vegetable' },
      cauliflower: { name: 'Cauliflower', emoji: '🥦', category: 'vegetable' },
      spinach: { name: 'Spinach', emoji: '🥬', category: 'leafy' },
      okra: { name: 'Okra', emoji: '🌶️', category: 'vegetable' },
      peas: { name: 'Peas', emoji: '🟢', category: 'legume' },
      beans: { name: 'Beans', emoji: '🫘', category: 'legume' },
      cucumber: { name: 'Cucumber', emoji: '🥒', category: 'vegetable' }
    };

    return cropIds.map(cropId => ({
      id: cropId,
      ...cropDetails[cropId]
    })).filter(crop => crop.name); // Filter out any undefined crops
  }

  // Get user summary for display
  getUserSummary() {
    const profile = this.getProfile();
    if (!profile) return null;

    const crops = this.getUserCropsWithDetails();
    
    return {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      farmSize: profile.farmSize,
      experience: profile.experience,
      cropsCount: crops.length,
      primaryCrops: crops.slice(0, 3), // Show first 3 crops
      joinedDate: profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Unknown'
    };
  }

  // Update specific profile fields
  updateProfileField(field, value) {
    const profile = this.getProfile();
    if (!profile) return false;

    const updatedProfile = {
      ...profile,
      [field]: value,
      updatedAt: new Date().toISOString()
    };

    return this.saveProfile(updatedProfile);
  }

  // Check if profile is complete (works for both seller and buyer)
  isProfileComplete() {
    const profile = this.getProfile();
    if (!profile) return false;

    const basicFieldsComplete = !!(profile.name && profile.email);
    
    if (profile.userType === 'buyer') {
      return basicFieldsComplete && 
             !!(profile.businessName && 
                profile.businessType && 
                profile.interestedCrops && 
                profile.interestedCrops.length > 0);
    } else {
      // Seller profile
      return basicFieldsComplete && 
             !!(profile.primaryCrops && 
                profile.primaryCrops.length > 0);
    }
  }

  // Get personalized greeting
  getPersonalizedGreeting() {
    const profile = this.getProfile();
    if (!profile || !profile.name) return 'Welcome to Mandi.AI!';

    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 17) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';

    return `${greeting}, ${profile.name.split(' ')[0]}!`;
  }

  // Export user data (for backup)
  exportUserData() {
    return {
      profile: this.getProfile(),
      language: this.getSelectedLanguage(),
      onboardingComplete: this.hasCompletedOnboarding(),
      exportDate: new Date().toISOString()
    };
  }

  // Import user data (for restore)
  importUserData(userData) {
    try {
      if (userData.profile) {
        this.saveProfile(userData.profile);
      }
      if (userData.language) {
        this.saveSelectedLanguage(userData.language);
      }
      if (userData.onboardingComplete) {
        this.setOnboardingComplete();
      }
      return true;
    } catch (error) {
      console.error('Error importing user data:', error);
      return false;
    }
  }
}

const profileService = new ProfileService();
export default profileService;