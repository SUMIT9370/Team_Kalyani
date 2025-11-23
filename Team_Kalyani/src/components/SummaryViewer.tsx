import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Copy, 
  Download, 
  Share2, 
  Edit3, 
  CheckCircle,
  FileText,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import type { Summary } from '../App';

type SummaryViewerProps = {
  summary: Summary;
  onUpdate: (summary: Summary) => void;
  onBack: () => void;
};

export default function SummaryViewer({ summary, onUpdate, onBack }: SummaryViewerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary.summary);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary.summary);
    toast.success('Copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([`${summary.title}\n\n${summary.summary}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summary-${Date.now()}.txt`;
    a.click();
    toast.success('Downloaded successfully!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: summary.title,
        text: summary.summary,
      });
    } else {
      handleCopy();
    }
  };

  const handleSave = () => {
    onUpdate({ ...summary, summary: editedSummary });
    setIsEditing(false);
    toast.success('Summary updated!');
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock regeneration with slight variation
    const newSummary = summary.summary + ' Additionally, this provides further insights.';
    setEditedSummary(newSummary);
    onUpdate({ ...summary, summary: newSummary });
    setIsRegenerating(false);
    toast.success('Summary regenerated!');
  };

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleCopy}
                variant="outline"
                className="rounded-xl border-gray-200 dark:border-gray-700"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="rounded-xl border-gray-200 dark:border-gray-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleShare}
                variant="outline"
                className="rounded-xl border-gray-200 dark:border-gray-700"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-white mb-1">AI Summary</h1>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-white/20 rounded-lg">
                      {summary.mode}
                    </span>
                    <span className="text-white/80">
                      {new Date(summary.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              {!isEditing && (
                <motion.button
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit3 className="w-5 h-5" />
                </motion.button>
              )}
            </div>
            <h2 className="text-white">{summary.title}</h2>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Summary */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-gray-700 dark:text-gray-300">Summary</label>
                {!isEditing && (
                  <motion.button
                    onClick={handleRegenerate}
                    disabled={isRegenerating}
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                    Regenerate
                  </motion.button>
                )}
              </div>
              
              {isEditing ? (
                <Textarea
                  value={editedSummary}
                  onChange={(e) => setEditedSummary(e.target.value)}
                  className="min-h-[200px] bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-xl resize-none"
                />
              ) : (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30">
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {summary.summary}
                  </p>
                </div>
              )}

              {isEditing && (
                <div className="flex gap-2 mt-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </motion.div>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      setEditedSummary(summary.summary);
                    }}
                    variant="outline"
                    className="rounded-xl border-gray-200 dark:border-gray-700"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-1">Original Words</p>
                <p className="text-gray-900 dark:text-white">{summary.wordCount}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-1">Summary Words</p>
                <p className="text-gray-900 dark:text-white">
                  {summary.summary.split(/\s+/).length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-1">Compression</p>
                <p className="text-gray-900 dark:text-white">
                  {Math.round((summary.summary.split(/\s+/).length / summary.wordCount) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Original Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-gray-400" />
            <h3 className="text-gray-900 dark:text-white">Original Text</h3>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 max-h-96 overflow-y-auto">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {summary.originalText}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
