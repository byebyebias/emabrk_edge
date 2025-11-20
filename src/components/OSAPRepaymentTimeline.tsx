import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Calendar, Clock, DollarSign, GraduationCap } from 'lucide-react';

export function OSAPRepaymentTimeline() {
  const [loanAmount, setLoanAmount] = useState(20000);

  // Calculate monthly payment (assuming 10 year repayment, 4% interest)
  const interestRate = 0.04;
  const months = 120; // 10 years
  const monthlyRate = interestRate / 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  const generateTimelineData = () => {
    const timeline = [];
    
    // In School (4 years)
    for (let i = 1; i <= 4; i++) {
      timeline.push({
        period: `Year ${i}`,
        phase: 'In School',
        payment: 0,
        interest: 0,
        principal: 0,
        balance: loanAmount,
        color: '#8b5cf6'
      });
    }

    // Grace Period (6 months = 0.5 year)
    timeline.push({
      period: 'Grace',
      phase: 'Grace Period',
      payment: 0,
      interest: 0,
      principal: 0,
      balance: loanAmount,
      color: '#fbbf24'
    });

    // Repayment (showing first 5 years)
    let remainingBalance = loanAmount;
    for (let year = 1; year <= 5; year++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;

      for (let month = 0; month < 12; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        
        yearlyInterest += interestPayment;
        yearlyPrincipal += principalPayment;
        remainingBalance -= principalPayment;
      }

      timeline.push({
        period: `Year ${year}`,
        phase: 'Repayment',
        payment: monthlyPayment * 12,
        interest: yearlyInterest,
        principal: yearlyPrincipal,
        balance: Math.max(0, remainingBalance),
        color: '#10b981'
      });
    }

    return timeline;
  };

  const timelineData = generateTimelineData();
  const totalInterest = timelineData
    .filter(d => d.phase === 'Repayment')
    .reduce((sum, d) => sum + d.interest, 0);

  return (
    <div className="space-y-6">
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            OSAP Repayment Timeline
          </CardTitle>
          <p className="text-sm text-gray-600">
            See how your OSAP loan works from school to repayment
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Loan Amount Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-purple-600" />
                Total OSAP Loan
              </label>
              <Badge variant="outline">${loanAmount.toLocaleString()}</Badge>
            </div>
            <Slider
              value={[loanAmount]}
              onValueChange={([val]) => setLoanAmount(val)}
              min={5000}
              max={40000}
              step={1000}
              className="w-full"
            />
          </div>

          {/* Timeline Phases */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <GraduationCap className="w-5 h-5 mx-auto mb-1 text-purple-600" />
              <div className="text-xs font-medium text-purple-900">In School</div>
              <div className="text-xs text-purple-700">No payments</div>
              <div className="text-xs text-purple-700">No interest</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
              <Clock className="w-5 h-5 mx-auto mb-1 text-yellow-600" />
              <div className="text-xs font-medium text-yellow-900">Grace Period</div>
              <div className="text-xs text-yellow-700">6 months</div>
              <div className="text-xs text-yellow-700">No payments</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <DollarSign className="w-5 h-5 mx-auto mb-1 text-green-600" />
              <div className="text-xs font-medium text-green-900">Repayment</div>
              <div className="text-xs text-green-700">~${monthlyPayment.toFixed(0)}/mo</div>
              <div className="text-xs text-green-700">10 years</div>
            </div>
          </div>

          {/* Timeline Chart */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="period" 
                  tick={{ fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) => `$${value.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                  contentStyle={{ fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="interest" stackId="a" fill="#f59e0b" name="Interest">
                  {timelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.interest > 0 ? '#f59e0b' : '#e5e7eb'} />
                  ))}
                </Bar>
                <Bar dataKey="principal" stackId="a" fill="#10b981" name="Principal">
                  {timelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.principal > 0 ? '#10b981' : '#e5e7eb'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-green-300 bg-green-50/50">
              <CardContent className="p-3">
                <div className="text-xs text-gray-600 mb-1">Monthly Payment</div>
                <div className="text-xl font-semibold text-green-700">${monthlyPayment.toFixed(0)}</div>
                <div className="text-xs text-gray-600">for 10 years</div>
              </CardContent>
            </Card>
            <Card className="border-orange-300 bg-orange-50/50">
              <CardContent className="p-3">
                <div className="text-xs text-gray-600 mb-1">Total Interest (10yr)</div>
                <div className="text-xl font-semibold text-orange-700">${(monthlyPayment * months - loanAmount).toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                <div className="text-xs text-gray-600">over loan lifetime</div>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights */}
          <div className="space-y-2">
            <div className="bg-purple-100 border border-purple-300 rounded-lg p-3">
              <p className="text-sm text-purple-900">
                <strong>No Interest While in School:</strong> Unlike credit cards, OSAP doesn't charge interest 
                while you're a full-time student. Your ${loanAmount.toLocaleString()} stays at ${loanAmount.toLocaleString()}!
              </p>
            </div>
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
              <p className="text-sm text-yellow-900">
                <strong>6-Month Grace Period:</strong> After graduation, you get 6 months before payments start. 
                Use this time to find a job and set up your budget!
              </p>
            </div>
            <div className="bg-green-100 border border-green-300 rounded-lg p-3">
              <p className="text-sm text-green-900">
                <strong>Income-Based Repayment:</strong> Can't afford ${monthlyPayment.toFixed(0)}/month? 
                OSAP's RAP (Repayment Assistance Plan) adjusts payments based on your income!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
