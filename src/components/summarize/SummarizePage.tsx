import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  Wand2, 
  CheckCircle2,
  Clock,
  TrendingUp,
  List,
  Copy,
  Download,
  Share2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';
import { summarizeText } from '../../lib/gemini';

type SummaryMode = 'brief' | 'detailed' | 'bullet' | 'action';

const summaryModes = [
  { id: 'brief' as SummaryMode, label: 'Brief', icon: Sparkles, description: 'Quick overview' },
  { id: 'detailed' as SummaryMode, label: 'Detailed', icon: FileText, description: 'Comprehensive analysis' },
  { id: 'bullet' as SummaryMode, label: 'Bullet Points', icon: List, description: 'Key highlights' },
  { id: 'action' as SummaryMode, label: 'Action Items', icon: CheckCircle2, description: 'Actionable tasks' },
];

export function SummarizePage() {
  const [chatInput, setChatInput] = useState('');
  const [selectedMode, setSelectedMode] = useState<SummaryMode>('brief');
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  const handleSummarize = async () => {
    if (!chatInput.trim()) {
      toast.error('Please enter some text to summarize');
      return;
    }

    setIsProcessing(true);
    setShowSummary(false);

    const result = await summarizeText(chatInput, selectedMode);

    if (result.startsWith("Error:")) {
      toast.error(result);
      setSummary('');
    } else {
      toast.success('Summary generated successfully!');
      setSummary(result);
    }
    
    setShowSummary(true);
    setIsProcessing(false);
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    toast.success('Copied to clipboard!');
  };

  const handleDownload = () => {
    if (!summary) return;
    const element = document.createElement('a');
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'summary.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Summarization</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Transform lengthy conversations into concise, actionable summaries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Input Chat or Conversation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="paste" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl p-1">
                    <TabsTrigger value="paste" className="rounded-lg">Paste Text</TabsTrigger>
                    <TabsTrigger value="upload" className="rounded-lg">Upload File</TabsTrigger>
                  </TabsList>
                  <TabsContent value="paste" className="mt-4">
                    <Textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Paste your chat conversation or meeting notes here..."
                      className="min-h-[300px] bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-xl resize-none"
                    />
                  </TabsContent>
                  <TabsContent value="upload" className="mt-4">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Drop your file here or click to browse
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        Supports .txt, .doc, .pdf files
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <AnimatePresence>
              {showSummary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-gray-900 dark:text-white flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Generated Summary
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopy}
                            className="rounded-xl"
                            disabled={!summary}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDownload}
                            className="rounded-xl"
                            disabled={!summary}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                            disabled={!summary}
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl">
                        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                          {summary || 'The summary will appear here. If you see an error, please check your API key.'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Summary Mode</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {summaryModes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <motion.button
                      key={mode.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        selectedMode === mode.id
                          ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border-2 border-blue-500 dark:border-blue-400 shadow-lg'
                          : 'bg-gray-50/50 dark:bg-gray-800/50 border-2 border-transparent hover:bg-gray-100/50 dark:hover:bg-gray-800/70'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`w-5 h-5 mt-0.5 ${
                          selectedMode === mode.id
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-400'
                        }`} />
                        <div>
                          <p className={`font-semibold ${
                            selectedMode === mode.id
                              ? 'text-gray-900 dark:text-white'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {mode.label}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {mode.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </CardContent>
            </Card>

            <Button
              onClick={handleSummarize}
              disabled={isProcessing || !chatInput.trim()}
              className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold"
            >
              {isProcessing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2 inline-block"
                  />
                  Processing...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2 inline-block" />
                  Generate Summary
                </>
              )}
            </Button>

            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 opacity-90">
                    <Clock className="w-5 h-5" />
                    <span>Avg. Time</span>
                  </div>
                  <span className="font-semibold">2.3s</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 opacity-90">
                    <TrendingUp className="w-5 h-5" />
                    <span>Accuracy</span>
                  </div>
                  <span className="font-semibold">99.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 opacity-90">
                    <Sparkles className="w-5 h-5" />
                    <span>Credits Left</span>
                  </div>
                  <span className="font-semibold">847</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
