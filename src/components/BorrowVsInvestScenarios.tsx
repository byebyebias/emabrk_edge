import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { User, CheckCircle, XCircle, Lightbulb, TrendingUp, CreditCard } from 'lucide-react';

interface Scenario {
  id: string;
  persona: {
    name: string;
    age: number;
    situation: string;
    avatar: string;
  };
  dilemma: string;
  options: {
    choice: string;
    outcome: string;
    isOptimal: boolean;
  }[];
  correctChoice: string;
  explanation: string;
  points: number;
}

const scenarios: Scenario[] = [
  {
    id: 'scenario-1',
    persona: {
      name: 'Alex',
      age: 18,
      situation: 'Starting university in the fall',
      avatar: '🎓',
    },
    dilemma: 'Alex has $3,000 saved from part-time work. Tuition and books cost $8,000. Should Alex borrow through OSAP or use credit cards?',
    options: [
      {
        choice: 'Apply for OSAP student loans',
        outcome: 'OSAP offers low interest (prime rate) and no payments until 6 months after graduation. Alex qualifies for $8,000.',
        isOptimal: true,
      },
      {
        choice: 'Put it all on credit cards',
        outcome: 'Credit cards charge 19.99% interest immediately. Alex would owe $9,600 in just one year on the $5,000 borrowed.',
        isOptimal: false,
      },
      {
        choice: 'Skip university and work instead',
        outcome: 'Alex misses education opportunities. Entry-level jobs pay less long-term than university graduates.',
        isOptimal: false,
      },
      {
        choice: 'Ask family to cover everything',
        outcome: 'Not everyone has this option. Also misses learning financial responsibility.',
        isOptimal: false,
      },
    ],
    correctChoice: 'Apply for OSAP student loans',
    explanation: 'OSAP is designed for students with low interest rates, no payments during school, and grants that don\'t need to be repaid. It\'s the smart borrowing choice for education.',
    points: 50,
  },
  {
    id: 'scenario-2',
    persona: {
      name: 'Jordan',
      age: 17,
      situation: 'Working part-time, saving $200/month',
      avatar: '💼',
    },
    dilemma: 'Jordan wants the new iPhone ($1,200). They can save for 6 months or finance it at $50/month for 24 months. What should Jordan do?',
    options: [
      {
        choice: 'Save for 6 months, then buy',
        outcome: 'Jordan pays $1,200 total. Learns delayed gratification and avoids debt. Phone is fully theirs.',
        isOptimal: true,
      },
      {
        choice: 'Finance for 24 months at $50/month',
        outcome: 'Jordan pays $1,200 total ($50 × 24), but if they miss a payment (19.99% interest), it gets expensive fast.',
        isOptimal: false,
      },
      {
        choice: 'Buy a cheaper phone now ($400)',
        outcome: 'Jordan saves $800, which could be invested. Cheaper phone works just as well for basic needs.',
        isOptimal: true,
      },
      {
        choice: 'Put it on a credit card',
        outcome: 'With 19.99% interest, the $1,200 phone costs $1,440+ if not paid off quickly. Bad debt for a depreciating item.',
        isOptimal: false,
      },
    ],
    correctChoice: 'Save for 6 months, then buy',
    explanation: 'For consumer goods that lose value, saving first is best. You avoid interest charges and debt. The cheaper phone is also a smart choice if the savings are invested!',
    points: 50,
  },
  {
    id: 'scenario-3',
    persona: {
      name: 'Taylor',
      age: 19,
      situation: 'Just received $5,000 inheritance',
      avatar: '💰',
    },
    dilemma: 'Taylor has $2,000 in credit card debt at 19.99% interest and $5,000 cash. Should they invest in the stock market or pay off the debt first?',
    options: [
      {
        choice: 'Pay off credit card debt first',
        outcome: 'Saves $400/year in interest (19.99% of $2,000). Then invests remaining $3,000 guilt-free with no debt.',
        isOptimal: true,
      },
      {
        choice: 'Invest all $5,000 in stocks',
        outcome: 'Stock market averages 10% ($500/year) but credit card costs 19.99% ($400/year). Net: only $100 ahead, plus stress of debt.',
        isOptimal: false,
      },
      {
        choice: 'Pay minimum on debt, invest the rest',
        outcome: 'Credit card debt grows. Interest compounds against Taylor. Investments can\'t keep up with 19.99% debt.',
        isOptimal: false,
      },
      {
        choice: 'Spend it all on a trip',
        outcome: 'Taylor has great memories but still owes $2,000 + interest. Debt doesn\'t go away.',
        isOptimal: false,
      },
    ],
    correctChoice: 'Pay off credit card debt first',
    explanation: 'Always pay off high-interest debt before investing. You can\'t reliably earn 19.99% in the market, so paying off the debt is a guaranteed "return" on your money.',
    points: 75,
  },
  {
    id: 'scenario-4',
    persona: {
      name: 'Morgan',
      age: 18,
      situation: 'First year of college, living at home',
      avatar: '🏠',
    },
    dilemma: 'Morgan has $1,000. Tuition is covered by OSAP. Should Morgan invest the money or keep it as emergency savings?',
    options: [
      {
        choice: 'Keep $500 emergency fund, invest $500',
        outcome: 'Morgan has safety net for unexpected costs (car repair, broken laptop) AND starts building wealth early.',
        isOptimal: true,
      },
      {
        choice: 'Invest all $1,000',
        outcome: 'Great returns, but one emergency and Morgan might need to sell investments at a loss or use credit cards.',
        isOptimal: false,
      },
      {
        choice: 'Keep all $1,000 in savings',
        outcome: 'Safe, but inflation (3%/year) means it loses buying power. Misses growth opportunity.',
        isOptimal: false,
      },
      {
        choice: 'Lend it to friends',
        outcome: 'Risky! Friends might not pay back. Money isn\'t growing, and relationships can get awkward.',
        isOptimal: false,
      },
    ],
    correctChoice: 'Keep $500 emergency fund, invest $500',
    explanation: 'Financial experts recommend having an emergency fund BEFORE investing. As a student, $500-$1,000 covers most emergencies. The rest can grow through investing.',
    points: 60,
  },
];

interface BorrowVsInvestScenariosProps {
  onComplete: (points: number) => void;
}

export function BorrowVsInvestScenarios({ onComplete }: BorrowVsInvestScenariosProps) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const currentScenario = scenarios[currentScenarioIndex];
  const isLastScenario = currentScenarioIndex === scenarios.length - 1;

  const handleSelectChoice = (choice: string) => {
    setSelectedChoice(choice);
  };

  const handleSubmit = () => {
    if (!selectedChoice) return;
    
    setShowResult(true);
    if (selectedChoice === currentScenario.correctChoice) {
      setTotalPoints(prev => prev + currentScenario.points);
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastScenario) {
      onComplete(totalPoints);
    } else {
      setCurrentScenarioIndex(prev => prev + 1);
      setSelectedChoice(null);
      setShowResult(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <Badge variant="outline">
          Scenario {currentScenarioIndex + 1} of {scenarios.length}
        </Badge>
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500">
            {totalPoints} points
          </Badge>
        </div>
      </div>

      {/* Persona Card */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="text-5xl">{currentScenario.persona.avatar}</div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1">{currentScenario.persona.name}</h3>
              <p className="text-sm opacity-90 mb-1">Age: {currentScenario.persona.age}</p>
              <p className="text-sm opacity-90">{currentScenario.persona.situation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dilemma */}
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-purple-600" />
            The Dilemma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{currentScenario.dilemma}</p>
        </CardContent>
      </Card>

      {/* Options */}
      <div className="space-y-3">
        <p className="font-medium text-gray-700">What should {currentScenario.persona.name} do?</p>
        {currentScenario.options.map((option, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: !showResult ? 1.02 : 1 }}
            whileTap={{ scale: !showResult ? 0.98 : 1 }}
          >
            <Button
              variant={selectedChoice === option.choice ? 'default' : 'outline'}
              className={`w-full p-4 h-auto text-left justify-start transition-all ${
                !showResult && selectedChoice === option.choice
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0'
                  : ''
              } ${
                showResult
                  ? option.choice === currentScenario.correctChoice
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : selectedChoice === option.choice
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : 'opacity-50'
                  : ''
              }`}
              onClick={() => !showResult && handleSelectChoice(option.choice)}
              disabled={showResult}
            >
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium mb-1">{option.choice}</p>
                    {showResult && (
                      <p className="text-sm opacity-90 mt-2">{option.outcome}</p>
                    )}
                  </div>
                  {showResult && option.choice === currentScenario.correctChoice && (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  )}
                  {showResult && selectedChoice === option.choice && option.choice !== currentScenario.correctChoice && (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Explanation */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={selectedChoice === currentScenario.correctChoice ? 'border-green-500 bg-green-50' : 'border-blue-500 bg-blue-50'}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                Why This Matters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">{currentScenario.explanation}</p>
              {selectedChoice === currentScenario.correctChoice && (
                <div className="flex items-center gap-2 text-green-700 bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">+{currentScenario.points} points earned!</span>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Action Button */}
      <Button
        onClick={showResult ? handleNext : handleSubmit}
        disabled={!selectedChoice}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
        size="lg"
      >
        {showResult 
          ? isLastScenario 
            ? `Complete & Earn ${totalPoints} Points` 
            : 'Next Scenario'
          : 'Submit Answer'
        }
      </Button>
    </div>
  );
}
