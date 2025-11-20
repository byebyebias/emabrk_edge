import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Gift, Coins, Check, Lock, Calendar, History } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RewardsPageProps {
  userPoints: number;
  onPointsSpent: (points: number) => void;
}

interface GiftCard {
  id: string;
  name: string;
  description: string;
  value: string;
  points: number;
  image: string;
  category: string;
}

interface RedeemedReward {
  giftCard: GiftCard;
  redeemedAt: Date;
  confirmationCode: string;
}

export function RewardsPage({ userPoints, onPointsSpent }: RewardsPageProps) {
  const [redeemedRewards, setRedeemedRewards] = useState<RedeemedReward[]>([]);

  const giftCards: GiftCard[] = [
    {
      id: 'amazon-10',
      name: 'Amazon',
      description: '$10 Gift Card',
      value: '$10',
      points: 100,
      image: 'https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Shopping'
    },
    {
      id: 'starbucks-10',
      name: 'Starbucks',
      description: '$10 Gift Card',
      value: '$10',
      points: 100,
      image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Food & Drink'
    },
    {
      id: 'spotify-3months',
      name: 'Spotify Premium',
      description: '3 Months Free',
      value: '3 Months',
      points: 75,
      image: 'https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Entertainment'
    },
    {
      id: 'ubereats-15',
      name: 'Uber Eats',
      description: '$15 Gift Card',
      value: '$15',
      points: 100,
      image: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Food & Drink'
    },
    {
      id: 'cineplex-ticket',
      name: 'Cineplex',
      description: 'Movie Ticket',
      value: '1 Ticket',
      points: 75,
      image: 'https://images.unsplash.com/photo-1561722798-9a732d141027?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Entertainment'
    },
    {
      id: 'amazon-5',
      name: 'Amazon',
      description: '$5 Gift Card',
      value: '$5',
      points: 50,
      image: 'https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Shopping'
    },
    {
      id: 'starbucks-5',
      name: 'Starbucks',
      description: '$5 Gift Card',
      value: '$5',
      points: 50,
      image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Food & Drink'
    },
    {
      id: 'mystery-50',
      name: 'Mystery Reward',
      description: 'Surprise Gift Card',
      value: '?',
      points: 50,
      image: 'https://images.unsplash.com/photo-1610187224295-ccb67fa5e770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Mystery'
    }
  ];

  const handleRedeem = (giftCard: GiftCard) => {
    if (isRedeemed(giftCard.id)) {
      toast.error('Already Redeemed', {
        description: 'You have already redeemed this reward.',
      });
      return;
    }

    if (userPoints < giftCard.points) {
      toast.error('Not Enough Points', {
        description: `You need ${giftCard.points - userPoints} more points to redeem this reward.`,
      });
      return;
    }

    // Generate a confirmation code
    const confirmationCode = `EE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Add to redeemed rewards history
    setRedeemedRewards(prev => [
      {
        giftCard,
        redeemedAt: new Date(),
        confirmationCode
      },
      ...prev
    ]);
    
    // Spend points
    onPointsSpent(giftCard.points);
    
    toast.success('🎁 Reward Redeemed!', {
      description: `Confirmation code: ${confirmationCode}. Check your email for details!`,
      duration: 5000,
    });
  };

  const canAfford = (points: number) => userPoints >= points;
  const isRedeemed = (id: string) => redeemedRewards.some(r => r.giftCard.id === id);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-6 h-6" />
            Rewards Store
          </CardTitle>
          <CardDescription className="text-white/90">
            Redeem your points for awesome rewards!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <div>
              <p className="text-sm opacity-90">Your Balance</p>
              <p className="text-2xl flex items-center gap-2 mt-1">
                <Coins className="w-6 h-6" />
                {userPoints.toLocaleString()} Points
              </p>
            </div>
            <Badge className="bg-white/20 text-white border-0">
              {redeemedRewards.size} Redeemed
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {giftCards.map((giftCard) => {
          const affordable = canAfford(giftCard.points);
          const redeemed = isRedeemed(giftCard.id);

          return (
            <Card 
              key={giftCard.id} 
              className={`overflow-hidden transition-all duration-200 ${
                redeemed 
                  ? 'border-green-300 bg-green-50' 
                  : affordable 
                    ? 'border-purple-200 hover:shadow-lg hover:border-purple-300' 
                    : 'border-gray-200 opacity-75'
              }`}
            >
              <div className="flex">
                {/* Image Section */}
                <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden">
                  <ImageWithFallback
                    src={giftCard.image}
                    alt={giftCard.name}
                    className="w-full h-full object-cover"
                  />
                  {redeemed && (
                    <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                  )}
                  {!affordable && !redeemed && (
                    <div className="absolute inset-0 bg-gray-900/40 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className={`font-medium ${redeemed ? 'text-green-800' : 'text-purple-900'}`}>
                          {giftCard.name}
                        </h3>
                        <p className={`text-sm ${redeemed ? 'text-green-700' : 'text-purple-600'}`}>
                          {giftCard.description}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`ml-2 ${
                          redeemed 
                            ? 'border-green-300 text-green-700' 
                            : 'border-purple-200 text-purple-600'
                        }`}
                      >
                        {giftCard.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-purple-900">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{giftCard.points} pts</span>
                    </div>
                    
                    {redeemed ? (
                      <Badge className="bg-green-100 text-green-800 border-0">
                        <Check className="w-3 h-3 mr-1" />
                        Redeemed
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleRedeem(giftCard)}
                        disabled={!affordable}
                        className={`${
                          affordable
                            ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
                            : 'bg-gray-300'
                        }`}
                      >
                        {affordable ? 'Redeem' : 'Locked'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Redeemed Rewards History */}
      {redeemedRewards.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border border-purple-100 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-900">
              <History className="w-5 h-5" />
              Redeemed Rewards
            </CardTitle>
            <CardDescription>
              Your redemption history ({redeemedRewards.length} reward{redeemedRewards.length !== 1 ? 's' : ''})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {redeemedRewards.map((reward, index) => (
                <div 
                  key={`${reward.giftCard.id}-${reward.redeemedAt.getTime()}`}
                  className="flex gap-3 p-3 rounded-lg border border-green-200 bg-green-50/50"
                >
                  {/* Small Image */}
                  <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                    <ImageWithFallback
                      src={reward.giftCard.image}
                      alt={reward.giftCard.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-green-900 truncate">
                          {reward.giftCard.name} - {reward.giftCard.description}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge variant="outline" className="border-green-300 text-green-700 text-xs">
                            {reward.giftCard.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-green-700">
                            <Coins className="w-3 h-3 text-yellow-600" />
                            {reward.giftCard.points} pts
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-0 shrink-0">
                        <Check className="w-3 h-3 mr-1" />
                        Redeemed
                      </Badge>
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-1 text-xs text-green-700">
                        <Calendar className="w-3 h-3" />
                        {formatDate(reward.redeemedAt)}
                      </div>
                      <div className="text-xs text-green-700 font-mono bg-green-100 px-2 py-1 rounded inline-block">
                        Code: {reward.confirmationCode}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Helpful Tips */}
      <Card className="bg-purple-50 border-purple-100">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Gift className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-purple-900 mb-1">How It Works</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Complete learning modules to earn points</li>
                <li>• Each quiz earns you 50-100 points</li>
                <li>• Redeem points for real gift cards</li>
                <li>• Gift card codes sent to your email instantly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
