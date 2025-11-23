import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Clock, Zap, FileText, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import type { Summary } from '../App';

type AnalyticsProps = {
  summaries: Summary[];
};

export default function Analytics({ summaries }: AnalyticsProps) {
  // Calculate analytics data
  const totalSummaries = summaries.length;
  const totalWords = summaries.reduce((sum, s) => sum + s.wordCount, 0);
  const avgCompressionRate = summaries.length > 0
    ? summaries.reduce((sum, s) => sum + (s.summary.split(/\s+/).length / s.wordCount), 0) / summaries.length
    : 0;

  // Mode distribution
  const modeDistribution = summaries.reduce((acc, s) => {
    acc[s.mode] = (acc[s.mode] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const modeData = Object.entries(modeDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  // Activity over time (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const activityData = last7Days.map(date => ({
    date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
    count: summaries.filter(s => 
      new Date(s.timestamp).toISOString().split('T')[0] === date
    ).length,
  }));

  // Word count distribution
  const wordRanges = [
    { range: '0-100', min: 0, max: 100 },
    { range: '101-500', min: 101, max: 500 },
    { range: '501-1000', min: 501, max: 1000 },
    { range: '1000+', min: 1001, max: Infinity },
  ];

  const wordDistribution = wordRanges.map(({ range, min, max }) => ({
    range,
    count: summaries.filter(s => s.wordCount >= min && s.wordCount <= max).length,
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

  const stats = [
    {
      label: 'Total Summaries',
      value: totalSummaries,
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%',
    },
    {
      label: 'Words Processed',
      value: totalWords.toLocaleString(),
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      change: '+23%',
    },
    {
      label: 'Avg Compression',
      value: `${Math.round(avgCompressionRate * 100)}%`,
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      change: '-5%',
    },
    {
      label: 'This Week',
      value: summaries.filter(s => Date.now() - s.timestamp < 7 * 24 * 60 * 60 * 1000).length,
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
      change: '+8%',
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your summarization activity and insights
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                <p className="text-gray-900 dark:text-white">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-gray-400" />
              <h3 className="text-gray-900 dark:text-white">Activity (Last 7 Days)</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Mode Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-gray-400" />
              <h3 className="text-gray-900 dark:text-white">Mode Distribution</h3>
            </div>
            {modeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={modeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {modeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                      border: 'none', 
                      borderRadius: '12px',
                      color: '#fff'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-gray-400">
                No data available
              </div>
            )}
          </motion.div>

          {/* Word Count Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              <h3 className="text-gray-900 dark:text-white">Word Count Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={wordDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="range" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="count" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white"
        >
          <h3 className="text-white mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4">
              <p className="text-white/80 mb-2">Most Active Day</p>
              <p className="text-white">
                {activityData.reduce((max, day) => day.count > max.count ? day : max, activityData[0]).date}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4">
              <p className="text-white/80 mb-2">Preferred Mode</p>
              <p className="text-white">
                {modeData.length > 0 ? modeData.reduce((max, mode) => mode.value > max.value ? mode : max, modeData[0]).name : 'N/A'}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4">
              <p className="text-white/80 mb-2">Avg Words/Summary</p>
              <p className="text-white">
                {summaries.length > 0 ? Math.round(totalWords / summaries.length) : 0}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
