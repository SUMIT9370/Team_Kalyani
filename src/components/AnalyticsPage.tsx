import { motion } from 'motion/react';
import { Summary } from '../App';
import { 
  TrendingUp, 
  FileText, 
  Clock, 
  Zap,
  Calendar,
  BarChart3
} from 'lucide-react';
import { Card } from './ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

type AnalyticsPageProps = {
  summaries: Summary[];
};

export function AnalyticsPage({ summaries }: AnalyticsPageProps) {
  // Calculate analytics data
  const totalSummaries = summaries.length;
  const totalWords = summaries.reduce((acc, s) => acc + s.wordCount, 0);
  const avgWords = totalSummaries > 0 ? Math.round(totalWords / totalSummaries) : 0;
  const timeSaved = Math.round(totalWords / 200);

  // Mode distribution
  const modeData = [
    { name: 'Brief', value: summaries.filter(s => s.mode === 'brief').length, color: '#3b82f6' },
    { name: 'Detailed', value: summaries.filter(s => s.mode === 'detailed').length, color: '#8b5cf6' },
    { name: 'Bullet', value: summaries.filter(s => s.mode === 'bullet').length, color: '#10b981' },
    { name: 'Technical', value: summaries.filter(s => s.mode === 'technical').length, color: '#f59e0b' },
  ].filter(d => d.value > 0);

  // Daily activity
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const dailyData = last7Days.map(date => {
    const count = summaries.filter(s => {
      const summaryDate = new Date(s.createdAt);
      return summaryDate.toDateString() === date.toDateString();
    }).length;
    
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      summaries: count
    };
  });

  // Word count distribution
  const wordCountData = summaries.slice(0, 10).map(s => ({
    title: s.title.slice(0, 20) + '...',
    words: s.wordCount
  }));

  const stats = [
    { 
      icon: FileText, 
      label: 'Total Summaries', 
      value: totalSummaries,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-500/10'
    },
    { 
      icon: Zap, 
      label: 'Words Processed', 
      value: totalWords.toLocaleString(),
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-500/10'
    },
    { 
      icon: BarChart3, 
      label: 'Avg Words/Summary', 
      value: avgWords,
      color: 'from-green-500 to-green-600',
      bg: 'bg-green-500/10'
    },
    { 
      icon: Clock, 
      label: 'Time Saved', 
      value: `${timeSaved}h`,
      color: 'from-orange-500 to-orange-600',
      bg: 'bg-orange-500/10'
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl dark:text-white">Analytics & Insights</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Track your summarization activity and productivity
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Card className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-white/20 dark:border-white/10 p-6 space-y-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" style={{ 
                  background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-3xl dark:text-white">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-white/20 dark:border-white/10 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl dark:text-white">Daily Activity</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af" 
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="summaries" fill="url(#blueGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Mode Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-white/20 dark:border-white/10 p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl dark:text-white">Mode Distribution</h2>
            </div>
            {modeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={modeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${entry.value}`}
                  >
                    {modeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                No data available
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Word Count Distribution */}
      {wordCountData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-white/20 dark:border-white/10 p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h2 className="text-xl dark:text-white">Word Count by Summary</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wordCountData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis 
                  dataKey="title" 
                  stroke="#9ca3af" 
                  style={{ fontSize: '12px' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="words" fill="url(#greenGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
