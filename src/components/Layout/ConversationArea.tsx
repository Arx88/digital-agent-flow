
import React, { useState } from 'react';
import { Share, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageList } from '../MessageList';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ConversationAreaProps {
  taskId: string;
  onToggleSidebar: () => void;
}

export const ConversationArea: React.FC<ConversationAreaProps> = ({
  taskId,
  onToggleSidebar
}) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toolIcons = [
    { color: 'bg-manus-red', label: 'Development' },
    { color: 'bg-manus-blue', label: 'Design' },
    { color: 'bg-manus-green', label: 'Testing' },
    { color: 'bg-manus-yellow', label: 'Documentation' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b border-manus-border p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="lg:hidden hover-scale focus-ring"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">
              Crear un pequeño sitio web sobre gatos
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 hover-lift transition-all-300"
            >
              <Share className="h-4 w-4" />
              Share
              <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-xs">
                6
              </span>
            </Button>
            <div className="flex gap-1">
              {toolIcons.map((tool, index) => (
                <div 
                  key={index}
                  className={cn(
                    "w-6 h-6 rounded cursor-pointer hover-scale transition-transform",
                    tool.color
                  )}
                  title={tool.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Conversation Area */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <MessageList taskId={taskId} />
        </div>
      </ScrollArea>

      {/* Fixed Message Input */}
      <div className="border-t border-manus-border p-4 flex-shrink-0">
        <div className="flex gap-3">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Send message to Manus"
            className="flex-1 focus-ring"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="px-6 btn-primary hover-scale"
          >
            →
          </Button>
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
          <span>Press Enter to send, Shift + Enter for new line</span>
          <span className={cn(
            message.length > 1900 ? 'text-manus-red' : 
            message.length > 1500 ? 'text-manus-yellow' : ''
          )}>
            {message.length}/2000
          </span>
        </div>
      </div>
    </div>
  );
};
