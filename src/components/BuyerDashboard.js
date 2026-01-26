import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, TrendingUp, Package, Users, Eye, Star, MapPin, Phone, MessageCircle } from 'lucide-react';
import GuideTooltip from './GuideTooltip';

const BuyerDashboard = ({ t, userProfile, onCropSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('price');

  // Mock available crops data
  const availableCrops = [
    {
      id: 1,
      crop: 'Premium Onions',
      farmer: 'Rajesh Kumar',
      location: 'Nashik, Maharashtra',
      quantity: '50 kg',
      quality: 'A+',
      price: '₹28/kg',
      totalPrice: '₹1,400',
      image: '🧅',
      rating: 4.8,
      phone: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      description: 'Fresh, organic onions harvested yesterday',
      certifications: ['Organic', 'Quality Tested'],
      deliveryTime: '1-2 days',
      paymentTerms: 'Advance 50%'
    },
    {
      id: 2,
      crop: 'Organic Tomatoes',
      farmer: 'Priya Sharma',
      location: 'Pune, Maharashtra',
      quantity: '100 kg',
      quality: 'A',
      price: '₹35/kg',
      totalPrice: '₹3,500',
      image: '🍅',
      rating: 4.9,
      phone: '+91 87654 32109',
      whatsapp: '+91 87654 32109',
      description: 'Vine-ripened organic tomatoes, perfect for retail',
      certifications: ['Organic Certified', 'Export Quality'],
      deliveryTime: '2-3 days',
      paymentTerms: 'Cash on delivery'
    },
    {
      id: 3,
      crop: 'Fresh Brinjal',
      farmer: 'Suresh Patel',
      location: 'Ahmedabad, Gujarat',
      quantity: '75 kg',
      quality: 'A+',
      price: '₹32/kg',
      totalPrice: '₹2,400',
      image: '🍆',
      rating: 4.7,
      phone: '+91 76543 21098',
      whatsapp: '+91 76543 21098',
      description: 'Premium quality brinjal, ideal for restaurants',
      certifications: ['Quality Tested'],
      deliveryTime: '1-2 days',
      paymentTerms: 'Net 15 days'
    },
    {
      id: 4,
      crop: 'Baby Carrots',
      farmer: 'Meera Singh',
      location: 'Jaipur, Rajasthan',
      quantity: '30 kg',
      quality: 'A+',
      price: '₹40/kg',
      totalPrice: '₹1,200',
      image: '🥕',
      rating: 4.6,
      phone: '+91 65432 10987',
      whatsapp: '+91 65432 10987',
      description: 'Sweet baby carrots, perfect for premium markets',
      certifications: ['Organic', 'Premium Grade'],
      deliveryTime: '2-3 days',
      paymentTerms: 'Immediate payment'
    },
    {
      id: 5,
      crop: 'Green Cabbage',
      farmer: 'Amit Verma',
      location: 'Delhi, NCR',
      quantity: '80 kg',
      quality: 'A',
      price: '₹22/kg',
      totalPrice: '₹1,760',
      image: '🥬',
      rating: 4.5,
      phone: '+91 54321 09876',
      whatsapp: '+91 54321 09876',
      description: 'Fresh green cabbage, harvested this morning',
      certifications: ['Quality Tested'],
      deliveryTime: '1 day',
      paymentTerms: 'Advance 30%'
    },
    {
      id: 6,
      crop: 'Organic Spinach',
      farmer: 'Lakshmi Reddy',
      location: 'Hyderabad, Telangana',
      quantity: '25 kg',
      quality: 'A+',
      price: '₹45/kg',
      totalPrice: '₹1,125',
      image: '🥬',
      rating: 4.8,
      phone: '+91 43210 98765',
      whatsapp: '+91 43210 98765',
      description: 'Pesticide-free organic spinach leaves',
      certifications: ['Organic Certified', 'Pesticide Free'],
      deliveryTime: '1-2 days',
      paymentTerms: 'Cash on delivery'
    }
  ];

  // Filter and sort crops
  const filteredCrops = availableCrops
    .filter(crop => {
      const matchesSearch = crop.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           crop.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           crop.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (selectedFilter === 'all') return matchesSearch;
      if (selectedFilter === 'organic') return matchesSearch && crop.certifications.some(cert => cert.includes('Organic'));
      if (selectedFilter === 'premium') return matchesSearch && crop.quality === 'A+';
      if (selectedFilter === 'nearby') return matchesSearch; // Could implement location-based filtering
      
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return parseInt(a.price.replace('₹', '').replace('/kg', '')) - parseInt(b.price.replace('₹', '').replace('/kg', ''));
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'quantity') return parseInt(b.quantity.replace(' kg', '')) - parseInt(a.quantity.replace(' kg', ''));
      return 0;
    });

  const filters = [
    { id: 'all', label: 'All Crops', emoji: '🌾' },
    { id: 'organic', label: 'Organic', emoji: '🌿' },
    { id: 'premium', label: 'Premium', emoji: '⭐' },
    { id: 'nearby', label: 'Nearby', emoji: '📍' }
  ];

  const sortOptions = [
    { id: 'price', label: 'Price: Low to High' },
    { id: 'rating', label: 'Rating: High to Low' },
    { id: 'quantity', label: 'Quantity: High to Low' }
  ];

  // Mock stats for buyer
  const buyerStats = {
    totalPurchases: '₹2,45,000',
    activeBids: 12,
    completedDeals: 156,
    savedFarmers: 23
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-earth-soil mb-2 font-rounded">
          Welcome back, {userProfile?.name?.split(' ')[0]}!
        </h2>
        <p className="text-earth-soil/70 font-rounded">
          {userProfile?.businessName} • {userProfile?.businessType || 'Buyer'}
        </p>
      </motion.div>

      {/* Stats Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { icon: TrendingUp, label: 'Total Purchases', value: buyerStats.totalPurchases, color: 'text-leaf-green' },
          { icon: Eye, label: 'Active Bids', value: buyerStats.activeBids, color: 'text-sun-yellow' },
          { icon: Package, label: 'Completed Deals', value: buyerStats.completedDeals, color: 'text-earth-soil' },
          { icon: Users, label: 'Saved Farmers', value: buyerStats.savedFarmers, color: 'text-leaf-fresh' }
        ].map((stat, index) => (
          <GuideTooltip key={index} content={`Your ${stat.label.toLowerCase()} performance`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="organic-card p-4 bg-clay-white/50 hover:shadow-earth transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.color} p-2 rounded-gentle bg-white/50`}>
                  <stat.icon size={20} />
                </div>
              </div>
              
              <div className="text-2xl font-bold text-earth-soil mb-1">
                {stat.value}
              </div>
              
              <div className="text-sm text-earth-soil/70 font-rounded">
                {stat.label}
              </div>
            </motion.div>
          </GuideTooltip>
        ))}
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="organic-card p-6"
      >
        <h3 className="text-xl font-semibold text-earth-soil mb-4 font-rounded">
          Available Crops
        </h3>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-soil/40" size={20} />
          <input
            type="text"
            placeholder="Search crops, farmers, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-gentle border border-earth-soil/20 focus:border-sun-yellow focus:outline-none bg-white text-earth-soil font-rounded"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Filter Buttons */}
          <div className="flex gap-2">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-gentle font-semibold transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-sun-yellow text-earth-soil shadow-clay'
                    : 'bg-clay-white text-earth-soil hover:bg-clay-cream'
                }`}
              >
                <span className="mr-2">{filter.emoji}</span>
                {filter.label}
              </motion.button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-gentle border border-earth-soil/20 focus:border-sun-yellow focus:outline-none bg-white text-earth-soil"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className="text-sm text-earth-soil/60 mb-4">
          Showing {filteredCrops.length} of {availableCrops.length} crops
        </div>
      </motion.div>

      {/* Crops Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCrops.map((crop, index) => (
            <motion.div
              key={crop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="organic-card p-6 hover:shadow-earth transition-all duration-300 cursor-pointer"
              onClick={() => onCropSelect && onCropSelect(crop)}
            >
              {/* Crop Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{crop.image}</div>
                  <div>
                    <h4 className="font-bold text-earth-soil">{crop.crop}</h4>
                    <div className="flex items-center gap-1 text-sm text-earth-soil/70">
                      <Star size={12} className="text-sun-yellow fill-current" />
                      {crop.rating}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-leaf-green">{crop.price}</div>
                  <div className="text-sm text-earth-soil/60">Total: {crop.totalPrice}</div>
                </div>
              </div>

              {/* Farmer Info */}
              <div className="mb-4">
                <div className="font-semibold text-earth-soil">{crop.farmer}</div>
                <div className="flex items-center gap-1 text-sm text-earth-soil/70">
                  <MapPin size={12} />
                  {crop.location}
                </div>
              </div>

              {/* Crop Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-earth-soil/70">Quantity:</span>
                  <span className="text-earth-soil font-medium">{crop.quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-earth-soil/70">Quality:</span>
                  <span className="text-leaf-green font-medium">{crop.quality}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-earth-soil/70">Delivery:</span>
                  <span className="text-earth-soil font-medium">{crop.deliveryTime}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-earth-soil/70 mb-4">{crop.description}</p>

              {/* Certifications */}
              <div className="flex flex-wrap gap-2 mb-4">
                {crop.certifications.map((cert, certIndex) => (
                  <span
                    key={certIndex}
                    className="px-2 py-1 bg-leaf-green/10 text-leaf-green text-xs rounded-full"
                  >
                    {cert}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <GuideTooltip content="Call farmer directly">
                  <motion.a
                    href={`tel:${crop.phone}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 px-3 bg-earth-soil text-white rounded-gentle flex items-center justify-center gap-2 text-sm font-semibold hover:bg-earth-soil/90 transition-colors duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone size={14} />
                    Call
                  </motion.a>
                </GuideTooltip>

                <GuideTooltip content="Message on WhatsApp">
                  <motion.a
                    href={`https://wa.me/${crop.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in your ${crop.crop} - ${crop.quantity}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 px-3 bg-leaf-green text-white rounded-gentle flex items-center justify-center gap-2 text-sm font-semibold hover:bg-leaf-green/90 transition-colors duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MessageCircle size={14} />
                    WhatsApp
                  </motion.a>
                </GuideTooltip>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No Results */}
      {filteredCrops.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-earth-soil mb-2">No crops found</h3>
          <p className="text-earth-soil/70">Try adjusting your search or filters</p>
        </motion.div>
      )}
    </div>
  );
};

export default BuyerDashboard;