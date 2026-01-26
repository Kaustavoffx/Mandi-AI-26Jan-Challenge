import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Bot, User, Mic, MicOff, TrendingUp, X } from 'lucide-react';
import GuideTooltip from './GuideTooltip';

const AIChat = ({ t, isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Hello! I'm your AI farming assistant. I can help you with market prices, crop advice, weather updates, and trading insights. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognition = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Market price queries
    if (message.includes('price') || message.includes('rate') || message.includes('market')) {
      const crops = ['onions', 'tomatoes', 'wheat', 'rice', 'cotton', 'potato'];
      const mentionedCrop = crops.find(crop => message.includes(crop));
      
      if (mentionedCrop) {
        const prices = {
          onions: '₹25-30/kg',
          tomatoes: '₹28-35/kg',
          wheat: '₹18-22/kg',
          rice: '₹20-25/kg',
          cotton: '₹45-50/kg',
          potato: '₹12-18/kg'
        };
        
        return `Current market price for ${mentionedCrop}:
        
🏷️ **Today's Rate**: ${prices[mentionedCrop]}
📈 **Trend**: Rising (+8% this week)
📍 **Best Markets**: Mumbai, Delhi, Pune
⏰ **Peak Season**: Now is a good time to sell!

Would you like me to connect you with verified buyers or check prices for other crops?`;
      }
      
      return `Here are today's market rates:

🧅 **Onions**: ₹25-30/kg (↗️ +12%)
🍅 **Tomatoes**: ₹28-35/kg (↗️ +8%)
🌾 **Wheat**: ₹18-22/kg (↔️ Stable)
🌾 **Rice**: ₹20-25/kg (↗️ +5%)
🥔 **Potato**: ₹12-18/kg (↘️ -3%)

Which crop are you planning to sell? I can provide detailed analysis and connect you with buyers.`;
    }
    
    // Weather queries
    if (message.includes('weather') || message.includes('rain') || message.includes('temperature')) {
      return `🌤️ **Weather Update for Farming**:

**Today**: Partly cloudy, 28°C
**Tomorrow**: Light rain expected (15mm)
**This Week**: Good conditions for harvesting

**Farming Advice**:
- Complete harvesting before tomorrow's rain
- Store crops in dry conditions
- Good time for post-harvest activities

Need specific weather info for your location?`;
    }
    
    // Crop advice
    if (message.includes('grow') || message.includes('plant') || message.includes('seed') || message.includes('advice')) {
      return `🌱 **Crop Growing Advice**:

**Current Season Recommendations**:
- **Vegetables**: Tomatoes, Onions, Cabbage
- **Grains**: Wheat (if winter), Rice (if monsoon)
- **Cash Crops**: Cotton, Sugarcane

**Tips**:
✅ Check soil pH before planting
✅ Use quality seeds from certified dealers  
✅ Plan irrigation based on crop needs
✅ Consider market demand before choosing crops

What specific crop are you planning to grow?`;
    }
    
    // Selling advice
    if (message.includes('sell') || message.includes('buyer') || message.includes('deal')) {
      return `💰 **Selling Strategy**:

**Best Practices**:
1. **Quality Grading**: Get your crops properly graded
2. **Market Timing**: Sell during peak demand hours (6-10 AM)
3. **Multiple Buyers**: Compare at least 3-4 offers
4. **Documentation**: Keep proper records for better prices

**Current Hot Deals**:
🔥 Premium vegetables getting 20% above market rate
🔥 Organic certified crops in high demand
🔥 Export quality getting premium prices

Ready to list your crops? I can help you find the best buyers!`;
    }
    
    // Default responses
    const defaultResponses = [
      `I'm here to help with all your farming needs! I can assist with:

📊 **Market Prices** - Real-time rates and trends
🌾 **Crop Advice** - Growing tips and recommendations  
🌤️ **Weather Updates** - Farming-specific forecasts
💰 **Selling Strategy** - Connect with best buyers
📈 **Market Analysis** - Demand and supply insights

What would you like to know more about?`,
      
      `As your AI farming assistant, I have access to:

🔍 **Live Market Data** from 500+ mandis
👥 **Verified Buyer Network** across India
🌱 **Crop Intelligence** for better yields
📱 **Direct Communication** with traders

How can I help you maximize your farming profits today?`,
      
      `Great question! Here's what I can help you with:

💡 **Smart Farming Tips**
📊 **Price Predictions** 
🤝 **Buyer Connections**
📈 **Market Trends**
🌾 **Crop Recommendations**

What specific information are you looking for?`
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleVoiceInput = () => {
    if (!recognition.current) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const quickQuestions = [
    "What's the current onion price?",
    "Best time to sell tomatoes?",
    "Weather forecast for farming",
    "Connect me with buyers",
    "Market trends this week"
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl h-[80vh] bg-clay-white rounded-organic shadow-earth overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-leaf-green to-leaf-fresh p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <Bot size={20} />
            </motion.div>
            <div>
              <h3 className="font-bold text-lg">AI Farming Assistant</h3>
              <p className="text-sm opacity-90">Your smart farming companion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[80%] ${
                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-earth-soil text-white' 
                    : 'bg-leaf-green text-white'
                }`}>
                  {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-gentle ${
                  message.type === 'user'
                    ? 'bg-earth-soil text-white'
                    : 'bg-white shadow-clay'
                }`}>
                  <div className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-2 opacity-70 ${
                    message.type === 'user' ? 'text-white' : 'text-earth-soil'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start"
              >
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-leaf-green rounded-full flex items-center justify-center text-white">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white p-3 rounded-gentle shadow-clay">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-leaf-green rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ 
                            duration: 1, 
                            repeat: Infinity, 
                            delay: i * 0.2 
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="p-4 border-t border-earth-soil/10">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickQuestions.map((question, index) => (
              <motion.button
                key={index}
                onClick={() => setInputMessage(question)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 px-3 py-2 bg-leaf-green/10 text-leaf-green text-sm rounded-full hover:bg-leaf-green/20 transition-colors"
              >
                {question}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-earth-soil/10">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about market prices, crop advice, weather..."
                className="w-full p-3 pr-12 border border-earth-soil/20 rounded-gentle focus:outline-none focus:border-leaf-green bg-white"
              />
              <GuideTooltip content="Voice input">
                <button
                  onClick={handleVoiceInput}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                    isListening 
                      ? 'bg-red-500 text-white' 
                      : 'bg-earth-soil/10 text-earth-soil hover:bg-earth-soil/20'
                  }`}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
              </GuideTooltip>
            </div>
            <GuideTooltip content="Send message">
              <motion.button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gradient-to-r from-leaf-green to-leaf-fresh text-white rounded-gentle disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-leaf transition-all"
              >
                <Send size={20} />
              </motion.button>
            </GuideTooltip>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIChat;