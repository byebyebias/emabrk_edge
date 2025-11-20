import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { LearningModule } from './components/LearningModule';
import { EmbarkEdgeDashboard } from './components/EmbarkEdgeDashboard';
import { ProgressTracker } from './components/ProgressTracker';
import { RewardsPage } from './components/RewardsPage';
import { ConversionModal } from './components/ConversionModal';
import { BookOpen, TrendingUp, Award, Coins, Gift } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import confetti from 'canvas-confetti';

const embarkLogo = 'https://a-ca.storyblok.com/f/2000272/653x167/5716779e99/embark-logo.png';

export default function App() {
  const [userPoints, setUserPoints] = useState(250);
  const [isDashboardUnlocked, setIsDashboardUnlocked] = useState(false);
  const [showConversionModal, setShowConversionModal] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');

  const handlePointsEarned = (points: number) => {
    setUserPoints(prev => prev + points);
    toast.success(`🎉 You earned ${points} points!`, {
      description: "Keep learning to unlock more features!",
    });
  };

  const handlePointsSpent = (points: number) => {
    setUserPoints(prev => prev - points);
    toast.success(`🎁 Reward redeemed!`, {
      description: `You spent ${points} points.`,
    });
  };

  const handleModuleComplete = () => {
    if (!isDashboardUnlocked) {
      // Fire confetti immediately
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      // Show modal after 2 seconds
      setTimeout(() => {
        setShowConversionModal(true);
      }, 2000);
    }
  };

  const handleConversionComplete = () => {
    setIsDashboardUnlocked(true);
    setShowConversionModal(false);
    setActiveTab('dashboard');
    toast.success(`🚀 Embark Edge Dashboard Unlocked!`, {
      description: "You can now track your RESP savings and set goals!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-lavender-100">
      <ConversionModal 
        isOpen={showConversionModal} 
        onComplete={handleConversionComplete} 
      />

      {/* Header */}
      <div className="bg-white text-purple-900 p-4 sticky top-0 z-10 shadow-lg border-b border-purple-100">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={embarkLogo} 
              alt="Embark Edge" 
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                Embark Edge
              </h1>
              <p className="text-sm text-purple-600">Learn. Save. Succeed.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-md">
              <Coins className="w-3 h-3 mr-1" />
              {userPoints.toLocaleString()}
            </Badge>
            {/* Debug Button: Visible for testing */}
            <button 
              onClick={handleModuleComplete}
              className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full hover:bg-red-200 transition-colors"
              title="Debug: Trigger Module Completion"
            >
              Unlock Flow
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-4">
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-purple-100 shadow-lg rounded-xl p-1">
            <TabsTrigger 
              value="learn" 
              className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <BookOpen className="w-4 h-4" />
              Learn
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard" 
              disabled={!isDashboardUnlocked}
              className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="progress" 
              className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <Award className="w-4 h-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger 
              value="rewards" 
              className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <Gift className="w-4 h-4" />
              Rewards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learn" className="mt-4">
            <LearningModule 
              userPoints={userPoints}
              onPointsEarned={handlePointsEarned}
              onModuleComplete={handleModuleComplete}
            />
          </TabsContent>

          <TabsContent value="dashboard" className="mt-4">
            {isDashboardUnlocked ? (
              <EmbarkEdgeDashboard 
                userPoints={userPoints}
                onPointsSpent={handlePointsSpent}
              />
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-lavender-200 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium text-purple-900">Dashboard Locked</h3>
                  <p className="text-sm text-purple-600 mt-1">
                    Complete 3 learning modules to unlock your RESP dashboard
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="progress" className="mt-4">
            <ProgressTracker 
              userPoints={userPoints}
              isDashboardUnlocked={isDashboardUnlocked}
            />
          </TabsContent>

          <TabsContent value="rewards" className="mt-4">
            <RewardsPage 
              userPoints={userPoints}
              onPointsSpent={handlePointsSpent}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}