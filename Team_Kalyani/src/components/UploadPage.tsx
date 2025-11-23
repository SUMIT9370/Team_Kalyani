import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Summary } from '../App';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  Loader2,
  Copy,
  Check
} from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

type UploadPageProps = {
  onCreateSummary: (summary: Summary) => void;
};

type SummaryMode = 'brief' | 'detailed' | 'bullet' | 'technical';

const modes = [
  { 
    value: 'brief' as SummaryMode, 
    label: 'Brief', 
    desc: 'Quick overview in 2-3 sentences',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    value: 'detailed' as SummaryMode, 
    label: 'Detailed', 
    desc: 'Comprehensive analysis with context',
    color: 'from-purple-500 to-purple-600'
  },
  { 
    value: 'bullet' as SummaryMode, 
    label: 'Bullet Points', 
    desc: 'Key points in a list format',
    color: 'from-green-500 to-green-600'
  },
  { 
    value: 'technical' as SummaryMode, 
    label: 'Technical', 
    desc: 'Technical details and specifications',
    color: 'from-orange-500 to-orange-600'
  },
];

export function UploadPage({ onCreateSummary }: UploadPageProps) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<SummaryMode>('brief');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText(content);
      };
      reader.readAsText(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText(content);
      };
      reader.readAsText(file);
    }
  };

  const generateSummary = (text: string, mode: SummaryMode): string => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.trim().length > 0);
    
    switch (mode) {
      case 'brief':
        return sentences.slice(0, 3).join('. ') + '.';
      
      case 'detailed':
        const detailed = sentences.slice(0, Math.min(8, sentences.length)).join('. ');
        return `${detailed}. This comprehensive analysis covers the key aspects discussed in the original text, providing context and relevant details for better understanding.`;
      
      case 'bullet':
        const points = sentences.slice(0, 5).map((s, i) => `• ${s.trim()}`);
        return points.join('\n');
      
      case 'technical':
        const technical = sentences.slice(0, 5).join('. ');
        return `${technical}. Technical specifications and implementation details are highlighted for precise understanding.`;
      
      default:
        return sentences.slice(0, 3).join('. ') + '.';
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to summarize');
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const summary: Summary = {
      id: Date.now().toString(),
      title: text.slice(0, 50) + (text.length > 50 ? '...' : ''),
      originalText: text,
      summary: generateSummary(text, mode),
      mode,
      createdAt: new Date(),
      wordCount: text.split(/\s+/).filter(w => w.trim().length > 0).length,
      timesSaved: 0
    };

    setIsProcessing(false);
    onCreateSummary(summary);
    toast.success('Summary created successfully!');
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Text pasted from clipboard');
    } catch (err) {
      toast.error('Failed to paste from clipboard');
    }
  };

  const wordCount = text.split(/\s+/).filter(w => w.trim().length > 0).length;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl dark:text-white">Create New Summary</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Upload, paste, or type your content to get started
        </p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-2 border-dashed
            transition-all duration-300 p-12 text-center
            ${dragActive 
              ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 scale-105' 
              : 'border-white/20 dark:border-white/10'
            }
          `}
        >
          <div className="space-y-4">
            <motion.div
              animate={{ y: dragActive ? -10 : 0 }}
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto"
            >
              <Upload className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h3 className="text-xl dark:text-white mb-2">
                {dragActive ? 'Drop your file here' : 'Drop your file or click to upload'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Supports .txt, .doc, .docx, .pdf files
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={() => document.getElementById('file-upload')?.click()}
                variant="outline"
                className="bg-white/50 dark:bg-white/5"
              >
                <FileText className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              <Button
                onClick={handlePaste}
                variant="outline"
                className="bg-white/50 dark:bg-white/5"
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Paste from Clipboard
              </Button>
            </div>
            <input
              id="file-upload"
              type="file"
              accept=".txt,.doc,.docx,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </Card>
      </motion.div>

      {/* Text Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <Label htmlFor="text">Or type/paste your text here</Label>
        <Textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter the text you want to summarize..."
          className="min-h-[300px] backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-white/20 dark:border-white/10 resize-none"
        />
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>{wordCount} words</span>
          <span>~{Math.ceil(wordCount / 200)} min read</span>
        </div>
      </motion.div>

      {/* Mode Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <Label>Summarization Mode</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {modes.map((m) => (
            <motion.button
              key={m.value}
              onClick={() => setMode(m.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                p-4 rounded-2xl border-2 transition-all text-left
                ${mode === m.value
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-500'
                  : 'backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-white/20 dark:border-white/10'
                }
              `}
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${m.color} flex items-center justify-center mb-2`}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h4 className="dark:text-white mb-1">{m.label}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">{m.desc}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          onClick={handleSubmit}
          disabled={!text.trim() || isProcessing}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-purple-500/50 py-6"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing with AI...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Summary
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
