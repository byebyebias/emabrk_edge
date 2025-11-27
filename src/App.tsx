import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { LearningModule, Module } from './components/LearningModule';
import { EmbarkEdgeDashboard } from './components/EmbarkEdgeDashboard';
import { RewardsPage } from './components/RewardsPage';
import { ConversionModal } from './components/ConversionModal';
import { BookOpen, TrendingUp, Coins, Gift, GraduationCap, Target, Star } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import confetti from 'canvas-confetti';

const embarkLogo = 'https://a-ca.storyblok.com/f/2000272/653x167/5716779e99/embark-logo.png';

export default function App() {
  const [userPoints, setUserPoints] = useState(250);
  const [isDashboardUnlocked, setIsDashboardUnlocked] = useState(false);
  const [showConversionModal, setShowConversionModal] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');
  const [streak, setStreak] = useState(3);
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: 'RESP Mastery 🇨🇦',
      description: 'Master Canadian education savings and get FREE government money',
      icon: <GraduationCap className="w-6 h-6" />,
      lessons: 3,
      completedLessons: 0,
      points: 595,
      difficulty: 'Beginner',
      moduleKey: 'resp'
    },
    {
      id: '2',
      title: 'Budgeting and Saving',
      description: 'Learn how to budget wisely and save money for your goals',
      icon: <Target className="w-6 h-6" />,
      lessons: 3,
      completedLessons: 0,
      points: 370,
      difficulty: 'Beginner',
      moduleKey: 'budgetingAndSaving'
    },
    {
      id: '3',
      title: 'Borrowing and Investing',
      description: 'Smart borrowing with OSAP, investment growth, and real-life scenarios',
      icon: <Star className="w-6 h-6" />,
      lessons: 3,
      completedLessons: 0,
      points: 535,
      difficulty: 'Intermediate',
      moduleKey: 'borrowingAndInvesting'
    }
  ]);

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
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-purple-100 shadow-lg rounded-xl p-1">
            <TabsTrigger 
              value="learn" 
              className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <BookOpen className="w-4 h-4" />
              Learn
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <TrendingUp className="w-4 h-4" />
              Dashboard
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
              modules={modules}
              onUpdateModules={setModules}
              streak={streak}
              onUpdateStreak={setStreak}
            />
          </TabsContent>

          <TabsContent value="dashboard" className="mt-4">
            {isDashboardUnlocked ? (
              <EmbarkEdgeDashboard 
                userPoints={userPoints}
                onPointsSpent={handlePointsSpent}
              />
            ) : (
              <div className="space-y-6 py-4">
                {/* Hero Section */}
                <div className="text-center p-8 bg-white rounded-[24px] border border-purple-100 shadow-xl">
                  <h3 className="font-bold text-2xl text-purple-900 mb-3">Unlock Your Dashboard</h3>
                  <p className="text-gray-600 max-w-sm mx-auto text-base leading-relaxed">
                    Complete 5 lessons to gain access to powerful tools that help you track your savings and plan your future.
                  </p>
                </div>

                {/* Features List */}
                <div className="bg-white rounded-xl border border-purple-100 shadow-md p-8 space-y-6">
                  <h4 className="font-bold text-purple-900 text-sm uppercase tracking-widest border-b border-purple-50 pb-4">
                    What you'll get
                  </h4>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4 text-gray-700">
                      <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 mt-1">
                        <Target className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <span className="font-semibold block text-gray-900 mb-1">Smart Goal Setting</span>
                        <span className="text-sm text-gray-500 leading-relaxed">Set personalized savings targets and track your progress in real-time.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 text-gray-700">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 mt-1">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-semibold block text-gray-900 mb-1">Growth Visualization</span>
                        <span className="text-sm text-gray-500 leading-relaxed">See exactly how your investments and savings grow over time.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 text-gray-700">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 mt-1">
                        <GraduationCap className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <span className="font-semibold block text-gray-900 mb-1">Grant Calculator</span>
                        <span className="text-sm text-gray-500 leading-relaxed">Discover how much free government money you qualify for.</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Progress Section */}
                <div className="bg-white rounded-xl border border-purple-100 shadow-md p-8">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="block text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Unlock Progress</span>
                      <span className="text-2xl font-bold text-purple-900">
                        {modules.reduce((acc, curr) => acc + curr.completedLessons, 0)}
                        <span className="text-gray-400 text-lg font-normal"> / 5 Lessons</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                        {Math.round((modules.reduce((acc, curr) => acc + curr.completedLessons, 0) / 5) * 100)}%
                      </span>
                    </div>
                  </div>
                  <Progress value={(modules.reduce((acc, curr) => acc + curr.completedLessons, 0) / 5) * 100} className="h-4 bg-purple-50" />
                  <p className="text-sm text-center text-gray-500 mt-4">
                    Complete more lessons in the <strong>Learn</strong> tab to unlock!
                  </p>
                </div>
              </div>
            )}
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