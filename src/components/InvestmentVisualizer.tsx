import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FutureValueCalculator } from './FutureValueCalculator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, DollarSign, Calendar, PiggyBank, Calculator } from 'lucide-react';

interface InvestmentVisualizerProps {
  onComplete: (points: number) => void;
}

export function InvestmentVisualizer({ onComplete }: InvestmentVisualizerProps) {
  const [selectedInvestment, setSelectedInvestment] = useState<string>('gic');
  const [selectedTimeframe, setSelectedTimeframe] = useState<1 | 3 | 5>(1);
  const [hasExplored, setHasExplored] = useState({
    gic: false,
    sp500: false,
    bonds: false,
  });

  const initialInvestment = 1000;

  // Calculate values for different investment types and timeframes
  const calculateGIC = (years: number) => {
    const rate = 0.045; // 4.5% GIC rate
    return initialInvestment * Math.pow(1 + rate, years);
  };

  const calculateSP500 = (years: number) => {
    const rate = 0.10; // ~10% historical average
    return initialInvestment * Math.pow(1 + rate, years);
  };

  const calculateBonds = (years: number) => {
    const rate = 0.04; // 4% bond rate
    return initialInvestment * Math.pow(1 + rate, years);
  };

  // Generate data for charts
  const generateChartData = (type: string) => {
    const data = [];
    const maxYears = selectedTimeframe;
    
    for (let year = 0; year <= maxYears; year++) {
      let value;
      if (type === 'gic') value = calculateGIC(year);
      else if (type === 'sp500') value = calculateSP500(year);
      else value = calculateBonds(year);
      
      data.push({
        year: `Year ${year}`,
        value: Math.round(value),
        invested: initialInvestment,
      });
    }
    
    return data;
  };

  // Comparison data
  const comparisonData = [
    {
      name: '1 Year',
      GIC: Math.round(calculateGIC(1)),
      'S&P 500': Math.round(calculateSP500(1)),
      Bonds: Math.round(calculateBonds(1)),
    },
    {
      name: '3 Years',
      GIC: Math.round(calculateGIC(3)),
      'S&P 500': Math.round(calculateSP500(3)),
      Bonds: Math.round(calculateBonds(3)),
    },
    {
      name: '5 Years',
      GIC: Math.round(calculateGIC(5)),
      'S&P 500': Math.round(calculateSP500(5)),
      Bonds: Math.round(calculateBonds(5)),
    },
  ];

  const handleExplore = (type: string) => {
    setSelectedInvestment(type);
    setHasExplored({ ...hasExplored, [type]: true });
  };

  const allExplored = hasExplored.gic && hasExplored.sp500 && hasExplored.bonds;
  const currentValue = 
    selectedInvestment === 'gic' ? calculateGIC(selectedTimeframe) :
    selectedInvestment === 'sp500' ? calculateSP500(selectedTimeframe) :
    calculateBonds(selectedTimeframe);

  const gain = currentValue - initialInvestment;
  const gainPercent = ((gain / initialInvestment) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Starting Investment</h3>
              <p className="text-2xl font-bold">${initialInvestment.toLocaleString()}</p>
            </div>
          </div>
          <p className="text-sm opacity-90">
            See how your money grows over time with different investment options!
          </p>
        </CardContent>
      </Card>

      {/* Investment Type Selector */}
      <div className="grid grid-cols-3 gap-3">
        <Button
          variant={selectedInvestment === 'gic' ? 'default' : 'outline'}
          onClick={() => handleExplore('gic')}
          className={`flex flex-col h-auto p-4 ${
            selectedInvestment === 'gic' 
              ? 'bg-blue-600 text-white' 
              : 'hover:border-blue-300'
          }`}
        >
          <PiggyBank className="w-6 h-6 mb-2" />
          <span className="text-xs">GIC</span>
          <span className="text-xs opacity-70">4.5%</span>
        </Button>
        <Button
          variant={selectedInvestment === 'sp500' ? 'default' : 'outline'}
          onClick={() => handleExplore('sp500')}
          className={`flex flex-col h-auto p-4 ${
            selectedInvestment === 'sp500' 
              ? 'bg-purple-600 text-white' 
              : 'hover:border-purple-300'
          }`}
        >
          <TrendingUp className="w-6 h-6 mb-2" />
          <span className="text-xs">S&P 500</span>
          <span className="text-xs opacity-70">~10%</span>
        </Button>
        <Button
          variant={selectedInvestment === 'bonds' ? 'default' : 'outline'}
          onClick={() => handleExplore('bonds')}
          className={`flex flex-col h-auto p-4 ${
            selectedInvestment === 'bonds' 
              ? 'bg-green-600 text-white' 
              : 'hover:border-green-300'
          }`}
        >
          <Calendar className="w-6 h-6 mb-2" />
          <span className="text-xs">Bonds</span>
          <span className="text-xs opacity-70">4%</span>
        </Button>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2">
        {[1, 3, 5].map((years) => (
          <Button
            key={years}
            variant={selectedTimeframe === years ? 'default' : 'outline'}
            onClick={() => setSelectedTimeframe(years as 1 | 3 | 5)}
            className="flex-1"
          >
            {years} Year{years > 1 ? 's' : ''}
          </Button>
        ))}
      </div>

      {/* Current Growth Display */}
      <Card className="border-2 border-purple-200 bg-purple-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-600">After {selectedTimeframe} year{selectedTimeframe > 1 ? 's' : ''}</p>
              <p className="text-3xl font-bold text-purple-900">
                ${Math.round(currentValue).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Gain</p>
              <p className="text-xl font-semibold text-green-600">
                +${Math.round(gain).toLocaleString()}
              </p>
              <p className="text-sm text-green-600">+{gainPercent}%</p>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500"
              style={{ width: `${(currentValue / (initialInvestment * 2)) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Growth Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={generateChartData(selectedInvestment)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="invested" 
                stroke="#94a3b8" 
                strokeDasharray="5 5"
                name="Initial Investment"
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                name="Total Value"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Compare All Options</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Bar dataKey="GIC" fill="#3b82f6" />
              <Bar dataKey="S&P 500" fill="#8b5cf6" />
              <Bar dataKey="Bonds" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Investment Explanations */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-900 mb-2">
            {selectedInvestment === 'gic' && '🏦 Guaranteed Investment Certificate (GIC)'}
            {selectedInvestment === 'sp500' && '📈 S&P 500 Index Fund'}
            {selectedInvestment === 'bonds' && '📊 Government Bonds'}
          </h4>
          <p className="text-sm text-blue-800">
            {selectedInvestment === 'gic' && 
              'A GIC is a safe investment where you lend money to a bank for a fixed period at a guaranteed interest rate. Your money is protected, but grows slower than stocks.'}
            {selectedInvestment === 'sp500' && 
              'The S&P 500 tracks 500 large US companies. Historically returns ~10% annually, but can go up or down in the short term. Best for long-term growth.'}
            {selectedInvestment === 'bonds' && 
              'Bonds are loans to governments or companies that pay regular interest. Safer than stocks but lower returns. Good for steady, predictable income.'}
          </p>
        </CardContent>
      </Card>

      {/* Exploration Progress */}
      {!allExplored && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800">
              💡 Explore all three investment types to earn full points!
            </p>
            <div className="flex gap-2 mt-2">
              <Badge variant={hasExplored.gic ? 'default' : 'outline'} className="text-xs">
                {hasExplored.gic ? '✓' : '○'} GIC
              </Badge>
              <Badge variant={hasExplored.sp500 ? 'default' : 'outline'} className="text-xs">
                {hasExplored.sp500 ? '✓' : '○'} S&P 500
              </Badge>
              <Badge variant={hasExplored.bonds ? 'default' : 'outline'} className="text-xs">
                {hasExplored.bonds ? '✓' : '○'} Bonds
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Complete Button */}
      <Button
        onClick={() => onComplete(allExplored ? 150 : 100)}
        disabled={!allExplored}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
        size="lg"
      >
        {allExplored ? 'Complete & Earn 150 Points' : 'Explore All Options First'}
      </Button>
    </div>
  );
}