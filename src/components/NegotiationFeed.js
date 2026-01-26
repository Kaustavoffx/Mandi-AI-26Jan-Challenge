import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Bot, IndianRupee } from 'lucide-react';

const NegotiationFeed = ({ t, language, cropData, onDealComplete }) => {
  const [negotiations, setNegotiations] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const negotiationMessages = {
    en: [
      "Buyer A offered ₹15. AI Agent: 'Market rate is ₹18, let's negotiate.'",
      "AI Agent countered: 'Premium quality deserves premium price - ₹17 minimum.'",
      "Buyer A: 'How about ₹16?' AI Agent: 'Deal! ₹16 for premium onions.'",
    ],
    hinglish: [
      "Buyer A ne ₹15 offer kiya. AI Agent: 'Market rate ₹18 hai, negotiate karte hain.'",
      "AI Agent bola: 'Premium quality ka premium price - minimum ₹17.'",
      "Buyer A: '₹16 kaisa?' AI Agent: 'Done! ₹16 mein premium pyaaz.'",
    ],
    banglish: [
      "Buyer A ₹15 offer korlo. AI Agent: 'Market rate ₹18 cholche, negotiate kori.'",
      "AI Agent bollo: 'Premium quality er premium price - minimum ₹17.'",
      "Buyer A: '₹16 ki bolish?' AI Agent: 'Thik ache! ₹16 te premium peyaj.'",
    ],
    hi: [
      "खरीदार A ने ₹15 की पेशकश की। AI एजेंट: 'बाजार दर ₹18 है, बातचीत करते हैं।'",
      "AI एजेंट ने कहा: 'प्रीमियम गुणवत्ता का प्रीमियम मूल्य - न्यूनतम ₹17।'",
      "खरीदार A: '₹16 कैसा?' AI एजेंट: 'हो गया! ₹16 में प्रीमियम प्याज।'",
    ],
    bn: [
      "ক্রেতা A ₹15 অফার করেছে। AI এজেন্ট: 'বাজার দর ₹18, আলোচনা করি।'",
      "AI এজেন্ট বলল: 'প্রিমিয়াম গুণমানের প্রিমিয়াম দাম - সর্বনিম্ন ₹17।'",
      "ক্রেতা A: '₹16 কেমন?' AI এজেন্ট: 'ঠিক আছে! ₹16 তে প্রিমিয়াম পেঁয়াজ।'",
    ],
    mr: [
      "खरेदार A ने ₹15 ची ऑफर दिली। AI एजंट: 'बाजार दर ₹18 आहे, वाटाघाटी करूया।'",
      "AI एजंटने म्हटले: 'प्रीमियम गुणवत्तेची प्रीमियम किंमत - किमान ₹17।'",
      "खरेदार A: '₹16 कसे?' AI एजंट: 'झाले! ₹16 मध्ये प्रीमियम कांदा।'",
    ],
    te: [
      "కొనుగోలుదారు A ₹15 ఆఫర్ చేశాడు। AI ఏజెంట్: 'మార్కెట్ రేట్ ₹18, చర్చిద్దాం।'",
      "AI ఏజెంట్ చెప్పింది: 'ప్రీమియం నాణ్యతకు ప్రీమియం ధర - కనీసం ₹17।'",
      "కొనుగోలుదారు A: '₹16 ఎలా?' AI ఏజెంట్: 'అయింది! ₹16కి ప్రీమియం ఉల్లిపాయలు।'",
    ]
  };

  useEffect(() => {
    if (cropData && !isActive) {
      setIsActive(true);
      const messages = negotiationMessages[language] || negotiationMessages.en;
      
      messages.forEach((message, index) => {
        setTimeout(() => {
          setNegotiations(prev => [...prev, {
            id: Date.now() + index,
            message,
            timestamp: new Date().toLocaleTimeString(),
            type: index === messages.length - 1 ? 'success' : 'negotiating'
          }]);
          
          if (index === messages.length - 1) {
            setTimeout(() => {
              onDealComplete({
                finalPrice: '₹16/kg',
                buyer: 'Buyer A',
                quantity: '100kg'
              });
            }, 2000);
          }
        }, (index + 1) * 2000);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cropData, language, isActive, onDealComplete]);

  if (!cropData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto mt-8"
    >
      <div className="glass-morphism rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Bot className="text-neon-green" size={24} />
          </motion.div>
          <h3 className="text-xl font-bold text-neon-green">
            {t.negotiating}
          </h3>
          <TrendingUp className="text-neon-orange" size={20} />
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          <AnimatePresence>
            {negotiations.map((nego) => (
              <motion.div
                key={nego.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`
                  p-3 rounded-xl border-l-4
                  ${nego.type === 'success' 
                    ? 'bg-neon-green/10 border-neon-green' 
                    : 'bg-neon-orange/10 border-neon-orange'
                  }
                `}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p className="text-sm text-white/90">{nego.message}</p>
                    <p className="text-xs text-white/60 mt-1">{nego.timestamp}</p>
                  </div>
                  {nego.type === 'success' && (
                    <IndianRupee className="text-neon-green flex-shrink-0" size={16} />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Live ticker effect */}
        <div className="mt-4 overflow-hidden">
          <motion.div
            className="whitespace-nowrap text-neon-green text-sm"
            animate={{ x: [300, -300] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            🔥 Live Market: Onions ₹15-18/kg • Wheat ₹22-25/kg • Rice ₹28-32/kg • Tomatoes ₹12-15/kg
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default NegotiationFeed;