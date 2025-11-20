import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, DollarSign } from 'lucide-react';

export function InterestComparisonChart() {
  const [principal, setPrincipal] = useState(5000);

  const calculateDebt = (amount: number, rate: number, months: number) => {
    const monthlyRate = rate / 100 / 12;
    return amount * Math.pow(1 + monthlyRate, months);
  };

  const generateData = () => {
    const data = [];
    for (let month = 0; month <= 36; month += 3) {
      data.push({
        month,
        'Credit Card (19.99%)': Math.round(calculateDebt(principal, 19.99, month)),
        'Line of Credit (6%)': Math.round(calculateDebt(principal, 6, month)),
        'OSAP (4%)': Math.round(calculateDebt(principal, 4, month))
      });
    }
    return data;
  };

  const chartData = generateData();
  const creditCardFinal = calculateDebt(principal, 19.99, 36);
  const locFinal = calculateDebt(principal, 6, 36);
  const osapFinal = calculateDebt(principal, 4, 36);

  return (
    <div className="space-y-6">
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Interest Rate Comparison
          </CardTitle>
          <p className="text-sm text-gray-600">
            See how different interest rates affect your debt over 3 years
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Principal Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-purple-600" />
                Amount Borrowed
              </label>
              <Badge variant="outline">${principal.toLocaleString()}</Badge>
            </div>
            <Slider
              value={[principal]}
              onValueChange={([val]) => setPrincipal(val)}
              min={1000}
              max={15000}
              step={500}
              className="w-full"
            />
          </div>

          {/* Chart */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  labelFormatter={(label) => `Month ${label}`}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line 
                  type="monotone" 
                  dataKey="OSAP (4%)" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Line of Credit (6%)" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Credit Card (19.99%)" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Results Comparison */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-900">OSAP (4%)</div>
                <div className="text-xs text-gray-600">Government student loan</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-700">${osapFinal.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                <div className="text-xs text-green-600">+${(osapFinal - principal).toLocaleString(undefined, {maximumFractionDigits: 0})} interest</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-900">Line of Credit (6%)</div>
                <div className="text-xs text-gray-600">Bank credit line</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-orange-700">${locFinal.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                <div className="text-xs text-orange-600">+${(locFinal - principal).toLocaleString(undefined, {maximumFractionDigits: 0})} interest</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-900">Credit Card (19.99%)</div>
                <div className="text-xs text-gray-600">High-interest consumer debt</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-red-700">${creditCardFinal.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                <div className="text-xs text-red-600">+${(creditCardFinal - principal).toLocaleString(undefined, {maximumFractionDigits: 0})} interest</div>
              </div>
            </div>
          </div>

          <div className="bg-red-100 border border-red-300 rounded-lg p-3">
            <p className="text-sm text-red-900">
              <strong>Shocking Difference:</strong> After 3 years, the credit card costs you 
              ${(creditCardFinal - osapFinal).toLocaleString(undefined, {maximumFractionDigits: 0})} more than OSAP! 
              This is why you should NEVER use credit cards for education expenses.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
