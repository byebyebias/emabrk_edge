import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle, Play } from 'lucide-react';

interface Page {
  id: number;
  title: string;
  content: string;
  icon?: React.ReactNode;
}

interface MultiPageLessonProps {
  pages: Page[];
  lessonTitle: string;
  onComplete: () => void;
}

export function MultiPageLesson({ pages, lessonTitle, onComplete }: MultiPageLessonProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [completedPages, setCompletedPages] = useState<Set<number>>(new Set([0]));

  const page = pages[currentPage];
  const progress = ((currentPage + 1) / pages.length) * 100;
  const isLastPage = currentPage === pages.length - 1;
  const allPagesRead = completedPages.size === pages.length;

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      setCompletedPages(prev => new Set([...prev, nextPage]));
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageJump = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    setCompletedPages(prev => new Set([...prev, pageIndex]));
  };

  const parseContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      // Handle headers
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <h4 key={index} className="font-semibold text-purple-900 mt-4 mb-2">
            {paragraph.replace(/\*\*/g, '')}
          </h4>
        );
      }
      
      // Handle bullet points
      if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-')) {
        const text = paragraph.trim().substring(1).trim();
        // Parse bold text within bullet points
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return (
          <li key={index} className="ml-4 text-gray-700 mb-2">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-gray-900">{part.replace(/\*\*/g, '')}</strong>;
              }
              return <span key={i}>{part}</span>;
            })}
          </li>
        );
      }
      
      // Handle checkmarks and X marks
      if (paragraph.trim().startsWith('✅') || paragraph.trim().startsWith('❌')) {
        const icon = paragraph.trim().substring(0, 2);
        const text = paragraph.trim().substring(2).trim();
        return (
          <div key={index} className={`flex items-start gap-2 mb-2 p-2 rounded ${
            icon === '✅' ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <span className="text-lg">{icon}</span>
            <span className="text-gray-700 flex-1">{text}</span>
          </div>
        );
      }
      
      // Regular paragraphs
      if (paragraph.trim()) {
        return (
          <p key={index} className="text-gray-700 mb-3 leading-relaxed">
            {paragraph}
          </p>
        );
      }
      
      return null;
    });
  };

  return (
    <div className="space-y-4">
      {/* Progress Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">{lessonTitle}</span>
            </div>
            <Badge className="bg-white/20 text-white border-0">
              Page {currentPage + 1}/{pages.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />
          <p className="text-sm mt-2 opacity-90">
            {allPagesRead ? 'All pages read! Ready for quiz.' : 'Keep reading to unlock the quiz'}
          </p>
        </CardContent>
      </Card>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{page.title}</span>
                {completedPages.has(currentPage) && (
                  <Badge className="bg-green-500 text-white border-0">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Read
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                {parseContent(page.content)}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {/* Page Indicators */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageJump(index)}
              className={`w-2 h-2 rounded-full transition-all flex-shrink-0 ${
                index === currentPage
                  ? 'bg-purple-600 w-6'
                  : completedPages.has(index)
                  ? 'bg-green-400'
                  : 'bg-gray-300'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        {isLastPage ? (
          <Button
            onClick={onComplete}
            disabled={!allPagesRead}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
          >
            {allPagesRead ? (
              <>
                Start Quiz
                <Play className="w-4 h-4" />
              </>
            ) : (
              'Read All Pages First'
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Page Overview */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Pages in this lesson:</h4>
          <div className="flex flex-col gap-2">
            {pages.map((p, index) => (
              <button
                key={p.id}
                onClick={() => handlePageJump(index)}
                className={`flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                  index === currentPage
                    ? 'bg-purple-100 border-2 border-purple-400'
                    : completedPages.has(index)
                    ? 'bg-green-50 border border-green-200 hover:bg-green-100'
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  index === currentPage
                    ? 'bg-purple-500 text-white'
                    : completedPages.has(index)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {completedPages.has(index) ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${
                    index === currentPage ? 'text-purple-900' : 'text-gray-900'
                  }`}>
                    {p.title}
                  </p>
                  <p className="text-xs text-gray-600">
                    {index === currentPage ? 'Currently reading' : completedPages.has(index) ? 'Completed' : 'Not read yet'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
