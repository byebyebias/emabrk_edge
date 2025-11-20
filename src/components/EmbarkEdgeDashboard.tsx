import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  PiggyBank, 
  Target, 
  TrendingUp, 
  School, 
  Plus,
  User,
  Users,
  Calendar,
  Edit
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EmbarkEdgeDashboardProps {
  userPoints: number;
  onPointsSpent: (points: number) => void;
}

interface Contribution {
  id: number;
  amount: number;
  date: string;
  source: 'parent' | 'student';
  description: string;
}

interface Program {
  id: number;
  university: string;
  program: string;
  cost: number;
  duration: string;
}

export function EmbarkEdgeDashboard({ userPoints, onPointsSpent }: EmbarkEdgeDashboardProps) {
  // RESP Account State
  const [currentSavings, setCurrentSavings] = useState(8750);
  const [savingsGoal, setSavingsGoal] = useState(25000);
  
  // Selected Program State
  const [selectedProgramId, setSelectedProgramId] = useState(1);
  
  // Form States
  const [contributionAmount, setContributionAmount] = useState('');
  const [contributionSource, setContributionSource] = useState<'parent' | 'student'>('student');
  const [showContributeForm, setShowContributeForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [showProgramSelector, setShowProgramSelector] = useState(false);

  // Contribution History
  const [contributions, setContributions] = useState<Contribution[]>([
    { id: 1, amount: 320, date: '2024-01-15', source: 'student', description: 'Part-time job earnings' },
    { id: 2, amount: 500, date: '2024-01-12', source: 'parent', description: 'Monthly contribution' },
    { id: 3, amount: 60, date: '2024-01-10', source: 'student', description: 'Babysitting money' },
    { id: 4, amount: 100, date: '2024-01-05', source: 'parent', description: 'Birthday gift from grandparents' },
  ]);

  // Available Programs
  const programs: Program[] = [
    { id: 1, university: 'University of Toronto', program: 'Computer Science', cost: 58000, duration: '4 years' },
    { id: 2, university: 'University of British Columbia', program: 'Business Administration', cost: 42000, duration: '4 years' },
    { id: 3, university: 'McGill University', program: 'Engineering', cost: 48000, duration: '4 years' },
    { id: 4, university: 'Sheridan College', program: 'Graphic Design', cost: 28000, duration: '3 years' },
    { id: 5, university: 'University of Waterloo', program: 'Software Engineering', cost: 54000, duration: '4 years' },
    { id: 6, university: 'York University', program: 'Business Management', cost: 38000, duration: '4 years' },
    { id: 7, university: 'Ryerson University', program: 'Media Production', cost: 35000, duration: '4 years' },
    { id: 8, university: 'Western University', program: 'Medical Sciences', cost: 52000, duration: '4 years' },
  ];

  const selectedProgram = programs.find(p => p.id === selectedProgramId) || programs[0];
  const savingsProgress = (currentSavings / savingsGoal) * 100;
  const programProgress = (currentSavings / selectedProgram.cost) * 100;

  // Calculate contribution stats
  const parentContributions = contributions.filter(c => c.source === 'parent').reduce((sum, c) => sum + c.amount, 0);
  const studentContributions = contributions.filter(c => c.source === 'student').reduce((sum, c) => sum + c.amount, 0);

  const rewards = [
    { id: 1, name: 'Tim Hortons $10 Gift Card', points: 500, category: 'Food' },
    { id: 2, name: 'Amazon $25 Gift Card', points: 1200, category: 'Shopping' },
    { id: 3, name: 'Spotify Premium (3 months)', points: 800, category: 'Entertainment' },
    { id: 4, name: 'Nike 20% Off Coupon', points: 600, category: 'Apparel' }
  ];

  const handleRedeemReward = (reward: typeof rewards[0]) => {
    if (userPoints >= reward.points) {
      onPointsSpent(reward.points);
    }
  };

  const handleContribute = () => {
    const amount = parseFloat(contributionAmount);
    if (amount > 0) {
      const newContribution: Contribution = {
        id: contributions.length + 1,
        amount,
        date: new Date().toISOString().split('T')[0],
        source: contributionSource,
        description: contributionSource === 'student' ? 'Personal contribution' : 'Parent contribution'
      };
      
      setContributions([newContribution, ...contributions]);
      setCurrentSavings(prev => prev + amount);
      setContributionAmount('');
      setShowContributeForm(false);
      
      toast.success(`💰 Contribution Added!`, {
        description: `$${amount} added from ${contributionSource === 'student' ? 'your' : 'parent'} contribution`,
      });
    }
  };

  const handleSetGoal = () => {
    const amount = parseFloat(newGoalAmount);
    if (amount > 0) {
      setSavingsGoal(amount);
      setNewGoalAmount('');
      setShowGoalForm(false);
      
      toast.success(`🎯 Goal Updated!`, {
        description: `New savings goal set to $${amount.toLocaleString()}`,
      });
    }
  };

  const handleSelectProgram = (programId: number) => {
    setSelectedProgramId(programId);
    setShowProgramSelector(false);
    
    const program = programs.find(p => p.id === programId);
    if (program) {
      toast.success(`🎓 Program Selected!`, {
        description: `${program.program} at ${program.university}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Student RESP Dashboard</h1>
            <p className="opacity-90">Track your education savings journey</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-green-400 text-green-900 border-0 font-semibold">
                ✓ Account Active
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <School className="w-12 h-12 opacity-80 mx-auto mb-2" />
            <p className="text-xs opacity-75">Real-time tracking</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Account Balance */}
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PiggyBank className="w-5 h-5" />
                  RESP Account Balance
                </div>
                <Badge className="bg-white/20 text-white border-0">
                  Connected
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold mb-2">
                ${currentSavings.toLocaleString()}
              </div>
              <p className="text-sm opacity-90 mb-4">
                Government grants included
              </p>
              <Button 
                onClick={() => setShowContributeForm(true)}
                className="bg-white text-green-600 hover:bg-green-50 font-semibold shadow-md"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Contribution
              </Button>
            </CardContent>
          </Card>

          {/* Contribution Form */}
          {showContributeForm && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Add Your Contribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contribution" className="text-green-800">Contribution Amount</Label>
                  <Input
                    id="contribution"
                    type="number"
                    placeholder="Enter amount (e.g., 50)"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    className="border-green-300 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="source" className="text-green-800">Contribution Source</Label>
                  <Select value={contributionSource} onValueChange={(value: 'parent' | 'student') => setContributionSource(value)}>
                    <SelectTrigger className="border-green-300 focus:border-green-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>My Contribution</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="parent">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>Parent/Guardian Contribution</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-green-100 p-3 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700">
                    💡 <strong>Government Match:</strong> The government will add 20% to your contribution (up to annual limits)!
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowContributeForm(false)}
                    className="flex-1 border-green-300 text-green-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleContribute}
                    disabled={!contributionAmount || parseFloat(contributionAmount) <= 0}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Add ${contributionAmount || '0'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contribution Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Contribution Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-800">Your Contributions</span>
                  </div>
                  <p className="text-2xl font-semibold text-blue-900">${studentContributions.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-purple-800">Parent Contributions</span>
                  </div>
                  <p className="text-2xl font-semibold text-purple-900">${parentContributions.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Contributions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Contributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contributions.slice(0, 5).map((contribution) => (
                  <div key={contribution.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${contribution.source === 'student' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                        {contribution.source === 'student' ? <User className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-medium">{contribution.description}</p>
                        <p className="text-sm text-muted-foreground">{contribution.date}</p>
                      </div>
                    </div>
                    <div>
                      <div className="text-green-600 font-semibold text-right">
                        +${contribution.amount}
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {contribution.source === 'student' ? 'You' : 'Parent'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          {/* Your Program Goal */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <School className="w-5 h-5" />
                  Your Program Goal
                </div>
                <Button 
                  onClick={() => setShowProgramSelector(true)}
                  className="bg-white/20 text-white hover:bg-white/30 border-0"
                  size="sm"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Change Program
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white/10 rounded-lg">
                <h3 className="font-semibold mb-1">{selectedProgram.program}</h3>
                <p className="text-sm opacity-90">{selectedProgram.university}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-white/20 text-white border-0">{selectedProgram.duration}</Badge>
                  <Badge className="bg-white/20 text-white border-0">${selectedProgram.cost.toLocaleString()}</Badge>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span>Progress to Program Cost</span>
                  <span className="font-semibold">${currentSavings.toLocaleString()} / ${selectedProgram.cost.toLocaleString()}</span>
                </div>
                <Progress value={Math.min(programProgress, 100)} className="h-3 bg-white/20" />
                <p className="text-sm opacity-90 mt-2">
                  {programProgress >= 100 
                    ? '🎉 Fully funded!' 
                    : `${programProgress.toFixed(1)}% complete • $${(selectedProgram.cost - currentSavings).toLocaleString()} remaining`
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Program Selector */}
          {showProgramSelector && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">Select Your Target Program</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {programs.map((program) => (
                  <div 
                    key={program.id}
                    onClick={() => handleSelectProgram(program.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      program.id === selectedProgramId 
                        ? 'border-blue-500 bg-blue-100' 
                        : 'border-blue-200 bg-white hover:border-blue-400'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-blue-900">{program.program}</h3>
                        <p className="text-sm text-blue-700">{program.university}</p>
                      </div>
                      {program.id === selectedProgramId && (
                        <Badge className="bg-blue-500 text-white border-0">Selected</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{program.duration}</Badge>
                      <span className="text-sm font-semibold text-blue-600">${program.cost.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  onClick={() => setShowProgramSelector(false)}
                  className="w-full border-blue-300 text-blue-700"
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Custom Savings Goal */}
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Custom Savings Goal
                </div>
                <Button 
                  onClick={() => setShowGoalForm(true)}
                  className="bg-white/20 text-white hover:bg-white/30 border-0"
                  size="sm"
                >
                  Update Goal
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span>Progress to Goal</span>
                  <span className="font-semibold">${currentSavings.toLocaleString()} / ${savingsGoal.toLocaleString()}</span>
                </div>
                <Progress value={Math.min(savingsProgress, 100)} className="h-3 bg-white/20" />
                <p className="text-sm opacity-90 mt-2">
                  {savingsProgress >= 100 
                    ? '🎯 Goal achieved!' 
                    : `${savingsProgress.toFixed(1)}% complete`
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Goal Form */}
          {showGoalForm && (
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-800">Set Your Custom Savings Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="new-goal" className="text-purple-800">New Goal Amount</Label>
                  <Input
                    id="new-goal"
                    type="number"
                    placeholder="Enter your goal amount"
                    value={newGoalAmount}
                    onChange={(e) => setNewGoalAmount(e.target.value)}
                    className="border-purple-300 focus:border-purple-500"
                  />
                </div>
                <div className="bg-purple-100 p-3 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-700">
                    🎯 <strong>Smart Goal Tip:</strong> Consider your target education program cost and timeline when setting your goal.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowGoalForm(false)}
                    className="flex-1 border-purple-300 text-purple-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSetGoal}
                    disabled={!newGoalAmount || parseFloat(newGoalAmount) <= 0}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    Set Goal: ${newGoalAmount || '0'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="w-5 h-5" />
                Canadian Post-Secondary Programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {programs.map((program) => (
                  <div 
                    key={program.id} 
                    className={`border rounded-lg p-4 ${program.id === selectedProgramId ? 'border-purple-400 bg-purple-50' : 'border-gray-200'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{program.program}</h3>
                        <p className="text-sm text-muted-foreground">{program.university}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{program.duration}</Badge>
                        {program.id === selectedProgramId && (
                          <Badge className="bg-purple-500 text-white">Your Goal</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-blue-600">
                        ${program.cost.toLocaleString()}
                      </span>
                      <div className="text-sm text-muted-foreground">
                        {program.cost > currentSavings ? 
                          `$${(program.cost - currentSavings).toLocaleString()} more needed` : 
                          'Fully funded!'}
                      </div>
                    </div>
                    <Progress 
                      value={Math.min((currentSavings / program.cost) * 100, 100)} 
                      className="h-2 mt-2" 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}