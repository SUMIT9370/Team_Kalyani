import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, Link2, Sparkles, Loader2, CheckCircle, Zap, Brain, List } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import type { Summary } from '../App';

type UploadAreaProps = {
  onSummaryCreated: (summary: Summary) => void;
};

type SummarizationMode = 'quick' | 'detailed' | 'bullet';

export default function UploadArea({ onSummaryCreated }: UploadAreaProps) {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [mode, setMode] = useState<SummarizationMode>('quick');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'text' | 'url'>('text');

  const modes = [
    { id: 'quick', label: 'Quick', icon: Zap, description: 'Fast overview' },
    { id: 'detailed', label: 'Detailed', icon: Brain, description: 'In-depth analysis' },
    { id: 'bullet', label: 'Bullet Points', icon: List, description: 'Key points' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const generateSummary = (originalText: string, mode: SummarizationMode): string => {
    // Mock AI summarization based on mode
    const sentences = originalText.split(/[.!?]+/).filter(s => s.trim());
    
    if (mode === 'quick') {
      return sentences.slice(0, 2).join('. ') + '.';
    } else if (mode === 'bullet') {
      return sentences.slice(0, 5).map((s, i) => `• ${s.trim()}`).join('\n');
    } else {
      // Detailed
      const chunks = [];
      for (let i = 0; i < Math.min(sentences.length, 6); i += 2) {
        chunks.push(sentences.slice(i, i + 2).join('. ') + '.');
      }
      return chunks.join('\n\n');
    }
  };

  const handleSummarize = async () => {
    const contentToSummarize = uploadMethod === 'text' ? text : url;
    if (!contentToSummarize.trim()) return;

    setIsProcessing(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const summary: Summary = {
      id: Date.now().toString(),
      title: contentToSummarize.slice(0, 50) + (contentToSummarize.length > 50 ? '...' : ''),
      originalText: contentToSummarize,
      summary: generateSummary(contentToSummarize, mode),
      mode: modes.find(m => m.id === mode)?.label || 'Quick',
      wordCount: contentToSummarize.split(/\s+/).length,
      timestamp: Date.now(),
    };

    setIsProcessing(false);
    onSummaryCreated(summary);
  };

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-gray-900 dark:text-white mb-2">Create New Summary</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload your content and let AI create intelligent summaries
          </p>
        </motion.div>

        {/* Upload Method Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4"
        >
          <motion.button
            onClick={() => setUploadMethod('text')}
            className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
              uploadMethod === 'text'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 hover:border-blue-300'
            } backdrop-blur-xl`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className={`w-6 h-6 mx-auto mb-2 ${uploadMethod === 'text' ? 'text-blue-600' : 'text-gray-400'}`} />
            <p className={uploadMethod === 'text' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}>
              Paste Text
            </p>
          </motion.button>

          <motion.button
            onClick={() => setUploadMethod('url')}
            className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
              uploadMethod === 'url'
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 hover:border-purple-300'
            } backdrop-blur-xl`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link2 className={`w-6 h-6 mx-auto mb-2 ${uploadMethod === 'url' ? 'text-purple-600' : 'text-gray-400'}`} />
            <p className={uploadMethod === 'url' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'}>
              From URL
            </p>
          </motion.button>
        </motion.div>

        {/* Content Input */}
        <AnimatePresence mode="wait">
          {uploadMethod === 'text' ? (
            <motion.div
              key="text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-4">
                  Paste your text or upload a file
                </label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your chat conversation, meeting notes, or any text you want to summarize..."
                  className="min-h-[300px] bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-xl resize-none"
                />
                <div className="mt-4 flex items-center justify-between">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".txt,.md"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <span className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                      <Upload className="w-4 h-4" />
                      Upload File
                    </span>
                  </label>
                  <span className="text-gray-500 dark:text-gray-400">
                    {text.split(/\s+/).filter(w => w).length} words
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="url"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6"
            >
              <label className="block text-gray-700 dark:text-gray-300 mb-4">
                Enter URL to article or document
              </label>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                className="bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-xl h-12"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summarization Mode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-gray-700 dark:text-gray-300 mb-4">
            Summarization Mode
          </label>
          <div className="grid grid-cols-3 gap-4">
            {modes.map((modeOption) => {
              const Icon = modeOption.icon;
              return (
                <motion.button
                  key={modeOption.id}
                  onClick={() => setMode(modeOption.id as SummarizationMode)}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    mode === modeOption.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 hover:border-blue-300'
                  } backdrop-blur-xl`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${mode === modeOption.id ? 'text-blue-600' : 'text-gray-400'}`} />
                  <p className={`mb-1 ${mode === modeOption.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                    {modeOption.label}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {modeOption.description}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleSummarize}
            disabled={isProcessing || (!text && !url)}
            className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Summary
              </>
            )}
          </Button>
        </motion.div>

        {/* Processing Animation */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-4 border-white/30 border-t-white mx-auto mb-4"
              />
              <h3 className="text-white mb-2">AI is analyzing your content...</h3>
              <p className="text-white/80">This will only take a moment</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
