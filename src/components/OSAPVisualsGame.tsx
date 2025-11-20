import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { OSAPProcessFlowchart } from './OSAPProcessFlowchart';
import { OSAPCostsBreakdown } from './OSAPCostsBreakdown';
import { InterestComparisonChart } from './InterestComparisonChart';
import { OSAPRepaymentTimeline } from './OSAPRepaymentTimeline';
import { CheckCircle, TrendingUp } from 'lucide-react';

interface OSAPVisualsGameProps {
  onComplete: (score: number) => void;
}

export function OSAPVisualsGame({ onComplete }: OSAPVisualsGameProps) {
  const [exploredTabs, setExploredTabs] = useState<Set<string>>(new Set());
  const [currentTab, setCurrentTab] = useState('flowchart');

  const tabs = [
    { id: 'flowchart', label: 'OSAP Process', points: 25 },
    { id: 'costs', label: 'Funding Breakdown', points: 25 },
    { id: 'interest', label: 'Interest Comparison', points: 25 },
    { id: 'timeline', label: 'Repayment Timeline', points: 25 }
  ];

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    setExploredTabs(prev => new Set([...prev, tabId]));
  };

  const totalPoints = tabs.reduce((sum, tab) => sum + tab.points, 0);
  const earnedPoints = tabs
    .filter(tab => exploredTabs.has(tab.id))
    .reduce((sum, tab) => sum + tab.points, 0);

  const allExplored = exploredTabs.size === tabs.length;

  const handleComplete = () => {
    onComplete(earnedPoints);
  };

  return (
    <div className="space-y-4">
      <Card className="border-purple-200 bg-purple-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Explore OSAP Visuals
            </CardTitle>
            <Badge variant="outline" className="bg-white">
              {earnedPoints}/{totalPoints} points
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Explore all 4 interactive visualizations to earn maximum points!
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap mb-3">
            {tabs.map(tab => (
              <Badge 
                key={tab.id}
                variant={exploredTabs.has(tab.id) ? "default" : "outline"}
                className="text-xs"
              >
                {exploredTabs.has(tab.id) && <CheckCircle className="w-3 h-3 mr-1" />}
                {tab.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="flowchart" className="text-xs px-2">
            Process
          </TabsTrigger>
          <TabsTrigger value="costs" className="text-xs px-2">
            Costs
          </TabsTrigger>
          <TabsTrigger value="interest" className="text-xs px-2">
            Interest
          </TabsTrigger>
          <TabsTrigger value="timeline" className="text-xs px-2">
            Timeline
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flowchart" className="mt-4">
          <OSAPProcessFlowchart />
        </TabsContent>

        <TabsContent value="costs" className="mt-4">
          <OSAPCostsBreakdown />
        </TabsContent>

        <TabsContent value="interest" className="mt-4">
          <InterestComparisonChart />
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <OSAPRepaymentTimeline />
        </TabsContent>
      </Tabs>

      {allExplored && (
        <Button 
          onClick={handleComplete}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
          size="lg"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Complete ({totalPoints} points earned!)
        </Button>
      )}

      {!allExplored && (
        <div className="text-center text-sm text-gray-600 p-4 bg-purple-50 rounded-lg border border-purple-200">
          Explore all {tabs.length} visualizations to unlock completion
        </div>
      )}
    </div>
  );
}
