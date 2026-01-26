import React, { createContext, useContext, useState } from 'react';

const GuideContext = createContext();

export const useGuide = () => {
  const context = useContext(GuideContext);
  if (!context) {
    throw new Error('useGuide must be used within a GuideProvider');
  }
  return context;
};

export const GuideProvider = ({ children }) => {
  const [isGuideMode, setIsGuideMode] = useState(false);

  const toggleGuideMode = () => {
    setIsGuideMode(prev => !prev);
  };

  return (
    <GuideContext.Provider value={{ isGuideMode, toggleGuideMode }}>
      {children}
    </GuideContext.Provider>
  );
};