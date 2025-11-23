import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  FileText, 
  Clock, 
  Zap, 
  ArrowRight,
  Sparkles,
  MessageSquare,
  BarChart3
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { label: 'Total Summaries', value: '127', change: '+12%', icon: FileText, color: 'from-blue-500 to-cyan-500' },
  { label: 'Time Saved', value: '48h', change: '+8%', icon: Clock, color: 'from-purple-500 to-pink-500' },
  { label: 'Avg. Processing', value: '2.3s', change: '-15%', icon: Zap, color: 'from-orange-500 to-red-500' },
  { label: 'Success Rate', value: '99.2%', change: '+2%', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
];

const recentSummaries = [
  {
    id: 1,
    title: 'Team Meeting Notes',
    date: '2 hours ago',
    preview: 'Discussed Q4 goals, new product features, and team expansion plans...',
    type: 'Meeting'
  },
  {
    id: 2,
    title: 'Customer Support Chat',
    date: '5 hours ago',
    preview: 'Customer inquired about premium features and pricing options...',
    type: 'Support'
  },
  {
    id: 3,
    title: 'Project Discussion',
    date: '1 day ago',
    preview: 'Reviewed project timeline, deliverables, and resource allocation...',
    type: 'Project'
  },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 shadow-2xl"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white mb-2"
              >
                Welcome back!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white/90 mb-6"
              >
                Transform your conversations into actionable insights with AI-powered summarization
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  onClick={() => onNavigate('summarize')}
                  className="bg-white text-blue-600 hover:bg-gray-100 rounded-xl shadow-lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Summarizing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="w-64 h-64 relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHRlY2hub2xvZ3klMjBmdXR1cmlzdGljfGVufDF8fHx8MTc2MzkxNzE1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="AI Technology"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-transparent" />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-green-600 dark:text-green-400 bg-green-100/50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Summaries */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white">Recent Summaries</span>
                  <Button
                    variant="ghost"
                    onClick={() => onNavigate('history')}
                    className="text-blue-600 dark:text-blue-400 hover:bg-blue-100/50 dark:hover:bg-blue-900/20 rounded-xl"
                  >
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentSummaries.map((summary, index) => (
                  <motion.div
                    key={summary.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/70 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {summary.title}
                          </h4>
                          <p className="text-gray-500 dark:text-gray-400">{summary.date}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                        {summary.type}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 ml-13">
                      {summary.preview}
                    </p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => onNavigate('summarize')}
                  className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg h-12"
                >
                  <Sparkles className="w-5 h-5 mr-3" />
                  New Summary
                </Button>
                <Button
                  onClick={() => onNavigate('analytics')}
                  variant="outline"
                  className="w-full justify-start border-gray-200 dark:border-gray-700 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl h-12"
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  View Analytics
                </Button>
                <Button
                  onClick={() => onNavigate('history')}
                  variant="outline"
                  className="w-full justify-start border-gray-200 dark:border-gray-700 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl h-12"
                >
                  <Clock className="w-5 h-5 mr-3" />
                  Browse History
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl shadow-xl">
              <CardContent className="p-6">
                <Sparkles className="w-8 h-8 mb-4" />
                <h3 className="mb-2">Upgrade to Pro</h3>
                <p className="text-white/90 mb-4">
                  Unlock advanced features and unlimited summaries
                </p>
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 rounded-xl">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
