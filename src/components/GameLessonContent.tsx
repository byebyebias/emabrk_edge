import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { MultiPageLesson } from './MultiPageLesson';
import { GuessPriceGame } from './GuessPriceGame';
import { BudgetAllocationGame } from './BudgetAllocationGame';
import { InvestmentVisualizer } from './InvestmentVisualizer';
import { BorrowVsInvestScenarios } from './BorrowVsInvestScenarios';
import { OSAPVisualsGame } from './OSAPVisualsGame';
import { 
  BookOpen, 
  Play,
  Lightbulb,
  Coins,
  Trophy,
  CheckCircle,
  Star
} from 'lucide-react';

interface Page {
  id: number;
  title: string;
  content: string;
}

interface GameLessonContentProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    content?: string;
    pages?: Page[];
    hasMultiplePages?: boolean;
    totalPoints: number;
    gameType?: 'price' | 'budget' | 'investment-visualizer' | 'borrow-invest-scenarios' | 'osap-visuals';
  };
  onComplete: (points: number, perfect: boolean) => void;
  onClose: () => void;
  streak: number;
}

type GameStage = 'intro' | 'game' | 'complete';

export function GameLessonContent({ lesson, onComplete, onClose, streak }: GameLessonContentProps) {
  const [gameStage, setGameStage] = useState<GameStage>('intro');
  const [gameScore, setGameScore] = useState(0);

  const handleGameComplete = (score: number) => {
    setGameScore(score);
    setGameStage('complete');
  };

  const handleFinalComplete = () => {
    const isPerfect = gameScore >= lesson.totalPoints * 0.9; // 90% or higher is perfect
    onComplete(gameScore, isPerfect);
  };

  const getScorePercentage = () => Math.round((gameScore / lesson.totalPoints) * 100);

  const renderIntro = () => {
    // If lesson has multiple pages, show the MultiPageLesson component
    if (lesson.hasMultiplePages && lesson.pages) {
      return (
        <MultiPageLesson
          pages={lesson.pages}
          lessonTitle={lesson.title}
          onComplete={() => setGameStage('game')}
        />
      );
    }

    // Otherwise show the single content intro
    return (
      <>
        <Card className="mb-6 border-purple-200 bg-purple-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <CardTitle>{lesson.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {lesson.content && (
              <div className="prose prose-sm max-w-none">
                {lesson.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h4 key={index} className="font-semibold text-purple-900 mt-3 mb-1">
                        {paragraph.replace(/\*\*/g, '')}
                      </h4>
                    );
                  }
                  if (paragraph.trim()) {
                    return (
                      <p key={index} className="text-gray-700 mb-2">
                        {paragraph}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Button 
          onClick={() => setGameStage('game')} 
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg"
          size="lg"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Challenge
        </Button>
      </>
    );
  };

  const renderComplete = () => {
    const percentage = getScorePercentage();
    const isPerfect = percentage >= 90;
    
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <Card className={`border-2 ${isPerfect ? 'border-yellow-400 bg-yellow-50' : 'border-green-400 bg-green-50'}`}>
            <CardContent className="p-8 text-center space-y-4">
              {isPerfect ? (
                <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
              ) : (
                <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
              )}
              
              <div>
                <h2 className="text-3xl font-semibold text-purple-900 mb-2">
                  {isPerfect ? 'Perfect Score! 🎉' : 'Great Job! 🎊'}
                </h2>
                <p className="text-lg text-purple-700">
                  You earned {gameScore} out of {lesson.totalPoints} points!
                </p>
              </div>

              <div className="bg-white/50 rounded-lg p-4">
                <div className="text-5xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {percentage}%
                </div>
                <Progress value={percentage} className="h-3 mb-2" />
                <p className="text-sm text-purple-700">
                  {isPerfect 
                    ? "You have excellent knowledge!" 
                    : percentage >= 75
                      ? "You're doing great!"
                      : "Good start! Keep learning."}
                </p>
              </div>

              {isPerfect && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center gap-2 text-yellow-700"
                >
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">Perfect!</span>
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <Button 
          onClick={handleFinalComplete}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
          size="lg"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Complete Lesson
        </Button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg max-w-md w-full my-4"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 sticky top-0 z-10 rounded-t-lg">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">{lesson.title}</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose} 
              className="text-white hover:bg-white/20 rounded-full h-8 w-8 p-0"
            >
              ×
            </Button>
          </div>
          
          {gameStage === 'game' && (
            <div className="flex items-center gap-2">
              <Badge className="bg-white/20 text-white border-0">
                In Progress
              </Badge>
            </div>
          )}
        </div>

        <div className="p-6 max-h-[calc(90vh-100px)] overflow-y-auto">
          {gameStage === 'intro' && renderIntro()}
          {gameStage === 'game' && (
            lesson.gameType === 'price' 
              ? <GuessPriceGame onComplete={handleGameComplete} />
              : lesson.gameType === 'budget'
              ? <BudgetAllocationGame onComplete={handleGameComplete} />
              : lesson.gameType === 'investment-visualizer'
              ? <InvestmentVisualizer onComplete={handleGameComplete} />
              : lesson.gameType === 'borrow-invest-scenarios'
              ? <BorrowVsInvestScenarios onComplete={handleGameComplete} />
              : <OSAPVisualsGame onComplete={handleGameComplete} />
          )}
          {gameStage === 'complete' && renderComplete()}
        </div>
      </motion.div>
    </div>
  );
}