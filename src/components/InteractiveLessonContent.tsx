import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { GameLessonContent } from './GameLessonContent';
import { MultiPageLesson } from './MultiPageLesson';
import { 
  CheckCircle, 
  XCircle, 
  Lightbulb, 
  Flame, 
  Star, 
  Coins,
  Timer,
  Target,
  TrendingUp,
  Zap,
  BookOpen,
  Play
} from 'lucide-react';

interface Question {
  id: string;
  type: 'multiple-choice' | 'scenario' | 'true-false' | 'slider';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
  scenario?: string;
  consequences?: { [key: string]: string };
}

interface Page {
  id: number;
  title: string;
  content: string;
}

interface LessonData {
  id: string;
  title: string;
  description: string;
  content?: string;
  pages?: Page[];
  hasMultiplePages?: boolean;
  questions?: Question[];
  totalPoints: number;
  isGameLesson?: boolean;
  videoUrl?: string;
}

interface InteractiveLessonContentProps {
  lesson: LessonData;
  onComplete: (points: number, perfect: boolean) => void;
  onClose: () => void;
  streak: number;
}

export function InteractiveLessonContent({ lesson, onComplete, onClose, streak }: InteractiveLessonContentProps) {
  // If it's a game lesson, render the GameLessonContent component
  if (lesson.isGameLesson) {
    return <GameLessonContent lesson={lesson} onComplete={onComplete} onClose={onClose} streak={streak} />;
  }

  // If it's a multi-page lesson, render the MultiPageLessonContent component
  if (lesson.hasMultiplePages && lesson.pages) {
    return <MultiPageLessonContent lesson={lesson} onComplete={onComplete} onClose={onClose} streak={streak} />;
  }

  // Regular lesson with content and questions
  return <RegularLessonContent lesson={lesson} onComplete={onComplete} onClose={onClose} streak={streak} />;
}

// Separate component for multi-page lessons
function MultiPageLessonContent({ lesson, onComplete, onClose, streak }: InteractiveLessonContentProps) {
  const [showingContent, setShowingContent] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(streak);
  const [comboMultiplier, setComboMultiplier] = useState(1);

  const currentQuestion = lesson.questions?.[currentQuestionIndex];
  const progress = currentQuestion ? ((currentQuestionIndex + 1) / lesson.questions!.length) * 100 : 0;
  const isLastQuestion = currentQuestion ? currentQuestionIndex === lesson.questions!.length - 1 : false;

  useEffect(() => {
    if (showingContent || !currentQuestion) return;
    
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleSubmitAnswer();
    }
  }, [timeLeft, isAnswered, showingContent, currentQuestion]);

  useEffect(() => {
    if (!showingContent) {
      setTimeLeft(30);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsAnswered(false);
    }
  }, [currentQuestionIndex, showingContent]);

  const handleSubmitAnswer = () => {
    if (isAnswered || !currentQuestion) return;
    
    setIsAnswered(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setCurrentStreak(prev => prev + 1);
      
      const timeBonus = Math.floor(timeLeft / 3);
      const streakBonus = Math.floor(currentStreak / 3) + 1;
      const totalPoints = (currentQuestion.points + timeBonus) * streakBonus;
      
      setScore(prev => prev + totalPoints);
      setComboMultiplier(streakBonus);
    } else {
      setCurrentStreak(0);
      setComboMultiplier(1);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (!currentQuestion) return;
    
    if (isLastQuestion) {
      const isPerfect = correctAnswers === lesson.questions!.length - 1 + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
      onComplete(score, isPerfect);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  if (showingContent) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">{lesson.title}</h2>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 rounded-full">
                ×
              </Button>
            </div>
          </div>

          <div className="p-6">
            <MultiPageLesson
              pages={lesson.pages!}
              lessonTitle={lesson.title}
              onComplete={() => setShowingContent(false)}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <QuizContent
      lesson={lesson}
      currentQuestion={currentQuestion}
      currentQuestionIndex={currentQuestionIndex}
      progress={progress}
      isLastQuestion={isLastQuestion}
      selectedAnswer={selectedAnswer}
      setSelectedAnswer={setSelectedAnswer}
      showExplanation={showExplanation}
      timeLeft={timeLeft}
      isAnswered={isAnswered}
      currentStreak={currentStreak}
      score={score}
      comboMultiplier={comboMultiplier}
      onSubmitAnswer={handleSubmitAnswer}
      onNextQuestion={handleNextQuestion}
      onClose={onClose}
    />
  );
}

// Separate component for regular lessons
function RegularLessonContent({ lesson, onComplete, onClose, streak }: InteractiveLessonContentProps) {
  const [showingContent, setShowingContent] = useState(!!lesson.content);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(streak);
  const [comboMultiplier, setComboMultiplier] = useState(1);

  const currentQuestion = lesson.questions![currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / lesson.questions!.length) * 100;
  const isLastQuestion = currentQuestionIndex === lesson.questions!.length - 1;

  useEffect(() => {
    if (showingContent) return;
    
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleSubmitAnswer();
    }
  }, [timeLeft, isAnswered, showingContent]);

  useEffect(() => {
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  const handleSubmitAnswer = () => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setCurrentStreak(prev => prev + 1);
      
      const timeBonus = Math.floor(timeLeft / 3);
      const streakBonus = Math.floor(currentStreak / 3) + 1;
      const totalPoints = (currentQuestion.points + timeBonus) * streakBonus;
      
      setScore(prev => prev + totalPoints);
      setComboMultiplier(streakBonus);
    } else {
      setCurrentStreak(0);
      setComboMultiplier(1);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const isPerfect = correctAnswers === lesson.questions!.length - 1 + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
      onComplete(score, isPerfect);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  if (showingContent) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">{lesson.title}</h2>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 rounded-full">
                ×
              </Button>
            </div>
          </div>

          <div className="p-6">
            <Card className="mb-6 border-purple-200 bg-purple-50/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <CardTitle>Lesson Overview</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{lesson.description}</p>
                
                {lesson.videoUrl && (
                  <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                    <video 
                      src={lesson.videoUrl} 
                      controls 
                      className="w-full aspect-video object-cover"
                      poster="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                
                {lesson.content && (
                  <div className="prose prose-sm max-w-none">
                    {lesson.content.split('\n').map((paragraph, index) => {
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <h4 key={index} className="font-semibold text-purple-900 mt-4 mb-2">
                            {paragraph.replace(/\*\*/g, '')}
                          </h4>
                        );
                      }
                      if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-')) {
                        const text = paragraph.trim().substring(1).trim();
                        const parts = text.split(/(\*\*.*?\*\*)/g);
                        return (
                          <li key={index} className="ml-4 text-gray-700 mb-2">
                            {parts.map((part, i) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={i} className="text-gray-900">{part.replace(/\*\*/g, '')}</strong>;
                              }
                              return <span key={i}>{part}</span>;
                            })}
                          </li>
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

                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-blue-900 mb-1">Ready to test your knowledge?</p>
                      <p className="text-sm text-blue-700">
                        Complete {lesson.questions!.length} questions to earn up to {lesson.totalPoints} points!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={() => setShowingContent(false)} 
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Quiz
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <QuizContent
      lesson={lesson}
      currentQuestion={currentQuestion}
      currentQuestionIndex={currentQuestionIndex}
      progress={progress}
      isLastQuestion={isLastQuestion}
      selectedAnswer={selectedAnswer}
      setSelectedAnswer={setSelectedAnswer}
      showExplanation={showExplanation}
      timeLeft={timeLeft}
      isAnswered={isAnswered}
      currentStreak={currentStreak}
      score={score}
      comboMultiplier={comboMultiplier}
      onSubmitAnswer={handleSubmitAnswer}
      onNextQuestion={handleNextQuestion}
      onClose={onClose}
    />
  );
}

// Shared quiz content component
interface QuizContentProps {
  lesson: LessonData;
  currentQuestion: Question;
  currentQuestionIndex: number;
  progress: number;
  isLastQuestion: boolean;
  selectedAnswer: string | number | null;
  setSelectedAnswer: (answer: string | number | null) => void;
  showExplanation: boolean;
  timeLeft: number;
  isAnswered: boolean;
  currentStreak: number;
  score: number;
  comboMultiplier: number;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
  onClose: () => void;
}

function QuizContent({
  lesson,
  currentQuestion,
  currentQuestionIndex,
  progress,
  isLastQuestion,
  selectedAnswer,
  setSelectedAnswer,
  showExplanation,
  timeLeft,
  isAnswered,
  currentStreak,
  score,
  comboMultiplier,
  onSubmitAnswer,
  onNextQuestion,
  onClose
}: QuizContentProps) {
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className={`w-full p-4 h-auto text-left justify-start transition-all duration-200 whitespace-normal break-words ${
                    selectedAnswer === option && !showExplanation ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0' : ''
                  } ${
                    showExplanation
                      ? option === currentQuestion.correctAnswer
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : selectedAnswer === option && option !== currentQuestion.correctAnswer
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : ''
                      : !isAnswered ? 'hover:border-purple-300 hover:bg-purple-50' : ''
                  }`}
                  onClick={() => !isAnswered && setSelectedAnswer(option)}
                  disabled={isAnswered}
                >
                  <span className="mr-3 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showExplanation && option === currentQuestion.correctAnswer && (
                    <CheckCircle className="w-5 h-5 ml-2 text-green-600 shrink-0" />
                  )}
                  {showExplanation && selectedAnswer === option && option !== currentQuestion.correctAnswer && (
                    <XCircle className="w-5 h-5 ml-2 text-red-600 shrink-0" />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        );
      
      case 'scenario':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Scenario:</h4>
              <p className="text-blue-700">{currentQuestion.scenario}</p>
            </div>
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={selectedAnswer === option ? "default" : "outline"}
                    className={`w-full p-4 h-auto text-left justify-start whitespace-normal break-words ${
                      showExplanation
                        ? option === currentQuestion.correctAnswer
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : selectedAnswer === option && option !== currentQuestion.correctAnswer
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : ''
                        : ''
                    }`}
                    onClick={() => !isAnswered && setSelectedAnswer(option)}
                    disabled={isAnswered}
                  >
                    <span className="flex-1">{option}</span>
                    {showExplanation && currentQuestion.consequences?.[option] && (
                      <div className="mt-2 text-sm opacity-80 w-full">
                        Result: {currentQuestion.consequences[option]}
                      </div>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'true-false':
        return (
          <div className="grid grid-cols-2 gap-4">
            {['True', 'False'].map((option) => (
              <motion.div
                key={option}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className={`w-full h-20 text-lg ${
                    showExplanation
                      ? option === currentQuestion.correctAnswer
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : selectedAnswer === option && option !== currentQuestion.correctAnswer
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : ''
                      : ''
                  }`}
                  onClick={() => !isAnswered && setSelectedAnswer(option)}
                  disabled={isAnswered}
                >
                  {option}
                </Button>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">{lesson.title}</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 rounded-full">
              ×
            </Button>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />
          <div className="flex items-center justify-between mt-2 text-sm">
            <span>{currentQuestionIndex + 1} of {lesson.questions!.length}</span>
            <div className="flex items-center gap-4">
              {currentStreak > 0 && (
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-300" />
                  <span>{currentStreak}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Coins className="w-4 h-4 text-yellow-300" />
                <span>{score}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Timer className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-500'}`} />
              <span className={`font-medium ${timeLeft <= 10 ? 'text-red-600' : ''}`}>
                {timeLeft}s
              </span>
            </div>
            {comboMultiplier > 1 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full"
              >
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">{comboMultiplier}x Combo!</span>
              </motion.div>
            )}
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderQuestion()}
            </CardContent>
          </Card>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Card className={selectedAnswer === currentQuestion.correctAnswer ? 'border-green-500' : 'border-red-500'}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {selectedAnswer === currentQuestion.correctAnswer ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-800">Correct! 🎉</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="text-red-800">Not quite right</span>
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{currentQuestion.explanation}</p>
                  </div>
                  {selectedAnswer === currentQuestion.correctAnswer && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800">
                        <Star className="w-4 h-4" />
                        <span className="font-medium">
                          +{currentQuestion.points + Math.floor(timeLeft / 3)} points
                        </span>
                        {comboMultiplier > 1 && (
                          <span className="text-sm">
                            (×{comboMultiplier} streak bonus!)
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          <div className="flex gap-3">
            {!showExplanation ? (
              <Button 
                onClick={onSubmitAnswer} 
                disabled={selectedAnswer === null || isAnswered}
                className="flex-1"
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={onNextQuestion} className="flex-1">
                {isLastQuestion ? 'Complete Lesson' : 'Next Question'}
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
