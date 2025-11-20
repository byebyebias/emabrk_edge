import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { motion } from 'motion/react';
import { 
  Unlock, 
  TrendingUp, 
  Target, 
  PiggyBank, 
  Shield, 
  Star, 
  Check,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';

interface EmbarkAccountConnectProps {
  onConnect: () => void;
}

export function EmbarkAccountConnect({ onConnect }: EmbarkAccountConnectProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const perks = [
    {
      icon: <PiggyBank className="w-6 h-6 text-green-500" />,
      title: 'Contribute to Your RESP',
      description: 'Make direct contributions to your education savings from your allowance or part-time job earnings',
      highlight: 'Track every dollar you add!'
    },
    {
      icon: <Target className="w-6 h-6 text-blue-500" />,
      title: 'Set Savings Goals',
      description: 'Create specific targets for your education fund and get accountability reminders',
      highlight: 'Stay motivated with progress tracking!'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
      title: 'Real-Time Balance Updates',
      description: 'See your RESP balance grow in real-time as contributions and government grants are added',
      highlight: 'Watch your money grow!'
    },
    {
      icon: <Shield className="w-6 h-6 text-orange-500" />,
      title: 'Secure Account Access',
      description: 'Safe and secure connection to your real Embark RESP account with bank-level security',
      highlight: 'Your data is protected!'
    }
  ];

  const handleConnect = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onConnect();
  };

  if (showLogin) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card className="bg-white/90 backdrop-blur-sm border border-purple-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-purple-900">
              <Shield className="w-6 h-6 text-purple-600" />
              Connect Your Embark Account
            </CardTitle>
            <p className="text-sm text-purple-600">
              Log in with your existing Embark credentials to unlock enhanced RESP features
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-900">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-purple-200 focus:border-purple-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-900">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-purple-200 focus:border-purple-400 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-purple-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-purple-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
              <p className="text-xs text-purple-700">
                🔒 <strong>Secure Connection:</strong> Your login credentials are encrypted and protected with bank-level security.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowLogin(false)}
                className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                onClick={handleConnect}
                disabled={!email || !password || isLoading}
                className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 border-0"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Connect Account
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>

            <p className="text-xs text-center text-purple-600">
              Don't have an Embark account? 
              <button className="underline ml-1 hover:text-purple-800">
                Sign up here
              </button>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0 shadow-lg overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Unlock className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Unlock Enhanced Features</h2>
                <p className="text-sm opacity-90">Connect your Embark account for full RESP control</p>
              </div>
            </div>
            <Badge className="bg-yellow-400 text-yellow-900 font-semibold">
              Premium
            </Badge>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => setShowLogin(true)}
              className="w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold py-3 shadow-md"
            >
              Connect Your Embark Account
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      {/* Features List */}
      <Card className="bg-white/90 backdrop-blur-sm border border-purple-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Star className="w-5 h-5 text-yellow-500" />
            What You'll Unlock
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {perks.map((perk, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 p-4 rounded-lg border border-purple-100 hover:border-purple-200 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex-shrink-0">
                {perk.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-purple-900 mb-1">{perk.title}</h3>
                <p className="text-sm text-purple-700 mb-2">{perk.description}</p>
                <Badge variant="outline" className="text-xs border-green-300 text-green-700 bg-green-50">
                  <Check className="w-3 h-3 mr-1" />
                  {perk.highlight}
                </Badge>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="bg-blue-50 border border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Secure & Private</h4>
              <p className="text-sm text-blue-700">
                Your account connection uses bank-level encryption. We never store your login credentials, 
                and you can disconnect at any time. This app is designed for educational purposes and 
                does not collect personal or sensitive information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
