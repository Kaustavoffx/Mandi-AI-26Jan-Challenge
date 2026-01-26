import React from 'react';
import { motion } from 'framer-motion';
import * as Popover from '@radix-ui/react-popover';
import { useGuide } from './GuideProvider';
import { HelpCircle } from 'lucide-react';

const GuideTooltip = ({ children, content, position = 'top' }) => {
  const { isGuideMode } = useGuide();

  if (!isGuideMode) {
    return children;
  }

  return (
    <div className="relative">
      {children}
      <Popover.Root>
        <Popover.Trigger asChild>
          <motion.button
            className="guide-dot"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="z-50 w-64 p-4 bg-white rounded-soft shadow-organic border border-leaf-green/20"
            sideOffset={8}
            side={position}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-start gap-3"
            >
              <HelpCircle className="text-leaf-green flex-shrink-0 mt-0.5" size={16} />
              <p className="text-sm text-earth-soil leading-relaxed font-rounded">
                {content}
              </p>
            </motion.div>
            <Popover.Arrow className="fill-white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export default GuideTooltip;