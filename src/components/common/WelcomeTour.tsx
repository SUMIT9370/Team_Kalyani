import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, Sparkles, MessageSquare, BarChart3, History, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface WelcomeTourProps {
  onComplete: () => void;
}

const tourSteps = [
  {
    title: 'Welcome to ChatSum AI',
    description: 'Transform your lengthy conversations into concise, actionable summaries with the power of AI',
    icon: Sparkles,
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    title: 'Multiple Summary Modes',
    description: 'Choose from Brief, Detailed, Bullet Points, or Action Items to get summaries tailored to your needs',
    icon: MessageSquare,
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    title: 'Analytics & Insights',
    description: 'Track your usage patterns, time saved, and summarization performance with detailed analytics',
    icon: BarChart3,
    gradient: 'from-pink-500 to-red-600'
  },
  {
    title: 'Complete History',
    description: 'Access all your past summaries anytime with powerful search and filtering capabilities',
    icon: History,
    gradient: 'from-orange-500 to-yellow-600'
  },
  {
    title: 'Customizable Settings',
    description: 'Personalize your experience with themes, notifications, and AI processing preferences',
    icon: Settings,
    gradient: 'from-green-500 to-emerald-600'
  }
];

export function WelcomeTour({ onComplete }: WelcomeTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = tourSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-2xl overflow-hidden">
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>

          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Icon */}
                <div className="flex justify-center">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-3">
                  <h2 className="text-gray-900 dark:text-white">{step.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Progress dots */}
                <div className="flex justify-center gap-2">
                  {tourSteps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentStep
                          ? 'w-8 bg-blue-600 dark:bg-blue-400'
                          : 'w-2 bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="ghost"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="rounded-xl"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <Button
                    onClick={handleNext}
                    className={`bg-gradient-to-r ${step.gradient} hover:opacity-90 text-white rounded-xl shadow-lg`}
                  >
                    {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
