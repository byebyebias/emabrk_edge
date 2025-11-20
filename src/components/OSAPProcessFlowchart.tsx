import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  FileText, 
  Search, 
  DollarSign, 
  GraduationCap, 
  CheckCircle, 
  Clock,
  RefreshCw,
  ArrowDown,
  Home
} from 'lucide-react';

interface FlowStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
}

export function OSAPProcessFlowchart() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const steps: FlowStep[] = [
    {
      id: 1,
      title: 'Apply Online',
      description: 'Complete OSAP application at ontario.ca/osap. You\'ll need your SIN, school info, and family financial details.',
      icon: <FileText className="w-6 h-6" />,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300'
    },
    {
      id: 2,
      title: 'Assessment',
      description: 'OSAP reviews your application and calculates your need based on tuition costs, living expenses, and family income.',
      icon: <Search className="w-6 h-6" />,
      color: 'text-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-300'
    },
    {
      id: 3,
      title: 'Receive Award',
      description: 'You get a Notice of Assessment showing grants (free money!) and loans. Grants don\'t need to be repaid!',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300'
    },
    {
      id: 4,
      title: 'Funds Released',
      description: 'Money is sent to your school for tuition, then remaining funds go to your bank account for living expenses.',
      icon: <Home className="w-6 h-6" />,
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-300'
    },
    {
      id: 5,
      title: 'During School Year',
      description: 'Focus on your studies! No payments required. No interest charged. Just succeed in school.',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'text-pink-700',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-300'
    },
    {
      id: 6,
      title: 'Grace Period',
      description: 'After graduation, you get 6 months before payments start. Interest begins, but no payments yet.',
      icon: <Clock className="w-6 h-6" />,
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-300'
    },
    {
      id: 7,
      title: 'Repayment Begins',
      description: 'Make monthly payments based on your income. Use RAP (Repayment Assistance) if you need help.',
      icon: <RefreshCw className="w-6 h-6" />,
      color: 'text-teal-700',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-300'
    }
  ];

  return (
    <Card className="border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-purple-600" />
          OSAP Process: From Application to Repayment
        </CardTitle>
        <p className="text-sm text-gray-600">
          Click each step to learn more about the OSAP journey
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={step.id}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedStep === step.id
                    ? `${step.borderColor} ${step.bgColor} shadow-md`
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`${selectedStep === step.id ? step.color : 'text-gray-400'}`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={selectedStep === step.id ? "default" : "outline"} className="text-xs">
                        Step {step.id}
                      </Badge>
                      <span className={`font-medium ${selectedStep === step.id ? step.color : 'text-gray-700'}`}>
                        {step.title}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: selectedStep === step.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowDown className={`w-4 h-4 ${selectedStep === step.id ? step.color : 'text-gray-400'}`} />
                  </motion.div>
                </div>

                {selectedStep === step.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-gray-200"
                  >
                    <p className="text-sm text-gray-700">{step.description}</p>
                  </motion.div>
                )}
              </motion.button>

              {index < steps.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="w-4 h-4 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-300 rounded-lg p-4">
          <p className="text-sm text-purple-900">
            <strong>Pro Tip:</strong> Apply early! OSAP processing takes 4-6 weeks, and you want funding 
            ready before classes start. Most students apply in May/June for September start dates.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
