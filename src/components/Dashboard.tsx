import React from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  FileText, 
  TrendingUp, 
  Clock, 
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from './ui/button';
import type { Summary, User } from '../App';

type DashboardProps = {
  summaries: Summary[];
  onNavigate: (view: 'upload' | 'analytics' | 'history') => void;
  onViewSummary: (summary: Summary) => void;
  user: User | null;
};

export default function Dashboard({ summaries, onNavigate, onViewSummary, user }: DashboardProps) {
  const recentSummaries = summaries.slice(0, 3);
  const totalWords = summaries.reduce((sum, s) => sum + s.wordCount, 0);
  const avgWords = summaries.length > 0 ? Math.round(totalWords / summaries.length) : 0;

  const stats = [
    { label: 'Total Summaries', value: summaries.length, icon: FileText, color: 'from-blue-500 to-cyan-500' },
    { label: 'Words Processed', value: totalWords.toLocaleString(), icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { label: 'Avg. Length', value: avgWords, icon: Zap, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-gray-900 dark:text-white mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Transform your conversations into actionable insights
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => onNavigate('upload')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg px-6"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Summary
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden"
        >
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8" />
              <h2 className="text-white">AI-Powered Summarization</h2>
            </div>
            <p className="text-white/90 mb-6 max-w-2xl">
              Upload your chat conversations, meeting transcripts, or documents and let our AI create intelligent summaries in seconds.
            </p>
            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => onNavigate('upload')}
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 rounded-xl"
                >
                  Start Summarizing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => onNavigate('analytics')}
                  variant="ghost"
                  className="text-white border border-white/30 hover:bg-white/10 rounded-xl"
                >
                  View Analytics
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Recent Summaries */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900 dark:text-white">Recent Summaries</h2>
            <button
              onClick={() => onNavigate('history')}
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {recentSummaries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl p-12 text-center border border-gray-200/50 dark:border-gray-700/50"
            >
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 dark:text-white mb-2">No summaries yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create your first summary to get started
              </p>
              <Button
                onClick={() => onNavigate('upload')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Summary
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentSummaries.map((summary, index) => (
                <motion.div
                  key={summary.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => onViewSummary(summary)}
                  className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg">
                      {summary.mode}
                    </span>
                  </div>
                  <h3 className="text-gray-900 dark:text-white mb-2">{summary.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {summary.summary}
                  </p>
                  <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                    <span>{summary.wordCount} words</span>
                    <span>{new Date(summary.timestamp).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
