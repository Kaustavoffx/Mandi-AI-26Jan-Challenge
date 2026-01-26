import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Bot, Heart } from 'lucide-react';
import GuideTooltip from './GuideTooltip';

const NegotiationVisual = ({ t, language, cropData, quantityData, selectedBuyer, onDealComplete }) => {
  const [currentStatus, setCurrentStatus] = useState('');
  const [isActive, setIsActive] = useState(false);

  const negotiationSteps = {
    en: [
      { status: `Connecting with ${selectedBuyer?.name || 'Premium Buyer'}...`, icon: Users },
      { status: "AI analyzing market conditions...", icon: Bot },
      { status: `Negotiating ${quantityData?.displayText || '10kg'} deal...`, icon: Heart },
      { status: `Deal confirmed at ${selectedBuyer?.price || '₹28/kg'}!`, icon: Heart }
    ],
    hi: [
      { status: `${selectedBuyer?.name || 'प्रीमियम खरीदार'} से जुड़ रहे हैं...`, icon: Users },
      { status: "AI बाजार स्थितियों का विश्लेषण कर रहा है...", icon: Bot },
      { status: `${quantityData?.displayText || '10 किलो'} सौदे की बातचीत...`, icon: Heart },
      { status: `${selectedBuyer?.price || '₹28/kg'} पर सौदा पक्का!`, icon: Heart }
    ],
    bn: [
      { status: `${selectedBuyer?.name || 'প্রিমিয়াম ক্রেতা'} এর সাথে যোগাযোগ...`, icon: Users },
      { status: "AI বাজার অবস্থা বিশ্লেষণ করছে...", icon: Bot },
      { status: `${quantityData?.displayText || '১০ কেজি'} চুক্তির আলোচনা...`, icon: Heart },
      { status: `${selectedBuyer?.price || '₹28/kg'} তে চুক্তি সম্পন্ন!`, icon: Heart }
    ],
    ta: [
      { status: `${selectedBuyer?.name || 'பிரீமியம் வாங்குபவர்'} உடன் இணைக்கிறோம்...`, icon: Users },
      { status: "AI சந்தை நிலைமைகளை பகுப்பாய்வு செய்கிறது...", icon: Bot },
      { status: `${quantityData?.displayText || '10 கிலோ'} ஒப்பந்த பேச்சுவார்த்தை...`, icon: Heart },
      { status: `${selectedBuyer?.price || '₹28/kg'} க்கு ஒப்பந்தம் உறுதி!`, icon: Heart }
    ],
    te: [
      { status: `${selectedBuyer?.name || 'ప్రీమియం కొనుగోలుదారు'} తో కనెక్ట్ అవుతున్నాము...`, icon: Users },
      { status: "AI మార్కెట్ పరిస్థితులను విశ్లేషిస్తోంది...", icon: Bot },
      { status: `${quantityData?.displayText || '10 కిలోలు'} ఒప్పందం చర్చలు...`, icon: Heart },
      { status: `${selectedBuyer?.price || '₹28/kg'} కి ఒప్పందం ఖరారు!`, icon: Heart }
    ],
    gu: [
      { status: `${selectedBuyer?.name || 'પ્રીમિયમ ખરીદદાર'} સાથે જોડાઈ રહ્યા છીએ...`, icon: Users },
      { status: "AI બજાર પરિસ્થિતિઓનું વિશ્લેષણ કરી રહ્યું છે...", icon: Bot },
      { status: `${quantityData?.displayText || '10 કિલો'} સોદાની વાટાઘાટો...`, icon: Heart },
      { status: `${selectedBuyer?.price || '₹28/kg'} પર સોદો પક્કો!`, icon: Heart }
    ]
  };

  useEffect(() => {
    if (cropData && selectedBuyer && !isActive) {
      setIsActive(true);
      const steps = negotiationSteps[language] || negotiationSteps.en;
      
      steps.forEach((step, index) => {
        setTimeout(() => {
          setCurrentStatus(step.status);
          
          // Complete the deal on the last step
          if (index === steps.length - 1) {
            setTimeout(() => {
              const totalAmount = selectedBuyer.totalOffer || '₹2,800';
              onDealComplete({
                finalPrice: selectedBuyer.price,
                totalAmount: totalAmount,
                buyer: selectedBuyer.name,
                buyerPhone: selectedBuyer.phone,
                buyerWhatsapp: selectedBuyer.whatsapp,
                quantity: quantityData?.displayText || '10kg',
                deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                paymentTerms: selectedBuyer.paymentTerms,
                location: selectedBuyer.location
              });
            }, 2000);
          }
        }, (index + 1) * 2500);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cropData, selectedBuyer, quantityData, language, isActive, onDealComplete]);

  if (!cropData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto mt-8"
    >
      <GuideTooltip content={t?.helpText?.negotiation || "Our AI negotiates with multiple buyers to get you the best price"}>
        <div className="organic-card p-8 text-center">
          {/* Handshake Visual */}
          <motion.div
            className="mb-6 flex justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="relative">
              <motion.div
                className="text-6xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🤝
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-leaf-green rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Status Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStatus}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <h3 className="text-xl font-semibold text-earth-soil mb-2 font-rounded">
                {t.negotiating}
              </h3>
              <p className="text-earth-soil/70 font-rounded">
                {currentStatus}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                className="w-2 h-2 rounded-full bg-leaf-green/30"
                animate={{
                  backgroundColor: currentStatus.includes('Deal') || currentStatus.includes('सौदा') || currentStatus.includes('চুক্তি') || currentStatus.includes('ஒப்பந்தம்') || currentStatus.includes('ఒప్పందం') || currentStatus.includes('સોદો')
                    ? '#4CAF50' 
                    : '#4CAF50'
                }}
                transition={{ delay: step * 0.5 }}
              />
            ))}
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-organic">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-leaf-green/40 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </GuideTooltip>
    </motion.div>
  );
};

export default NegotiationVisual;