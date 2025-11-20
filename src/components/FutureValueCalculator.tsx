import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';

export function FutureValueCalculator() {
  const [amount, setAmount] = useState(1000);
  const [years, setYears] = useState(5);
  const [selectedRate, setSelectedRate] = useState<'gic' | 'sp500' | 'savings'>('gic');

  const rates = {
    gic: 4.5,
    sp500: 10,
    savings: 0.5
  };

  const calculateFutureValue = (principal: number, rate: number, time: number) => {
    return principal * Math.pow(1 + rate / 100, time);
  };

  const generateChartData = () => {
    const data = [];
    for (let year = 0; year <= years; year++) {
      data.push({
        year,
        GIC: Math.round(calculateFutureValue(amount, rates.gic, year)),
        'S&P 500': Math.round(calculateFutureValue(amount, rates.sp500, year)),
        'Savings': Math.round(calculateFutureValue(amount, rates.savings, year))
      });
    }
    return data;
  };

  const chartData = generateChartData();
  const finalGIC = calculateFutureValue(amount, rates.gic, years);
  const finalSP500 = calculateFutureValue(amount, rates.sp500, years);
  const finalSavings = calculateFutureValue(amount, rates.savings, years);

  return (
    <div className="space-y-6">
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Future Value Calculator
          </CardTitle>
          <p className="text-sm text-gray-600">
            See how your money grows with different investment options
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Initial Investment
                </label>
                <Badge variant="outline">${amount.toLocaleString()}</Badge>
              </div>
              <Slider
                value={[amount]}
                onValueChange={([val]) => setAmount(val)}
                min={100}
                max={10000}
                step={100}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Time Horizon
                </label>
                <Badge variant="outline">{years} {years === 1 ? 'year' : 'years'}</Badge>
              </div>
              <Slider
                value={[years]}
                onValueChange={([val]) => setYears(val)}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Investment Type Selector */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedRate('savings')}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedRate === 'savings'
                  ? 'border-gray-500 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xs text-gray-600">Savings</div>
              <div className="font-semibold text-sm">0.5%</div>
            </button>
            <button
              onClick={() => setSelectedRate('gic')}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedRate === 'gic'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xs text-gray-600">GIC</div>
              <div className="font-semibold text-sm">4.5%</div>
            </button>
            <button
              onClick={() => setSelectedRate('sp500')}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedRate === 'sp500'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xs text-gray-600">S&P 500</div>
              <div className="font-semibold text-sm">~10%</div>
            </button>
          </div>

          {/* Chart */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="year" 
                  label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line 
                  type="monotone" 
                  dataKey="Savings" 
                  stroke="#6b7280" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="GIC" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="S&P 500" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Results */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-gray-300">
              <CardContent className="p-3 text-center">
                <div className="text-xs text-gray-600 mb-1">Savings</div>
                <div className="font-semibold text-sm">${finalSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                <div className="text-xs text-green-600">+${(finalSavings - amount).toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
              </CardContent>
            </Card>
            <Card className="border-blue-300 bg-blue-50/30">
              <CardContent className="p-3 text-center">
                <div className="text-xs text-gray-600 mb-1">GIC</div>
                <div className="font-semibold text-sm">${finalGIC.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                <div className="text-xs text-green-600">+${(finalGIC - amount).toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
              </CardContent>
            </Card>
            <Card className="border-green-300 bg-green-50/30">
              <CardContent className="p-3 text-center">
                <div className="text-xs text-gray-600 mb-1">S&P 500</div>
                <div className="font-semibold text-sm">${finalSP500.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                <div className="text-xs text-green-600">+${(finalSP500 - amount).toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-purple-100 border border-purple-300 rounded-lg p-3">
            <p className="text-sm text-purple-900">
              <strong>Key Insight:</strong> Over {years} years, investing ${amount.toLocaleString()} in the S&P 500 
              could earn you ${(finalSP500 - finalGIC).toLocaleString(undefined, {maximumFractionDigits: 0})} more than a GIC, 
              but with more risk. GICs are guaranteed, stocks can fluctuate!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
