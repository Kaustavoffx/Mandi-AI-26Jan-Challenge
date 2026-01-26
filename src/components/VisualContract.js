import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Truck, 
  IndianRupee, 
  CheckCircle2, 
  Calendar,
  User
} from 'lucide-react';

const VisualContract = ({ t, dealData, cropData }) => {
  if (!dealData) return null;

  const contractIcons = [
    { icon: IndianRupee, label: dealData.finalPrice, color: 'text-neon-green' },
    { icon: Heart, label: t.dealStruck, color: 'text-neon-orange' },
    { icon: Truck, label: 'Delivery', color: 'text-blue-400' },
    { icon: CheckCircle2, label: t.contract, color: 'text-neon-green' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-lg mx-auto mt-8"
    >
      <div className="glass-morphism rounded-3xl p-8 text-center">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-neon-green mb-2">
            🎉 {t.dealStruck}
          </h2>
          <p className="text-white/80">
            {t.contract}
          </p>
        </motion.div>

        {/* Visual Contract Icons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {contractIcons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="glass-morphism rounded-2xl p-4"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`${item.color} mb-2`}
              >
                <item.icon size={32} className="mx-auto" />
              </motion.div>
              <p className="text-sm font-semibold text-white">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contract Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-3 text-left"
        >
          <div className="glass-morphism rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <User className="text-neon-orange" size={20} />
              <span className="font-semibold">Contract Details</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Crop:</span>
                <span className="text-neon-green">{t.premium} {t.onions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Quality:</span>
                <span className="text-neon-orange">A+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Price:</span>
                <span className="text-neon-green font-bold">{dealData.finalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Quantity:</span>
                <span className="text-white">{dealData.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Buyer:</span>
                <span className="text-white">{dealData.buyer}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/60">
            <Calendar size={14} />
            <span>Contract generated on {new Date().toLocaleDateString()}</span>
          </div>
        </motion.div>

        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6"
        >
          <div className="text-4xl">🤝</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VisualContract;