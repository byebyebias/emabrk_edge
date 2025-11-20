import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Trophy, Star, Zap, Lock, Unlock } from 'lucide-react';

interface ProgressTrackerProps {
  userPoints: number;
  isDashboardUnlocked: boolean;
}

export function ProgressTracker({ userPoints, isDashboardUnlocked }: ProgressTrackerProps) {
  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: <Star className="w-5 h-5" />,
      requirement: 50,
      unlocked: userPoints >= 50
    },
    {
      id: 2,
      title: 'Quick Learner',
      description: 'Earn 250 points',
      icon: <Zap className="w-5 h-5" />,
      requirement: 250,
      unlocked: userPoints >= 250
    },
    {
      id: 3,
      title: 'Savings Specialist',
      description: 'Complete Budgeting & Savings modules',
      icon: <Trophy className="w-5 h-5" />,
      requirement: 500,
      unlocked: userPoints >= 500
    },
    {
      id: 4,
      title: 'Financial Expert',
      description: 'Master all learning modules',
      icon: <Trophy className="w-5 h-5 text-gold" />,
      requirement: 1000,
      unlocked: userPoints >= 1000
    }
  ];

  const levelProgress = Math.min((userPoints / 1000) * 100, 100);
  const currentLevel = Math.floor(userPoints / 100) + 1;
  const pointsToNextLevel = Math.max(0, (currentLevel * 100) - userPoints);

  return (
    <div className="space-y-4">
      {/* Level Progress */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Progress</span>
            <Badge className="bg-white/20 text-white border-0">Level {currentLevel}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span>{userPoints}/1000 points</span>
            </div>
            <Progress value={levelProgress} className="h-3 bg-white/20" />
            {pointsToNextLevel > 0 && (
              <p className="text-sm opacity-90 mt-1">
                {pointsToNextLevel} points until next level
              </p>
            )}
          </div>

          {/* Dashboard Unlock Status */}
          <div className={`p-4 rounded-lg border-2 ${isDashboardUnlocked ? 'border-green-400 bg-green-100/50' : 'border-orange-400 bg-orange-100/50'}`}>
            <div className="flex items-center gap-3">
              {isDashboardUnlocked ? (
                <Unlock className="w-6 h-6 text-green-300" />
              ) : (
                <Lock className="w-6 h-6 text-orange-300" />
              )}
              <div>
                <h3 className="font-medium text-white">
                  Embark Edge Dashboard
                </h3>
                <p className="text-sm opacity-90">
                  {isDashboardUnlocked 
                    ? 'Unlocked! Track your RESP savings and goals.' 
                    : `Complete 3 learning modules to unlock (Need ${Math.max(0, 500 - userPoints)} more points)`
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-white/80 backdrop-blur-sm border border-purple-100 shadow-md">
        <CardHeader>
          <CardTitle className="text-purple-900">Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                  achievement.unlocked 
                    ? 'border-green-200 bg-green-50 shadow-sm' 
                    : 'border-gray-200 bg-gray-50 opacity-75'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  achievement.unlocked 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${achievement.unlocked ? 'text-green-800' : 'text-gray-600'}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${achievement.unlocked ? 'text-green-700' : 'text-gray-500'}`}>
                    {achievement.description}
                  </p>
                </div>
                <div className="text-right">
                  {achievement.unlocked ? (
                    <Badge className="bg-green-100 text-green-800 border-0 shadow-sm">
                      <Trophy className="w-3 h-3 mr-1" />
                      Unlocked
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-purple-200 text-purple-600">
                      {achievement.requirement} pts
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}