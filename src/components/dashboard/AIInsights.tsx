
import React, { useState } from 'react';
import { AlertCircle, Brain, Lightbulb, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Insight = {
  id: string;
  title: string;
  description: string;
  type: 'recommendation' | 'alert' | 'info';
  time: string;
};

type AIInsightsProps = {
  insights: Insight[];
  loading?: boolean;
};

const AIInsights = ({ insights, loading = false }: AIInsightsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'insights' | 'symptom-checker'>('insights');

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg w-full"></div>
        <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex border-b dark:border-gray-800">
        <button
          className={cn(
            "pb-2 pt-1 px-4 font-medium text-sm transition-colors relative",
            activeTab === 'insights'
              ? "text-medical-primary border-b-2 border-medical-primary"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          )}
          onClick={() => setActiveTab('insights')}
        >
          AI Insights
        </button>
        <button
          className={cn(
            "pb-2 pt-1 px-4 font-medium text-sm transition-colors relative",
            activeTab === 'symptom-checker'
              ? "text-medical-primary border-b-2 border-medical-primary"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          )}
          onClick={() => setActiveTab('symptom-checker')}
        >
          Symptom Checker
        </button>
      </div>

      {activeTab === 'insights' ? (
        <div className="space-y-4">
          {insights.length > 0 ? (
            <div>
              {insights.map((insight) => (
                <div 
                  key={insight.id} 
                  className="dashboard-card mb-4 border-l-4 animate-fade-in"
                  style={{ 
                    borderLeftColor: insight.type === 'alert' 
                      ? 'var(--alert-critical)' 
                      : insight.type === 'recommendation' 
                        ? 'var(--alert-success)' 
                        : 'var(--alert-info)'
                  }}
                >
                  <div className="flex items-start">
                    <div className={cn(
                      "p-2 rounded-full mr-3",
                      insight.type === 'alert' 
                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" 
                        : insight.type === 'recommendation' 
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    )}>
                      {insight.type === 'alert' 
                        ? <AlertCircle size={18} />
                        : insight.type === 'recommendation' 
                          ? <Lightbulb size={18} />
                          : <Brain size={18} />
                      }
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{insight.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{insight.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline" className="text-xs">
                          {insight.type === 'alert' 
                            ? 'Alert' 
                            : insight.type === 'recommendation' 
                              ? 'Recommendation' 
                              : 'Information'}
                        </Badge>
                        <span className="text-xs text-gray-400">{insight.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border border-dashed rounded-xl">
              <Brain className="mx-auto h-10 w-10 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No insights available</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">AI insights will appear here as you interact with patients.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="dashboard-card p-4">
            <h4 className="text-sm font-medium mb-3">Symptom Checker</h4>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-9"
                  placeholder="Enter patient symptoms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer">Fever</Badge>
                <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer">Cough</Badge>
                <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer">Headache</Badge>
                <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer">Fatigue</Badge>
                <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer">Nausea</Badge>
                <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer">+ Add more</Badge>
              </div>
              <Button className="w-full">
                <Brain className="mr-2 h-4 w-4" />
                Analyze Symptoms
              </Button>
            </div>
          </div>

          <div className="dashboard-card p-4 border border-dashed">
            <div className="text-center">
              <Brain className="mx-auto h-10 w-10 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Enter symptoms to analyze</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                AI will suggest possible conditions based on the symptoms.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
