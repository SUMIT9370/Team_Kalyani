import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Eye, 
  Star,
  Clock,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface Summary {
  id: string;
  title: string;
  preview: string;
  date: string;
  type: string;
  mode: string;
  isFavorite: boolean;
  wordCount: number;
}

const mockHistory: Summary[] = [
  {
    id: '1',
    title: 'Q4 Strategy Meeting',
    preview: 'Discussed quarterly goals, budget allocation, and team expansion plans...',
    date: '2 hours ago',
    type: 'Meeting',
    mode: 'Detailed',
    isFavorite: true,
    wordCount: 450
  },
  {
    id: '2',
    title: 'Customer Support Chat - Premium Features',
    preview: 'Customer inquired about upgrading to premium tier and available features...',
    date: '5 hours ago',
    type: 'Support',
    mode: 'Brief',
    isFavorite: false,
    wordCount: 280
  },
  {
    id: '3',
    title: 'Product Development Discussion',
    preview: 'Reviewed roadmap, feature priorities, and technical requirements...',
    date: '1 day ago',
    type: 'Project',
    mode: 'Bullet Points',
    isFavorite: true,
    wordCount: 320
  },
  {
    id: '4',
    title: 'Weekly Team Standup',
    preview: 'Team updates on current tasks, blockers, and upcoming milestones...',
    date: '2 days ago',
    type: 'Meeting',
    mode: 'Action Items',
    isFavorite: false,
    wordCount: 190
  },
  {
    id: '5',
    title: 'Client Feedback Session',
    preview: 'Collected client feedback on recent updates and feature requests...',
    date: '3 days ago',
    type: 'Meeting',
    mode: 'Detailed',
    isFavorite: false,
    wordCount: 520
  },
  {
    id: '6',
    title: 'Marketing Campaign Planning',
    preview: 'Planned Q4 marketing initiatives and budget allocation...',
    date: '4 days ago',
    type: 'Project',
    mode: 'Brief',
    isFavorite: true,
    wordCount: 380
  }
];

export function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [summaries, setSummaries] = useState(mockHistory);

  const toggleFavorite = (id: string) => {
    setSummaries(summaries.map(s => 
      s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
    ));
  };

  const filteredSummaries = summaries.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-gray-900 dark:text-white mb-2">Summary History</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse and manage your past summaries
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search summaries..."
              className="pl-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border-gray-200 dark:border-gray-700 rounded-xl h-12"
            />
          </div>
          <Button
            variant="outline"
            className="border-gray-200 dark:border-gray-700 rounded-xl h-12 bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl h-12">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4">
          {filteredSummaries.map((summary, index) => (
            <motion.div
              key={summary.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl hover:shadow-xl transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {summary.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                            {summary.preview}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleFavorite(summary.id)}
                          className="ml-4"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              summary.isFavorite
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-400'
                            }`}
                          />
                        </motion.button>
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{summary.date}</span>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                          {summary.type}
                        </Badge>
                        <Badge variant="outline" className="rounded-lg">
                          {summary.mode}
                        </Badge>
                        <span className="text-gray-500 dark:text-gray-400">
                          {summary.wordCount} words
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-lg"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-lg"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100/50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSummaries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-gray-900 dark:text-white mb-2">No summaries found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
