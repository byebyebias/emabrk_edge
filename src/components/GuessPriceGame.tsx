import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { 
  ShoppingCart, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface Item {
  id: string;
  name: string;
  actualPrice: number;
  image: string;
}

interface GuessPriceGameProps {
  onComplete: (score: number) => void;
}

const items: Item[] = [
  {
    id: '1',
    name: 'Shampoo (400ml)',
    actualPrice: 7,
    image: '🧴'
  },
  {
    id: '2',
    name: 'Olive Oil (500ml)',
    actualPrice: 11,
    image: '🫒'
  },
  {
    id: '3',
    name: 'Milk (4L)',
    actualPrice: 7,
    image: '🥛'
  },
  {
    id: '4',
    name: 'Ground Coffee (300g)',
    actualPrice: 13,
    image: '☕'
  },
  {
    id: '5',
    name: 'Chicken Breast (1kg)',
    actualPrice: 15,
    image: '🍗'
  },
  {
    id: '6',
    name: 'Laundry Detergent (4.5L)',
    actualPrice: 14,
    image: '🧴'
  }
];

export function GuessPriceGame({ onComplete }: GuessPriceGameProps) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [hasGuessed, setHasGuessed] = useState(false);
  const [results, setResults] = useState<Array<{ item: Item; guess: number; accuracy: number }>>([]);

  const currentItem = items[currentItemIndex];
  const isLastItem = currentItemIndex === items.length - 1;

  const calculateAccuracy = (guess: number, actual: number) => {
    const difference = Math.abs(guess - actual);
    const percentDiff = (difference / actual) * 100;
    
    // 100% if exact, decreases by 1% for each 1% off
    // e.g., 10% off = 90% accuracy, 25% off = 75% accuracy, 50% off = 50% accuracy
    return Math.max(0, 100 - percentDiff);
  };

  const handleSubmitGuess = () => {
    if (!userGuess || parseFloat(userGuess) <= 0) return;

    const guess = parseFloat(userGuess);
    const accuracy = calculateAccuracy(guess, currentItem.actualPrice);
    
    setResults([...results, { item: currentItem, guess, accuracy }]);
    setHasGuessed(true);
  };

  const handleNext = () => {
    if (isLastItem) {
      // Calculate total score
      const totalAccuracy = results.reduce((sum, r) => sum + r.accuracy, 0);
      const avgAccuracy = totalAccuracy / results.length;
      const finalScore = Math.round((avgAccuracy / 100) * 100); // Convert to points out of 100
      onComplete(finalScore);
    } else {
      setCurrentItemIndex(currentItemIndex + 1);
      setUserGuess('');
      setHasGuessed(false);
    }
  };

  const getDifference = () => {
    if (!hasGuessed) return 0;
    const guess = parseFloat(userGuess);
    return guess - currentItem.actualPrice;
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 85) return 'text-green-600';
    if (accuracy >= 65) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getAccuracyMessage = (accuracy: number) => {
    if (accuracy >= 85) return 'Amazing! Spot on! 🎯';
    if (accuracy >= 65) return 'Pretty close! 👍';
    if (accuracy >= 45) return 'Getting there! Keep learning! 💡';
    return 'Big difference! Real costs might surprise you! 😅';
  };

  const currentResult = hasGuessed ? results[results.length - 1] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Guess the Price Challenge
          </CardTitle>
          <p className="text-sm text-white/90 mt-2">
            Think you know how much everyday items cost? Let's test your knowledge!
          </p>
        </CardHeader>
      </Card>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Item {currentItemIndex + 1} of {items.length}</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            {results.length} guessed
          </span>
        </div>
        <Progress value={((currentItemIndex + (hasGuessed ? 1 : 0)) / items.length) * 100} className="h-2" />
      </div>

      {/* Main Game Card */}
      <motion.div
        key={currentItemIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-purple-200">
          <CardContent className="p-6 space-y-6">
            {/* Item Display */}
            <div className="text-center space-y-4">
              <motion.div
                className="text-8xl"
                animate={{ 
                  scale: hasGuessed ? [1, 1.2, 1] : 1,
                  rotate: hasGuessed ? [0, 5, -5, 0] : 0
                }}
                transition={{ duration: 0.5 }}
              >
                {currentItem.image}
              </motion.div>
              <div>
                <h3 className="text-2xl font-semibold text-purple-900">{currentItem.name}</h3>
                <p className="text-sm text-purple-600 mt-1">How much does this cost in Canada?</p>
              </div>
            </div>

            {/* Input Area */}
            {!hasGuessed ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                  <Input
                    type="number"
                    placeholder="Enter your guess"
                    value={userGuess}
                    onChange={(e) => setUserGuess(e.target.value)}
                    className="text-lg"
                    step="0.01"
                    min="0"
                  />
                </div>
                <Button
                  onClick={handleSubmitGuess}
                  disabled={!userGuess || parseFloat(userGuess) <= 0}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                >
                  Submit Guess
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Result Display */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`text-center p-6 rounded-lg ${
                    currentResult && currentResult.accuracy >= 65 
                      ? 'bg-green-50 border-2 border-green-200' 
                      : 'bg-orange-50 border-2 border-orange-200'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {currentResult && currentResult.accuracy >= 65 ? (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    ) : (
                      <XCircle className="w-8 h-8 text-orange-600" />
                    )}
                    <h4 className={`text-xl font-semibold ${getAccuracyColor(currentResult?.accuracy || 0)}`}>
                      {currentResult && getAccuracyMessage(currentResult.accuracy)}
                    </h4>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Your Guess:</span>
                      <span className="font-semibold">${parseFloat(userGuess).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Actual Price:</span>
                      <span className="font-semibold text-green-600">${currentItem.actualPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Difference:</span>
                      <span className={`font-semibold ${getDifference() > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {getDifference() > 0 ? '+' : ''}${Math.abs(getDifference()).toFixed(2)} ({Math.abs((getDifference() / currentItem.actualPrice) * 100).toFixed(0)}%)
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Accuracy:</span>
                        <Badge className={`${
                          currentResult && currentResult.accuracy >= 85 
                            ? 'bg-green-100 text-green-800' 
                            : currentResult && currentResult.accuracy >= 65
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-orange-100 text-orange-800'
                        }`}>
                          {currentResult && Math.round(currentResult.accuracy)}%
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg text-left">
                    <p className="text-sm text-blue-900">
                      <strong>💡 Reality Check:</strong> Many people underestimate the cost of everyday items. 
                      {getDifference() < 0 
                        ? " You're aware that things cost money—great job!"
                        : " Things add up quickly, so budgeting is essential!"}
                    </p>
                  </div>
                </motion.div>

                <Button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                >
                  {isLastItem ? 'See Final Results' : 'Next Item'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Reality Check Message */}
      {!hasGuessed && (
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-purple-800">
                <p className="font-medium mb-1">💡 How Scoring Works</p>
                <p>Your accuracy is based on how close your guess is: Exact = 100%, 10% off = 90%, 25% off = 75%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
