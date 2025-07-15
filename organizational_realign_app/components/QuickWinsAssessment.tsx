'use client';

// QuickWinsAssessment Component - Lead Generation Tool
import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Lightbulb,
  Target,
  Zap,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { 
  QUICK_WINS_QUESTIONS, 
  QuickWinsAlgorithm, 
  QuickWinsResult
} from '@/data/quickWinsQuestions';

interface QuickWinsAssessmentProps {
  onComplete?: (results: QuickWinsResult[]) => void;
  onUpgrade?: () => void;
}

export default function QuickWinsAssessment({ onComplete, onUpgrade }: QuickWinsAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<QuickWinsResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = QUICK_WINS_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUICK_WINS_QUESTIONS.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUICK_WINS_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Assessment complete
      const assessmentResults = QuickWinsAlgorithm.calculateResults(newAnswers);
      setResults(assessmentResults);
      setIsComplete(true);
      setTimeout(() => setShowResults(true), 500);
      onComplete?.(assessmentResults);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconMap = {
      'structure': Target,
      'efficiency': Zap,
      'technology': BarChart3,
      'costs': DollarSign
    };
    return iconMap[category as keyof typeof iconMap] || Lightbulb;
  };

  const getCategoryColor = (category: string) => {
    const colorMap = {
      'structure': 'from-blue-500 to-indigo-500',
      'efficiency': 'from-green-500 to-emerald-500',
      'technology': 'from-purple-500 to-violet-500',
      'costs': 'from-orange-500 to-red-500'
    };
    return colorMap[category as keyof typeof colorMap] || 'from-gray-500 to-slate-500';
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 70) return 'text-green-600 bg-green-50 border-green-200';
    if (percentage >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreLabel = (percentage: number) => {
    if (percentage >= 70) return 'Strong';
    if (percentage >= 40) return 'Moderate';
    return 'Needs Attention';
  };

  if (isComplete && showResults) {
    const overallInsights = QuickWinsAlgorithm.getOverallInsights(results);
    const averageScore = results.reduce((sum, r) => sum + r.percentage, 0) / results.length;

    return (
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Your Quick Wins Results</h1>
          <p className="text-lg text-slate-600">Immediate improvement opportunities identified</p>
        </motion.div>

        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-800">Overall Assessment Score</h3>
                <Badge className={`text-lg px-4 py-2 ${getScoreColor(averageScore)}`}>
                  {Math.round(averageScore)}% - {getScoreLabel(averageScore)}
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-slate-700">Potential Annual Savings</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{overallInsights.totalPotentialSavings}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-slate-700">Top Priority Area</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{overallInsights.topPriority}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Results */}
        <div className="grid md:grid-cols-2 gap-6">
          {results.map((result, index) => {
            const Icon = getCategoryIcon(result.category.toLowerCase().split(' ')[0]);
            const colorClass = getCategoryColor(result.category.toLowerCase().split(' ')[0]);
            
            return (
              <motion.div
                key={result.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-gradient-to-r ${colorClass} rounded-lg`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <CardTitle className="text-lg">{result.category}</CardTitle>
                      </div>
                      <Badge className={`${getScoreColor(result.percentage)} border`}>
                        {result.percentage}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Progress value={result.percentage} className="h-2" />
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex items-center gap-1 text-green-600 mb-1">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-medium">Annual Savings</span>
                          </div>
                          <p className="text-slate-700">{result.potentialSavings.annual}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-blue-600 mb-1">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">Time Reduction</span>
                          </div>
                          <p className="text-slate-700">{result.potentialSavings.timeReduction}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-1">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          Quick Wins
                        </h4>
                        <ul className="space-y-1 text-sm text-slate-600">
                          {result.recommendations.slice(0, 2).map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Immediate Actions</h4>
                  <ul className="space-y-2">
                    {overallInsights.nextSteps.slice(0, 2).map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="flex items-center justify-center w-5 h-5 bg-yellow-500 text-white rounded-full text-xs font-semibold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Strategic Planning</h4>
                  <ul className="space-y-2">
                    {overallInsights.nextSteps.slice(2).map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="flex items-center justify-center w-5 h-5 bg-blue-500 text-white rounded-full text-xs font-semibold flex-shrink-0 mt-0.5">
                          {index + 3}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center"
        >
          <Card className="border-2 border-blue-300 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready for the Complete Analysis?</h3>
              <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                This Quick Wins assessment only scratches the surface. Our comprehensive evaluation 
                provides detailed implementation roadmaps, ROI projections, and industry-specific insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={onUpgrade}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
                >
                  Get Full Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 px-8 py-3"
                  onClick={() => window.print()}
                >
                  Download Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Assessment Complete!</h2>
          <p className="text-slate-600">Analyzing your responses...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-800">Assessment</h1>
          <Badge variant="outline" className="text-sm">
            {currentQuestionIndex + 1} of {QUICK_WINS_QUESTIONS.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-slate-600 mt-2">
          {Math.round(progress)}% complete • ~{Math.ceil((QUICK_WINS_QUESTIONS.length - currentQuestionIndex - 1) * 0.5)} minutes remaining
        </p>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className={`p-2 bg-gradient-to-r ${getCategoryColor(currentQuestion.category)} rounded-lg`}>
                  {(() => {
                    const Icon = getCategoryIcon(currentQuestion.category);
                    return <Icon className="h-5 w-5 text-white" />;
                  })()}
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-800">
                    {currentQuestion.question}
                  </CardTitle>
                  {currentQuestion.description && (
                    <p className="text-sm text-slate-600 mt-2">{currentQuestion.description}</p>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQuestion.type === 'multiple-choice' ? (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left p-4 h-auto justify-start hover:border-blue-300 hover:bg-blue-50"
                      onClick={() => handleAnswer(index + 1)}
                    >
                      <span className="w-6 h-6 border border-slate-300 rounded-full mr-3 flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      {option}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">Rate from 1 (Poor) to 5 (Excellent)</p>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        variant="outline"
                        size="lg"
                        className="w-12 h-12 rounded-full hover:border-blue-300 hover:bg-blue-50"
                        onClick={() => handleAnswer(rating)}
                      >
                        {rating}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="text-sm text-slate-500 flex items-center">
          Press any option to continue
        </div>
      </div>
    </div>
  );
}
