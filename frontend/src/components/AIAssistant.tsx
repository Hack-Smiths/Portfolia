import { useState } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: "Hi! I'm your AI Assistant 🤖 I can help you optimize your portfolio, suggest improvements, and write compelling descriptions. What would you like to work on?",
    },
  ]);

  const suggestions = [
    "Help me write a better project description",
    "Suggest skills to add for web development",
    "Improve my portfolio summary",
    "What achievements should I highlight?",
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, 
        { type: 'user', message },
        { type: 'ai', message: 'This feature is currently under development. We\'re working hard to bring you AI-powered assistance soon! 🚧' }
      ]);
      setMessage('');
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        className="fab bg-gradient-primary glow-primary"
        onClick={() => setIsOpen(true)}
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* AI Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div className="w-full max-w-md h-96 animate-scale-in">
            <Card className="glass-card h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">AI Assistant</h3>
                    <p className="text-xs text-foreground-muted">Always here to help</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

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
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="block w-full text-left p-2 text-xs bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setMessage(suggestion)}
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
                    placeholder="Ask me anything..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button size="sm" className="btn-primary" onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;