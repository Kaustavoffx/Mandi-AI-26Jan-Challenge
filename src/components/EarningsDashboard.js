import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Activity, Eye } from 'lucide-react';
import GuideTooltip from './GuideTooltip';

const EarningsDashboard = ({ t }) => {
  // Mock earnings data
  const earningsData = {
    today: '₹2,450',
    totalSales: '₹18,750',
    activeBids: 7,
    trend: '+12%'
  };

  const statsCards = [
    {
      title: t.todaysEarnings,
      value: earningsData.today,
      icon: DollarSign,
      color: 'text-leaf-green',
      bg: 'bg-leaf-green/10',
      trend: earningsData.trend
    },
    {
      title: t.totalSales,
      value: earningsData.totalSales,
      icon: TrendingUp,
      color: 'text-sun-yellow',
      bg: 'bg-sun-yellow/10',
      trend: '+8%'
    },
    {
      title: t.activeBids,
      value: earningsData.activeBids,
      icon: Activity,
      color: 'text-earth-soil',
      bg: 'bg-earth-soil/10',
      trend: '+3'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-semibold text-earth-soil mb-4 font-rounded flex items-center gap-2"
      >
        <Eye size={20} />
        Dashboard
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsCards.map((card, index) => (
          <GuideTooltip key={index} content={`Your ${card.title.toLowerCase()} performance`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`organic-card p-4 ${card.bg} hover:shadow-earth transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`${card.color} p-2 rounded-gentle bg-white/50`}>
                  <card.icon size={20} />
                </div>
                <motion.div
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    card.trend.includes('+') 
                      ? 'bg-leaf-green/20 text-leaf-green' 
                      : 'bg-sun-yellow/20 text-sun-yellow'
                  }`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {card.trend}
                </motion.div>
              </div>
              
              <div className="text-2xl font-bold text-earth-soil mb-1">
                {card.value}
              </div>
              
              <div className="text-sm text-earth-soil/70 font-rounded">
                {card.title}
              </div>
            </motion.div>
          </GuideTooltip>
        ))}
      </div>
    </motion.div>
  );
};

export default EarningsDashboard;