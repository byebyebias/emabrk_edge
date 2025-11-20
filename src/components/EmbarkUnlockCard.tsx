import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  TrendingUp, 
  Gift, 
  X, 
  ArrowRight,
  PiggyBank,
  Target,
  Shield
} from 'lucide-react';

interface EmbarkUnlockCardProps {
  onDismiss?: () => void;
  variant?: 'default' | 'compact' | 'progress';
}

export function EmbarkUnlockCard({ onDismiss, variant = 'default' }: EmbarkUnlockCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const handleGetStarted = () => {
    window.open('https://www.embark.ca/landing/resp-offer?utm_source=cpc&utm_medium=google&utm_campaign=Embark+|+Search+|+Branded+|+EN+|+RV&utm_content=June+2025+$150+Offer&gad_source=1&gad_campaignid=20116218232&gbraid=0AAAAADsABovsRoQF5gOx4G-U4iFUl71s2&gclid=CjwKCAjwgeLHBhBuEiwAL5gNEcCgo9bZvhpmYhPWr-tCQdkvv5a9kSy2XEEeaN1WGPJgABZld3D0nBoCyeAQAvD_BwE', '_blank');
  };

  const getContent = () => {
    switch (variant) {
      case 'compact':
        return {
          title: 'Start Your RESP',
          description: 'Open your education savings account and get 20% government matching!',
          cta: 'Get Started'
        };
      case 'progress':
        return {
          title: 'Level Up Your Savings',
          description: 'You\'re doing great! Now supercharge your education fund with a real RESP account.',
          cta: 'Open Account'
        };
      default:
        return {
          title: 'Open Your RESP Account',
          description: 'Start saving for your education with Canada\'s #1 RESP provider. Get government grants up to $7,200!',
          cta: 'Get Started Free'
        };
    }
  };

  const content = getContent();

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mb-4"
      >
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-700 text-white">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          </div>
          
          {/* Dismiss button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="absolute top-2 right-2 h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/20 rounded-full z-10"
          >
            <X className="h-4 w-4" />
          </Button>

          <CardContent className="relative p-4">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="flex-shrink-0 p-2 bg-white/20 rounded-full backdrop-blur-sm mt-1"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{content.title}</h3>
                  <Badge className="bg-yellow-400 text-yellow-900 text-xs font-semibold border-0">
                    Free Setup
                  </Badge>
                </div>
                
                <p className="text-sm opacity-90 mb-3 leading-relaxed">
                  {content.description}
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="flex items-center gap-1 text-xs">
                    <PiggyBank className="w-3 h-3 text-green-300" />
                    <span className="opacity-90">20% Match</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Target className="w-3 h-3 text-blue-300" />
                    <span className="opacity-90">Goal Tracking</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Shield className="w-3 h-3 text-purple-300" />
                    <span className="opacity-90">CDIC Insured</span>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleGetStarted}
                    className="w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold shadow-md border-0 group"
                  >
                    <span>{content.cta}</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Bottom highlight */}
            <div className="flex items-center justify-center mt-3 pt-2 border-t border-white/20">
              <div className="flex items-center gap-1 text-xs opacity-75">
                <Gift className="w-3 h-3" />
                <span>Limited time: No setup fees + bonus learning rewards</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
