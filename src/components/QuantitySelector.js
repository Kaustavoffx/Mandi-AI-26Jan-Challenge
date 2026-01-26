import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Minus } from 'lucide-react';
import GuideTooltip from './GuideTooltip';

const QuantitySelector = ({ t, onQuantitySelect, selectedCrop }) => {
  const [quantity, setQuantity] = useState(10);
  const [unit, setUnit] = useState('kg');

  const units = [
    { value: 'kg', label: t.kg, multiplier: 1 },
    { value: 'quintal', label: t.quintal, multiplier: 100 },
    { value: 'ton', label: t.ton, multiplier: 1000 }
  ];

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 1000) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirm = () => {
    const totalKg = quantity * units.find(u => u.value === unit).multiplier;
    onQuantitySelect({
      quantity,
      unit,
      totalKg,
      displayText: `${quantity} ${unit}`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="organic-card p-6 mb-6"
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-semibold text-earth-soil mb-4 font-rounded flex items-center gap-2"
      >
        <Package size={20} />
        {t.selectQuantity}
      </motion.h3>

      <div className="space-y-6">
        {/* Quantity Input */}
        <div className="flex items-center justify-center gap-4">
          <GuideTooltip content="Decrease quantity">
            <motion.button
              onClick={() => handleQuantityChange(quantity - 1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-earth-soil/10 hover:bg-earth-soil/20 flex items-center justify-center text-earth-soil transition-colors duration-300"
            >
              <Minus size={20} />
            </motion.button>
          </GuideTooltip>

          <div className="text-center">
            <motion.div
              key={quantity}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-earth-soil mb-2"
            >
              {quantity}
            </motion.div>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-20 text-center text-lg font-semibold bg-transparent border-b-2 border-leaf-green focus:outline-none focus:border-leaf-fresh text-earth-soil"
              min="1"
              max="1000"
            />
          </div>

          <GuideTooltip content="Increase quantity">
            <motion.button
              onClick={() => handleQuantityChange(quantity + 1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-earth-soil/10 hover:bg-earth-soil/20 flex items-center justify-center text-earth-soil transition-colors duration-300"
            >
              <Plus size={20} />
            </motion.button>
          </GuideTooltip>
        </div>

        {/* Unit Selection */}
        <div className="flex justify-center gap-2">
          {units.map((unitOption) => (
            <motion.button
              key={unitOption.value}
              onClick={() => setUnit(unitOption.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-gentle font-semibold transition-all duration-300 ${
                unit === unitOption.value
                  ? 'bg-leaf-green text-white shadow-leaf'
                  : 'bg-clay-white text-earth-soil hover:bg-clay-cream'
              }`}
            >
              {unitOption.label}
            </motion.button>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-4 bg-gradient-to-r from-clay-white to-clay-cream rounded-gentle"
        >
          <div className="text-sm text-earth-soil/70 mb-1">Total Quantity</div>
          <div className="text-xl font-bold text-earth-soil">
            {quantity} {unit}
            {unit !== 'kg' && (
              <span className="text-sm text-earth-soil/60 ml-2">
                ({quantity * units.find(u => u.value === unit).multiplier} kg)
              </span>
            )}
          </div>
        </motion.div>

        {/* Confirm Button */}
        <GuideTooltip content="Confirm your quantity selection">
          <motion.button
            onClick={handleConfirm}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-leaf-green to-leaf-fresh text-white font-semibold rounded-gentle shadow-leaf hover:shadow-earth transition-all duration-300"
          >
            Confirm Quantity
          </motion.button>
        </GuideTooltip>
      </div>
    </motion.div>
  );
};

export default QuantitySelector;