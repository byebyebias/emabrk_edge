import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { InteractiveLessonContent } from './InteractiveLessonContent';
import { allLessons } from './LessonData';
import { motion } from 'motion/react';
import { Trophy, Star, Coins, BookOpen, Target, CreditCard, Flame, Zap, Play, GraduationCap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  lessons: number;
  completedLessons: number;
  points: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  moduleKey: string;
}

interface LearningModuleProps {
  userPoints: number;
  onPointsEarned: (points: number) => void;
  onModuleComplete: () => void;
  modules: Module[];
  onUpdateModules: (modules: Module[]) => void;
  streak: number;
  onUpdateStreak: (streak: number) => void;
}

export function LearningModule({ 
  userPoints, 
  onPointsEarned, 
  onModuleComplete,
  modules,
  onUpdateModules,
  streak,
  onUpdateStreak
}: LearningModuleProps) {
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const handleStartLesson = (module: Module) => {
    const moduleLessons = allLessons[module.moduleKey as keyof typeof allLessons];
    if (moduleLessons && module.completedLessons < moduleLessons.length) {
      setCurrentLesson({
        ...moduleLessons[module.completedLessons],
        moduleId: module.id
      });
      setCurrentLessonIndex(module.completedLessons);
    }
  };

  const handleLessonComplete = (points: number, perfect: boolean) => {
    onPointsEarned(points);
    
    if (perfect) {
      const newStreak = streak + 1;
      onUpdateStreak(newStreak);
      toast.success(`🔥 Perfect score! ${newStreak + 1} lesson streak!`, {
        description: `Earned ${points} points with streak bonus!`,
      });
    } else {
      toast.success(`Good job! Earned ${points} points`, {
        description: "Keep practicing to improve your streak!",
      });
    }

    const updatedModules = modules.map(module => {
      if (module.id === currentLesson.moduleId) {
        const newCompleted = module.completedLessons + 1;
        return {
          ...module,
          completedLessons: newCompleted
        };
      }
      return module;
    });

    onUpdateModules(updatedModules);

    setCurrentLesson(null);
    
    const totalCompletedLessons = updatedModules.reduce((acc, curr) => acc + curr.completedLessons, 0);
    if (totalCompletedLessons >= 5) {
      onModuleComplete();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Stats Display */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <div>
                  <p className="text-sm opacity-90">Points</p>
                  <p className="text-xl font-semibold">{userPoints.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-pink-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-yellow-300" />
                <div>
                  <p className="text-sm opacity-90">Streak</p>
                  <p className="text-xl font-semibold">{streak}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Challenge */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Daily Challenge</p>
                    <p className="text-sm opacity-90">Complete any lesson for 2x points!</p>
                  </div>
                </div>
                <Badge className="bg-white text-orange-600 font-semibold shadow-md">
                  2x XP
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Modules */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Learning Modules</h2>
            <Badge variant="outline" className="text-xs">
              Interactive Lessons
            </Badge>
          </div>
          
          {modules.map((module, index) => {
            const progress = (module.completedLessons / module.lessons) * 100;
            const isCompleted = module.completedLessons === module.lessons;
            const isLocked = false;
            const canStart = !isLocked && !isCompleted;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`transition-all duration-200 bg-white/80 backdrop-blur-sm border border-purple-100 shadow-md ${
                  isLocked ? 'opacity-50' : canStart ? 'hover:shadow-xl hover:scale-[1.02] hover:border-purple-200' : ''
                } ${canStart ? 'cursor-pointer' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`p-3 rounded-xl ${
                            isCompleted 
                              ? 'bg-green-100 text-green-600' 
                              : isLocked
                              ? 'bg-gray-100 text-gray-400'
                              : 'bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600'
                          }`}
                          whileHover={canStart ? { scale: 1.1, rotate: 5 } : {}}
                        >
                          {module.icon}
                        </motion.div>
                        <div>
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                          {canStart && (
                            <div className="flex items-center gap-1 mt-2">
                              <Play className="w-3 h-3 text-blue-500" />
                              <span className="text-xs text-blue-600 font-medium">
                                Interactive Quiz Available
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getDifficultyColor(module.difficulty)}>
                          {module.difficulty}
                        </Badge>
                        {isCompleted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-1 text-green-600"
                          >
                            <Trophy className="w-4 h-4" />
                            <span className="text-xs font-medium">Mastered!</span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress: {module.completedLessons}/{module.lessons} lessons</span>
                        <span className="flex items-center gap-1">
                          <Coins className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{module.points} pts</span>
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex gap-2">
                        {isCompleted ? (
                          <Badge className="bg-green-100 text-green-800 flex-1 justify-center py-2">
                            <Trophy className="w-3 h-3 mr-1" />
                            Module Completed
                          </Badge>
                        ) : isLocked ? (
                          <Badge variant="secondary" className="flex-1 justify-center py-2">
                            <span className="text-xs">🔒 Unlock at 800 points</span>
                          </Badge>
                        ) : (
                          <motion.div 
                            className="flex-1"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              size="sm" 
                              onClick={() => handleStartLesson(module)}
                              className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 border-0 shadow-md"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              {module.completedLessons === 0 ? 'Start Interactive Quiz' : 'Continue Learning'}
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Lesson Modal */}
      {currentLesson && (
        <InteractiveLessonContent
          lesson={currentLesson}
          onComplete={handleLessonComplete}
          onClose={() => setCurrentLesson(null)}
          streak={streak}
        />
      )}
    </>
  );
}