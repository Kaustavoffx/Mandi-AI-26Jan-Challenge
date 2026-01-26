import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Phone, MessageCircle, Star, MapPin, Clock, TrendingUp } from 'lucide-react';
import GuideTooltip from './GuideTooltip';

const BuyerSelection = ({ t, cropData, quantityData, onBuyerSelect }) => {
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  // Mock buyer data with variety
  const buyers = [
    {
      id: 1,
      name: "Rajesh Agro Traders",
      rating: 4.8,
      location: "Mumbai, Maharashtra",
      phone: "+91 98765 43210",
      whatsapp: "+91 98765 43210",
      price: "₹28/kg",
      totalOffer: calculateTotal(28, quantityData?.totalKg || 10),
      deliveryTime: "2-3 days",
      paymentTerms: "Advance 50%",
      verified: true,
      specialization: "Premium Vegetables",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Green Valley Exports",
      rating: 4.9,
      location: "Delhi, NCR",
      phone: "+91 87654 32109",
      whatsapp: "+91 87654 32109",
      price: "₹30/kg",
      totalOffer: calculateTotal(30, quantityData?.totalKg || 10),
      deliveryTime: "1-2 days",
      paymentTerms: "Cash on delivery",
      verified: true,
      specialization: "Export Quality",
      lastActive: "30 minutes ago"
    },
    {
      id: 3,
      name: "Farmer's Choice Co-op",
      rating: 4.6,
      location: "Pune, Maharashtra",
      phone: "+91 76543 21098",
      whatsapp: "+91 76543 21098",
      price: "₹26/kg",
      totalOffer: calculateTotal(26, quantityData?.totalKg || 10),
      deliveryTime: "3-4 days",
      paymentTerms: "Net 15 days",
      verified: true,
      specialization: "Bulk Orders",
      lastActive: "1 hour ago"
    },
    {
      id: 4,
      name: "Fresh Market Solutions",
      rating: 4.7,
      location: "Bangalore, Karnataka",
      phone: "+91 65432 10987",
      whatsapp: "+91 65432 10987",
      price: "₹29/kg",
      totalOffer: calculateTotal(29, quantityData?.totalKg || 10),
      deliveryTime: "2-3 days",
      paymentTerms: "Advance 30%",
      verified: true,
      specialization: "Retail Chains",
      lastActive: "45 minutes ago"
    },
    {
      id: 5,
      name: "Organic Harvest Ltd",
      rating: 4.5,
      location: "Chennai, Tamil Nadu",
      phone: "+91 54321 09876",
      whatsapp: "+91 54321 09876",
      price: "₹32/kg",
      totalOffer: calculateTotal(32, quantityData?.totalKg || 10),
      deliveryTime: "1-2 days",
      paymentTerms: "Immediate payment",
      verified: true,
      specialization: "Organic Certified",
      lastActive: "15 minutes ago"
    }
  ];

  function calculateTotal(pricePerKg, totalKg) {
    return `₹${(pricePerKg * totalKg).toLocaleString()}`;
  }

  const handleSelectBuyer = (buyer) => {
    setSelectedBuyer(buyer);
  };

  const handleConfirmBuyer = () => {
    if (selectedBuyer) {
      onBuyerSelect(selectedBuyer);
    }
  };

  // Sort buyers by price (highest first)
  const sortedBuyers = [...buyers].sort((a, b) => 
    parseInt(b.price.replace('₹', '').replace('/kg', '')) - 
    parseInt(a.price.replace('₹', '').replace('/kg', ''))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-semibold text-earth-soil mb-6 font-rounded flex items-center gap-2"
      >
        <Users size={24} />
        {t.selectBuyer}
      </motion.h3>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="organic-card p-4 bg-gradient-to-r from-leaf-green/10 to-leaf-fresh/10"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-earth-soil/70">Selling</div>
            <div className="font-semibold text-earth-soil">
              {cropData?.crop} - {quantityData?.displayText}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-earth-soil/70">Best Offer</div>
            <div className="text-xl font-bold text-leaf-green">
              {sortedBuyers[0]?.price}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Buyer Cards */}
      <div className="space-y-4">
        {sortedBuyers.map((buyer, index) => (
          <motion.div
            key={buyer.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`organic-card p-6 cursor-pointer transition-all duration-300 ${
              selectedBuyer?.id === buyer.id
                ? 'ring-2 ring-leaf-green bg-leaf-green/5'
                : 'hover:shadow-earth hover:scale-[1.01]'
            }`}
            onClick={() => handleSelectBuyer(buyer)}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-lg font-semibold text-earth-soil">
                    {buyer.name}
                  </h4>
                  {buyer.verified && (
                    <div className="w-5 h-5 bg-leaf-green rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                  {index === 0 && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="px-2 py-1 bg-sun-yellow text-earth-soil text-xs font-bold rounded-full"
                    >
                      BEST
                    </motion.div>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-earth-soil/70 mb-2">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-sun-yellow fill-current" />
                    {buyer.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {buyer.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {buyer.lastActive}
                  </div>
                </div>

                <div className="text-sm text-earth-soil/60 mb-3">
                  {buyer.specialization} • {buyer.deliveryTime} • {buyer.paymentTerms}
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-leaf-green mb-1">
                  {buyer.price}
                </div>
                <div className="text-sm text-earth-soil/70">
                  Total: {buyer.totalOffer}
                </div>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="flex gap-2">
              <GuideTooltip content="Call this buyer directly">
                <motion.a
                  href={`tel:${buyer.phone}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-2 px-4 bg-earth-soil/10 hover:bg-earth-soil/20 text-earth-soil rounded-gentle flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  <Phone size={16} />
                  {t.callNow}
                </motion.a>
              </GuideTooltip>

              <GuideTooltip content="Message on WhatsApp">
                <motion.a
                  href={`https://wa.me/${buyer.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in selling ${cropData?.crop} - ${quantityData?.displayText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-2 px-4 bg-leaf-green/10 hover:bg-leaf-green/20 text-leaf-green rounded-gentle flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  <MessageCircle size={16} />
                  {t.whatsapp}
                </motion.a>
              </GuideTooltip>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Confirm Selection */}
      <AnimatePresence>
        {selectedBuyer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sticky bottom-4 z-10"
          >
            <GuideTooltip content="Confirm your buyer selection">
              <motion.button
                onClick={handleConfirmBuyer}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-leaf-green to-leaf-fresh text-white font-bold text-lg rounded-gentle shadow-leaf hover:shadow-earth transition-all duration-300"
              >
                Confirm Deal with {selectedBuyer.name}
                <div className="text-sm opacity-90">
                  Total: {selectedBuyer.totalOffer}
                </div>
              </motion.button>
            </GuideTooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BuyerSelection;