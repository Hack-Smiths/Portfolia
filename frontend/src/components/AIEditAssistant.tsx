import { useState } from 'react';
import { Bot, X, Send, Sparkles, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AIEditAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  section: string;
}

const AIEditAssistant = ({ isOpen, onClose, section }: AIEditAssistantProps) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: `Hi! I'm here to help you edit the ${section} section. 🤖 Choose a suggestion below or tell me what you'd like to change!`,
    },
  ]);

  const getSuggestions = (section: string) => {
    const suggestions = {
      'About Me': [
        "Make my description more professional",
        "Add personality to my bio",
        "Highlight my key strengths",
        "Make it more concise"
      ],
      'Projects': [
        "Improve project descriptions",
        "Add more technical details",
        "Make projects sound more impressive",
        "Suggest better project titles"
      ],
      'Skills': [
        "Add trending technologies",
        "Reorganize skill categories",
        "Suggest skill proficiency levels",
        "Add new programming languages"
      ],
      'Achievements': [
        "Make achievements more impactful",
        "Add quantifiable results",
        "Improve achievement descriptions",
        "Suggest new achievement categories"
      ],
      'Certificates': [
        "Add relevant certifications",
        "Organize by importance",
        "Suggest next certifications to get",
        "Improve certificate descriptions"
      ]
    };
    return suggestions[section] || [
      "Improve this section",
      "Make it more professional",
      "Add more details",
      "Reorganize content"
    ];
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    setChatHistory(prev => [
      ...prev,
      { type: 'user', message },
      { type: 'ai', message: `Great suggestion! I'll help you ${message.toLowerCase()}. Here's what I recommend for your ${section} section...` }
    ]);
    setMessage('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    handleSend();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[500px] p-0 glass-card">
        {/* Header */}
        <DialogHeader className="p-4 border-b border-white/20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <DialogTitle className="text-sm font-semibold">AI Editor</DialogTitle>
              <p className="text-xs text-foreground-muted">Editing: {section}</p>
            </div>
          </div>
        </DialogHeader>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    chat.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {chat.message}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="mt-4 space-y-2">
            <p className="text-xs text-foreground-muted font-medium">Quick suggestions:</p>
            {getSuggestions(section).map((suggestion, index) => (
              <button
                key={index}
                className="block w-full text-left p-2 text-xs bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Sparkles className="w-3 h-3 inline mr-1" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/20">
          <div className="flex space-x-2">
            <Input
              placeholder="Tell me what to change..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
            />
            <Button size="sm" className="btn-primary" onClick={handleSend}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIEditAssistant;