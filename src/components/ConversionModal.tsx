import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Trophy, ArrowRight, Mail, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConversionModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export function ConversionModal({ isOpen, onComplete }: ConversionModalProps) {
  const [step, setStep] = useState<'celebrate' | 'email' | 'success'>('celebrate');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setStep('success');
    
    // Trigger another small confetti burst for success
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl w-full max-w-md overflow-hidden" style={{ borderRadius: '32px' }}>
            {step === 'celebrate' && (
              <div
                className="p-8 text-center space-y-6 bg-gradient-to-b from-purple-50 to-white"
              >
                <div 
                  className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Trophy className="w-12 h-12 text-yellow-600" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-purple-900">
                    See how your family could get up to $7,200 in government grants.
                  </h2>
                  <p className="text-lg text-purple-800">
                    You've mastered the basics! Now, let's explore real options for your future.
                  </p>
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={() => setStep('email')}
                    className="w-full text-lg py-6 !bg-indigo-600 hover:!bg-indigo-700 !text-white shadow-lg transform transition hover:scale-[1.02] font-bold"
                    style={{ borderRadius: '16px' }}
                  >
                    Let's Go!
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {step === 'email' && (
              <div
                className="p-8 space-y-6"
              >
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-sm">
                    To help you explore real options for paying for school, we’ll send a short summary to your parent/guardian.
                    Invite your parents to <span className="font-semibold text-indigo-600">open or switch their RESP to Embark</span>.
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="parent-first-name" className="text-xs font-medium ml-1 text-gray-900">Parent First Name</Label>
                      <Input id="parent-first-name" placeholder="Jane" required className="rounded-2xl px-4" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="parent-last-name" className="text-xs font-medium ml-1 text-gray-900">Parent Last Name</Label>
                      <Input id="parent-last-name" placeholder="Doe" required className="rounded-2xl px-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="parent-contact" className="text-xs font-medium ml-1 text-gray-900">Parent Email or Phone</Label>
                    <Input
                      id="parent-contact"
                      placeholder="mom@example.com or 555-0123"
                      className="rounded-2xl w-full px-4"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="relationship" className="text-xs font-medium ml-1 text-gray-900">Relationship to Student <span className="text-gray-500 font-normal">(Optional)</span></Label>
                    <Input id="relationship" placeholder="Mother, Father, Guardian..." className="rounded-2xl px-4" />
                  </div>

                  <div className="flex items-start gap-4 pt-2">
                    <Checkbox 
                      id="consent" 
                      className="mt-1 border-gray-300 text-indigo-600 focus:ring-indigo-500 shrink-0 cursor-pointer" 
                      required 
                    />
                    <Label htmlFor="consent" className="text-xs text-gray-900 leading-relaxed cursor-pointer flex-1">
                      By providing this contact, you confirm your parent/guardian is aware they may receive educational information about opening or switching their RESP to Embark.
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-6 text-lg !bg-indigo-600 hover:!bg-indigo-700 !text-white mt-2 font-bold"
                    style={{ borderRadius: '16px' }}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </Button>
                </form>
              </div>
            )}

            {step === 'success' && (
              <div
                className="p-8 text-center space-y-6 bg-gradient-to-b from-green-50 to-white"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-green-900">You're In!</h2>
                  <p className="text-green-700">
                    We've sent the info to your parent. Your Dashboard is now fully unlocked—start exploring!
                  </p>
                </div>

                <Button 
                  onClick={onComplete}
                  className="w-full py-6 text-lg bg-green-600 hover:bg-green-700 shadow-lg rounded-2xl"
                >
                  Go to Dashboard
                </Button>
              </div>
            )}
      </div>
    </div>
  );
}
