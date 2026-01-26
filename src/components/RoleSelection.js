import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, ShoppingCart, Users, TrendingUp, Heart, Eye } from 'lucide-react';

const RoleSelection = ({ t, onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  const roles = [
    {
      id: 'seller',
      title: 'I am a Farmer/Seller',
      subtitle: 'Sell your crops to verified buyers',
      icon: Sprout,
      color: 'from-leaf-green to-leaf-fresh',
      bgColor: 'bg-leaf-green/10',
      features: [
        'AI-powered crop scanning',
        'Real-time market prices',
        'Connect with verified buyers',
        'Automated negotiations',
        'Secure payment terms',
        'Quality assessment'
      ],
      emoji: '🌾',
      description: 'Join thousands of farmers who are getting better prices for their crops through our AI-powered marketplace.'
    },
    {
      id: 'buyer',
      title: 'I am a Buyer/Trader',
      subtitle: 'Source quality crops directly from farmers',
      icon: ShoppingCart,
      color: 'from-sun-yellow to-sun-yellow-light',
      bgColor: 'bg-sun-yellow/10',
      features: [
        'Direct farmer connections',
        'Quality-verified crops',
        'Bulk purchase options',
        'Competitive pricing',
        'Supply chain management',
        'Market analytics'
      ],
      emoji: '🏪',
      description: 'Access premium quality crops directly from farmers with transparent pricing and reliable supply chains.'
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setTimeout(() => {
      onRoleSelect(roleId);
    }, 800);
  };

  return (
    <div className="min-h-screen earth-texture flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {i % 3 === 0 ? (
              <Sprout className="text-leaf-green" size={25 + i * 2} />
            ) : i % 3 === 1 ? (
              <ShoppingCart className="text-sun-yellow" size={20 + i * 2} />
            ) : (
              <Heart className="text-earth-soil" size={22 + i * 2} />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🤝
          </motion.div>
          <h1 className="text-5xl font-bold text-earth-soil mb-4 font-rounded">
            Welcome to Mandi.AI
          </h1>
          <p className="text-xl text-earth-soil/80 font-rounded max-w-2xl mx-auto">
            Your intelligent farming marketplace connecting farmers and buyers with AI-powered solutions
          </p>
        </motion.div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <motion.div
                className={`organic-card p-8 cursor-pointer transition-all duration-500 ${
                  selectedRole === role.id
                    ? 'ring-4 ring-leaf-green shadow-earth scale-105'
                    : 'hover:shadow-earth hover:scale-102'
                } ${role.bgColor}`}
                onClick={() => handleRoleSelect(role.id)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setShowDetails(role.id)}
                onHoverEnd={() => setShowDetails(null)}
              >
                {/* Selection Animation */}
                <AnimatePresence>
                  {selectedRole === role.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 w-8 h-8 bg-leaf-green rounded-full flex items-center justify-center text-white"
                    >
                      ✓
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Role Icon */}
                <motion.div
                  className="text-center mb-6"
                  animate={{ scale: selectedRole === role.id ? 1.1 : 1 }}
                >
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {role.emoji}
                  </motion.div>
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center mb-4`}>
                    <role.icon size={32} className="text-white" />
                  </div>
                </motion.div>

                {/* Role Info */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-earth-soil mb-2 font-rounded">
                    {role.title}
                  </h3>
                  <p className="text-earth-soil/70 mb-6 font-rounded">
                    {role.subtitle}
                  </p>
                  <p className="text-sm text-earth-soil/60 mb-6">
                    {role.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  {role.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-leaf-green rounded-full"></div>
                      <span className="text-sm text-earth-soil/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  className="mt-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-full py-4 px-6 rounded-gentle font-bold text-white bg-gradient-to-r ${role.color} text-center shadow-leaf hover:shadow-earth transition-all duration-300`}>
                    Continue as {role.id === 'seller' ? 'Farmer' : 'Buyer'}
                  </div>
                </motion.div>

                {/* Hover Details */}
                <AnimatePresence>
                  {showDetails === role.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-earth-soil text-white px-4 py-2 rounded-gentle text-sm whitespace-nowrap z-10"
                    >
                      Click to get started!
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-earth-soil rotate-45"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { icon: Users, label: 'Active Users', value: '10,000+', color: 'text-leaf-green' },
            { icon: TrendingUp, label: 'Deals Completed', value: '50,000+', color: 'text-sun-yellow' },
            { icon: Heart, label: 'Success Rate', value: '98%', color: 'text-earth-soil' },
            { icon: Eye, label: 'Crops Listed', value: '1M+', color: 'text-leaf-fresh' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="organic-card p-4 bg-clay-white/50"
            >
              <stat.icon className={`${stat.color} mx-auto mb-2`} size={24} />
              <div className="text-2xl font-bold text-earth-soil">{stat.value}</div>
              <div className="text-sm text-earth-soil/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading Animation */}
        <AnimatePresence>
          {selectedRole && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="organic-card p-8 bg-clay-white text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="text-4xl mb-4"
                >
                  {selectedRole === 'seller' ? '🌾' : '🏪'}
                </motion.div>
                <h3 className="text-xl font-semibold text-earth-soil mb-2">
                  Setting up your {selectedRole === 'seller' ? 'Farmer' : 'Buyer'} account...
                </h3>
                <p className="text-earth-soil/70">
                  Please wait while we prepare your personalized experience
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RoleSelection;