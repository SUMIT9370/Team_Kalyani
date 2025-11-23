import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, FileText, Clock, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
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
  Legend,
  ResponsiveContainer,
} from 'recharts';

const usageData = [
  { name: 'Mon', summaries: 12, timesSaved: 45 },
  { name: 'Tue', summaries: 19, timesSaved: 67 },
  { name: 'Wed', summaries: 15, timesSaved: 54 },
  { name: 'Thu', summaries: 22, timesSaved: 78 },
  { name: 'Fri', summaries: 28, timesSaved: 95 },
  { name: 'Sat', summaries: 8, timesSaved: 28 },
  { name: 'Sun', summaries: 10, timesSaved: 35 },
];

const categoryData = [
  { name: 'Meetings', value: 45, color: '#3b82f6' },
  { name: 'Support', value: 30, color: '#8b5cf6' },
  { name: 'Projects', value: 15, color: '#ec4899' },
  { name: 'Others', value: 10, color: '#f59e0b' },
];

const stats = [
  { label: 'Total Summaries', value: '127', change: '+12.5%', icon: FileText },
  { label: 'Active Users', value: '1.2K', change: '+8.3%', icon: Users },
  { label: 'Time Saved', value: '48h', change: '+15.2%', icon: Clock },
  { label: 'Success Rate', value: '99.2%', change: '+2.1%', icon: TrendingUp },
];

export function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-gray-900 dark:text-white mb-2">Analytics & Insights</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your summarization performance and usage patterns
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
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
                <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
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

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Usage Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Weekly Usage Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
                        border: 'none',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="summaries"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="timesSaved"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ fill: '#8b5cf6', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Summary Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
                        border: 'none',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Processing Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
                        border: 'none',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="summaries" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="timesSaved" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl">
            <CardContent className="p-6">
              <h3 className="mb-2">Peak Hours</h3>
              <p className="text-white/90 mb-4">Most active: 9 AM - 12 PM</p>
              <div className="text-white/75">Monday - Friday</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl">
            <CardContent className="p-6">
              <h3 className="mb-2">Avg. Length</h3>
              <p className="text-white/90 mb-4">2,450 characters</p>
              <div className="text-white/75">Per conversation</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl">
            <CardContent className="p-6">
              <h3 className="mb-2">Top Mode</h3>
              <p className="text-white/90 mb-4">Brief Summary</p>
              <div className="text-white/75">65% of all summaries</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
