import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { DollarSign, GraduationCap, Gift, CreditCard } from 'lucide-react';

interface ProgramCost {
  name: string;
  tuition: number;
}

export function OSAPCostsBreakdown() {
  const programs: ProgramCost[] = [
    { name: 'Arts', tuition: 6500 },
    { name: 'Science', tuition: 7500 },
    { name: 'Engineering', tuition: 15000 },
    { name: 'Business', tuition: 13000 },
    { name: 'Nursing', tuition: 8500 }
  ];

  const [selectedProgram, setSelectedProgram] = useState(programs[0]);
  const [familyIncome, setFamilyIncome] = useState(50000);

  // Calculate OSAP based on income and tuition
  const calculateOSAP = () => {
    const totalCost = selectedProgram.tuition + 15000; // tuition + living expenses
    
    // Grant calculation (simplified - more grants for lower income)
    let grant = 0;
    if (familyIncome < 50000) {
      grant = Math.min(7200, totalCost * 0.4); // Up to 40% as grants
    } else if (familyIncome < 100000) {
      grant = Math.min(5000, totalCost * 0.25); // Up to 25% as grants
    } else {
      grant = Math.min(2000, totalCost * 0.1); // Up to 10% as grants
    }

    // Loan calculation (covers remaining cost up to limit)
    const maxLoan = 18000; // per year
    const loan = Math.min(maxLoan, Math.max(0, totalCost - grant - (familyIncome > 80000 ? 5000 : 0)));

    return {
      totalCost,
      grant: Math.round(grant),
      loan: Math.round(loan),
      outOfPocket: Math.round(Math.max(0, totalCost - grant - loan))
    };
  };

  const osapData = calculateOSAP();

  const chartData = [
    {
      category: 'Funding Sources',
      'OSAP Grants': osapData.grant,
      'OSAP Loans': osapData.loan,
      'Out of Pocket': osapData.outOfPocket
    }
  ];

  const costBreakdown = [
    {
      category: 'Cost Breakdown',
      'Tuition': selectedProgram.tuition,
      'Living Expenses': 15000
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-600" />
            OSAP Funding Breakdown
          </CardTitle>
          <p className="text-sm text-gray-600">
            See how much OSAP you might receive based on program and family income
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Program Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">Select Program</label>
            <div className="grid grid-cols-2 gap-2">
              {programs.map((program) => (
                <button
                  key={program.name}
                  onClick={() => setSelectedProgram(program)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedProgram.name === program.name
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-sm font-medium">{program.name}</div>
                  <div className="text-xs text-gray-600">${program.tuition.toLocaleString()}/year</div>
                </button>
              ))}
            </div>
          </div>

          {/* Family Income Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                Family Income
              </label>
              <Badge variant="outline">${familyIncome.toLocaleString()}</Badge>
            </div>
            <Slider
              value={[familyIncome]}
              onValueChange={([val]) => setFamilyIncome(val)}
              min={20000}
              max={150000}
              step={5000}
              className="w-full"
            />
          </div>

          {/* Cost Breakdown Chart */}
          <div>
            <h4 className="text-sm font-medium mb-2">Annual Education Costs</h4>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4">
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={costBreakdown} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="category" tick={{ fontSize: 12 }} width={100} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="Tuition" fill="#8b5cf6" />
                  <Bar dataKey="Living Expenses" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Funding Sources Chart */}
          <div>
            <h4 className="text-sm font-medium mb-2">How It's Funded</h4>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4">
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="category" tick={{ fontSize: 12 }} width={110} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="OSAP Grants" stackId="a" fill="#10b981" />
                  <Bar dataKey="OSAP Loans" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="Out of Pocket" stackId="a" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-green-300 bg-green-50/50">
              <CardContent className="p-3 text-center">
                <Gift className="w-4 h-4 mx-auto mb-1 text-green-600" />
                <div className="text-xs text-gray-600 mb-1">Grants (Free!)</div>
                <div className="text-lg font-semibold text-green-700">${osapData.grant.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card className="border-blue-300 bg-blue-50/50">
              <CardContent className="p-3 text-center">
                <CreditCard className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                <div className="text-xs text-gray-600 mb-1">Loans (Repay)</div>
                <div className="text-lg font-semibold text-blue-700">${osapData.loan.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card className="border-orange-300 bg-orange-50/50">
              <CardContent className="p-3 text-center">
                <DollarSign className="w-4 h-4 mx-auto mb-1 text-orange-600" />
                <div className="text-xs text-gray-600 mb-1">Your Cost</div>
                <div className="text-lg font-semibold text-orange-700">${osapData.outOfPocket.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights */}
          <div className="space-y-2">
            <div className="bg-green-100 border border-green-300 rounded-lg p-3">
              <p className="text-sm text-green-900">
                <strong>Free Money!</strong> ${osapData.grant.toLocaleString()} in grants never needs to be repaid. 
                This is why OSAP is so valuable!
              </p>
            </div>
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                <strong>Total Education Cost:</strong> ${osapData.totalCost.toLocaleString()} per year 
                (${selectedProgram.tuition.toLocaleString()} tuition + $15,000 living expenses)
              </p>
            </div>
            {osapData.outOfPocket > 0 && (
              <div className="bg-orange-100 border border-orange-300 rounded-lg p-3">
                <p className="text-sm text-orange-900">
                  <strong>Gap to Fill:</strong> You'll need ${osapData.outOfPocket.toLocaleString()} from 
                  savings, family support, or part-time work.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
