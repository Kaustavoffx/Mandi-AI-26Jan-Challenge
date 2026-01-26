import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Truck, 
  IndianRupee, 
  CheckCircle2, 
  Calendar,
  Package,
  Phone,
  MessageCircle,
  MapPin
} from 'lucide-react';
import GuideTooltip from './GuideTooltip';

const ContractCard = ({ t, dealData, cropData, quantityData, selectedBuyer }) => {
  if (!dealData) return null;

  const contractIcons = [
    { icon: IndianRupee, label: dealData.totalAmount || dealData.finalPrice, color: 'text-leaf-green', bg: 'bg-leaf-green/10' },
    { icon: Heart, label: t.dealStruck, color: 'text-sun-yellow', bg: 'bg-sun-yellow/10' },
    { icon: Truck, label: 'Delivery', color: 'text-earth-soil', bg: 'bg-earth-soil/10' },
    { icon: CheckCircle2, label: t.contract, color: 'text-leaf-green', bg: 'bg-leaf-green/10' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-lg mx-auto mt-8"
    >
      <GuideTooltip content={t?.helpText?.contract || "Your final agreement with buyer details and delivery information"}>
        <div className="organic-card p-8 text-center earth-texture">
          {/* Success Header */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="mb-8"
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎉
            </motion.div>
            <h2 className="text-2xl font-bold text-earth-soil mb-2 font-rounded">
              {t.dealStruck}
            </h2>
            <p className="text-earth-soil/70 font-rounded">
              {t.contract}
            </p>
          </motion.div>

          {/* Contract Icons Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {contractIcons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`organic-card p-4 ${item.bg} hover:scale-105 transition-transform duration-300`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`${item.color} mb-2 flex justify-center`}
                >
                  <item.icon size={28} />
                </motion.div>
                <p className="text-sm font-semibold text-earth-soil font-rounded">
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
            className="space-y-4 text-left"
          >
            <div className="organic-card p-6 bg-gradient-to-r from-clay-white to-clay-cream">
              <div className="flex items-center gap-3 mb-4">
                <Package className="text-leaf-green" size={20} />
                <span className="font-semibold text-earth-soil font-rounded">Contract Summary</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-earth-soil/70">Crop:</span>
                    <span className="text-earth-soil font-medium">{cropData?.crop || 'Premium Onions'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-soil/70">Quality:</span>
                    <span className="text-leaf-green font-medium">{cropData?.quality || 'A+'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-soil/70">Quantity:</span>
                    <span className="text-earth-soil font-medium">{quantityData?.displayText || dealData.quantity}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-earth-soil/70">Rate:</span>
                    <span className="text-leaf-green font-bold">{dealData.finalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-soil/70">Total:</span>
                    <span className="text-leaf-green font-bold">{dealData.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-soil/70">Payment:</span>
                    <span className="text-earth-soil font-medium">{dealData.paymentTerms}</span>
                  </div>
                </div>
              </div>

              {/* Buyer Information */}
              <div className="mt-6 pt-4 border-t border-earth-soil/10">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="text-leaf-green" size={16} />
                  <span className="font-semibold text-earth-soil">Buyer Details</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-earth-soil/70">Name:</span>
                    <span className="text-earth-soil font-medium">{dealData.buyer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-soil/70">Location:</span>
                    <span className="text-earth-soil font-medium">{dealData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-soil/70">Delivery:</span>
                    <span className="text-earth-soil font-medium">{dealData.deliveryDate}</span>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex gap-3 mt-4">
                  <motion.a
                    href={`tel:${dealData.buyerPhone}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3 px-4 bg-earth-soil text-white rounded-gentle flex items-center justify-center gap-2 font-semibold hover:bg-earth-soil/90 transition-colors duration-300"
                  >
                    <Phone size={16} />
                    Call Now
                  </motion.a>

                  <motion.a
                    href={`https://wa.me/${dealData.buyerWhatsapp?.replace(/[^0-9]/g, '')}?text=Hi, regarding our deal for ${cropData?.crop} - ${quantityData?.displayText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3 px-4 bg-leaf-green text-white rounded-gentle flex items-center justify-center gap-2 font-semibold hover:bg-leaf-green/90 transition-colors duration-300"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Contract ID & Date */}
            <div className="flex items-center justify-between text-xs text-earth-soil/60 px-2">
              <div className="flex items-center gap-2">
                <Calendar size={12} />
                <span>Generated on {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>ID: MA{Date.now().toString().slice(-6)}</span>
              </div>
            </div>
          </motion.div>

          {/* Celebration Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-6 flex justify-center"
          >
            <div className="text-4xl">🌾</div>
          </motion.div>
        </div>
      </GuideTooltip>
    </motion.div>
  );
};

export default ContractCard;