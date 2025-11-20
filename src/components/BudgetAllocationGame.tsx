import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { 
  Wallet, 
  ShoppingBag, 
  Phone, 
  Wifi, 
  Bus, 
  Popcorn, 
  Heart,
  DollarSign,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface BudgetCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  targetAmount: number;
  description: string;
}

interface BudgetAllocationGameProps {
  onComplete: (score: number) => void;
}

const categories: BudgetCategory[] = [
  {
    id: 'food',
    name: 'Food & Groceries',
    icon: <ShoppingBag className="w-5 h-5" />,
    targetAmount: 375,
    description: 'Groceries, eating out'
  },
  {
    id: 'phone',
    name: 'Phone Bill',
    icon: <Phone className="w-5 h-5" />,
    targetAmount: 45,
    description: 'Monthly plan'
  },
  {
    id: 'internet',
    name: 'Internet',
    icon: <Wifi className="w-5 h-5" />,
    targetAmount: 75,
    description: 'Home internet'
  },
  {
    id: 'transportation',
    name: 'Transportation',
    icon: <Bus className="w-5 h-5" />,
    targetAmount: 120,
    description: 'Gas, transit'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: <Popcorn className="w-5 h-5" />,
    targetAmount: 70,
    description: 'Movies, streaming'
  },
  {
    id: 'personal',
    name: 'Personal Care',
    icon: <Heart className="w-5 h-5" />,
    targetAmount: 50,
    description: 'Hygiene, haircuts'
  },
  {
    id: 'clothing',
    name: 'Clothing',
    icon: <ShoppingBag className="w-5 h-5" />,
    targetAmount: 65,
    description: 'Clothes, shoes'
  },
  {
    id: 'savings',
    name: 'Savings',
    icon: <Target className="w-5 h-5" />,
    targetAmount: 200,
    description: 'Emergency fund, goals'
  }
];

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1', '#14b8a6'];

const TOTAL_BUDGET = 1000;

export function BudgetAllocationGame({ onComplete }: BudgetAllocationGameProps) {
  const [allocations, setAllocations] = useState<{ [key: string]: string }>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [results, setResults] = useState<{ [key: string]: { accuracy: number; difference: number } }>({});

  const getTotalAllocated = () => {
    return Object.values(allocations).reduce((sum, val) => {
      const num = parseFloat(val);
      return sum + (isNaN(num) ? 0 : num);
    }, 0);
  };

  const handleAllocationChange = (categoryId: string, value: string) => {
    setAllocations(prev => ({ ...prev, [categoryId]: value }));
  };

  const calculateAccuracy = (allocated: number, target: number) => {
    const difference = Math.abs(allocated - target);
    const percentDiff = (difference / target) * 100;
    
    // 100% if exact, more forgiving scoring for budget allocation
    // e.g., 10% off = 92% accuracy, 20% off = 84% accuracy, 50% off = 60% accuracy
    return Math.max(0, 100 - (percentDiff * 0.8));
  };

  const handleSubmit = () => {
    const newResults: { [key: string]: { accuracy: number; difference: number } } = {};
    
    categories.forEach(category => {
      const allocated = parseFloat(allocations[category.id] || '0');
      const accuracy = calculateAccuracy(allocated, category.targetAmount);
      const difference = allocated - category.targetAmount;
      
      newResults[category.id] = { accuracy, difference };
    });

    setResults(newResults);
    setHasSubmitted(true);

    // Calculate overall score
    const totalAccuracy = Object.values(newResults).reduce((sum, r) => sum + r.accuracy, 0);
    const avgAccuracy = totalAccuracy / categories.length;
    const finalScore = Math.round((avgAccuracy / 100) * 125); // Out of 125 points
    
    // Bonus points for staying within budget
    const totalAllocated = getTotalAllocated();
    const budgetBonus = totalAllocated <= TOTAL_BUDGET ? 25 : 0;
    
    onComplete(finalScore + budgetBonus);
  };

  const totalAllocated = getTotalAllocated();
  const remaining = TOTAL_BUDGET - totalAllocated;
  const isOverBudget = totalAllocated > TOTAL_BUDGET;
  const allFilled = categories.every(c => allocations[c.id] && parseFloat(allocations[c.id]) > 0);

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 85) return 'bg-green-100 text-green-800 border-green-300';
    if (accuracy >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  // Prepare pie chart data
  const getPieChartData = () => {
    return categories.map((category, index) => ({
      name: category.name,
      value: parseFloat(allocations[category.id] || '0'),
      color: COLORS[index]
    })).filter(item => item.value > 0);
  };

  const getOverallScore = () => {
    const totalAccuracy = Object.values(results).reduce((sum, r) => sum + r.accuracy, 0);
    return Math.round(totalAccuracy / categories.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-6 h-6" />
            Budget Allocation Challenge
          </CardTitle>
          <p className="text-sm text-white/90 mt-2">
            You have $1,000/month to budget. Allocate money across different categories!
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <div>
              <p className="text-sm opacity-90">Monthly Budget</p>
              <p className="text-2xl font-semibold">${TOTAL_BUDGET.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Remaining</p>
              <p className={`text-2xl font-semibold ${isOverBudget ? 'text-red-300' : 'text-green-300'}`}>
                ${Math.abs(remaining).toLocaleString()}
                {isOverBudget && ' over'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Budget Used</span>
          <span className={isOverBudget ? 'text-red-600 font-semibold' : ''}>
            ${totalAllocated.toLocaleString()} / ${TOTAL_BUDGET.toLocaleString()}
          </span>
        </div>
        <Progress 
          value={(totalAllocated / TOTAL_BUDGET) * 100} 
          className={`h-3 ${isOverBudget ? 'bg-red-100' : ''}`}
        />
        {isOverBudget && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            You're over budget! Adjust your allocations.
          </p>
        )}
      </div>

      {/* Pie Chart Visualization */}
      {!hasSubmitted && totalAllocated > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Live Budget Breakdown
              </CardTitle>
              <p className="text-sm text-purple-600">Watch your budget allocate in real-time!</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={getPieChartData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name.split(' ')[0]}: $${value} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={500}
                  >
                    {getPieChartData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`$${value}`, 'Amount']}
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 pt-4 border-t border-purple-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-purple-700 font-medium">Total Allocated:</span>
                  <span className={`font-semibold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                    ${totalAllocated.toFixed(0)} / $1,000
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Category Inputs */}
      {!hasSubmitted ? (
        <div className="space-y-4">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: categories.indexOf(category) * 0.05 }}
            >
              <Card className="border-purple-200 hover:border-purple-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-purple-900">{category.name}</h4>
                      <p className="text-xs text-purple-600">{category.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-purple-600" />
                      <Input
                        type="number"
                        placeholder="0"
                        value={allocations[category.id] || ''}
                        onChange={(e) => handleAllocationChange(category.id, e.target.value)}
                        className="w-24 text-right"
                        step="1"
                        min="0"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <Button
            onClick={handleSubmit}
            disabled={!allFilled || isOverBudget}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            {!allFilled ? 'Fill All Categories' : isOverBudget ? 'Over Budget!' : 'Submit Budget'}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Overall Score */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <Card className={`border-2 ${getAccuracyColor(getOverallScore())}`}>
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-current" />
                <h3 className="text-2xl font-semibold mb-2">
                  {getOverallScore()}% Accuracy
                </h3>
                <p className="text-sm">
                  {getOverallScore() >= 85 
                    ? "Excellent budgeting skills! You understand Canadian living costs well! 🎉"
                    : getOverallScore() >= 70
                      ? "Good job! You're close to realistic budgeting! 👍"
                      : "Keep learning! Living costs can be surprising. 💡"}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Comparison Visualization */}
          <Card className="bg-white border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg">Your Budget vs Average Canadian Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Your Budget */}
                <div>
                  <p className="text-center font-medium text-purple-900 mb-2">Your Budget</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={getPieChartData()}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      >
                        {getPieChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `$${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Average Canadian Budget */}
                <div>
                  <p className="text-center font-medium text-green-700 mb-2">Average Canadian</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={categories.map((cat, idx) => ({
                          name: cat.name,
                          value: cat.targetAmount,
                          color: COLORS[idx]
                        }))}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      >
                        {categories.map((_, index) => (
                          <Cell key={`cell-avg-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `$${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Results Table */}
          <Card className="bg-white border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg">Detailed Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category, index) => {
                  const result = results[category.id];
                  const allocated = parseFloat(allocations[category.id] || '0');
                  
                  return (
                    <div key={category.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                        <span className="font-medium text-sm">{category.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-purple-900">You: ${allocated.toFixed(0)}</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-green-700">Avg: ${category.targetAmount}</span>
                        <Badge className={getAccuracyColor(result.accuracy)} variant="outline">
                          {Math.round(result.accuracy)}%
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Actual Canadian Budget Summary */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Average Canadian Monthly Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-blue-900 space-y-2">
                <p className="mb-3">Here's how the average Canadian allocates their $1,000 monthly budget (excluding housing):</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between p-2 bg-white/60 rounded">
                    <span>🛒 Food & Groceries:</span>
                    <strong>$375</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-white/60 rounded">
                    <span>🚗 Transportation:</span>
                    <strong>$120</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-white/60 rounded">
                    <span>📱 Internet:</span>
                    <strong>$75</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-white/60 rounded">
                    <span>🎬 Entertainment:</span>
                    <strong>$70</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-white/60 rounded">
                    <span>👔 Clothing:</span>
                    <strong>$65</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-white/60 rounded">
                    <span>💅 Personal Care:</span>
                    <strong>$50</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-white/60 rounded">
                    <span>📞 Phone Bill:</span>
                    <strong>$45</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-white/60 rounded">
                    <span>💰 Savings:</span>
                    <strong>$200</strong>
                  </div>
                </div>
                <p className="mt-3 italic text-xs">Understanding real costs helps you budget better and avoid surprises!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tips Card */}
      {!hasSubmitted && (
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-purple-800">
                <p className="font-medium mb-1">💡 How Scoring Works</p>
                <p>Your accuracy is based on how close you are to average Canadian costs: Exact = 100%, 10% off = 92%, 25% off = 80%. Stay within budget for bonus points!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
