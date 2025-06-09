
import React, { useState } from 'react';
import { Share, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProgressIndicator } from '../ProgressIndicator';
import { MessageList } from '../MessageList';

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
      // Handle sending message
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

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">
              Crear un pequeño sitio web sobre gatos
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share className="h-4 w-4" />
              Share
              <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-xs">
                6
              </span>
            </Button>
            <div className="flex gap-1">
              <div className="w-6 h-6 bg-red-500 rounded"></div>
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
              <div className="w-6 h-6 bg-green-500 rounded"></div>
              <div className="w-6 h-6 bg-yellow-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          <MessageList taskId={taskId} />
          <ProgressIndicator />
        </div>

        {/* Message Input */}
        <div className="border-t border-border p-4">
          <div className="flex gap-3">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Send message to Manus"
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="px-6"
            >
              →
            </Button>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <span>Press Enter to send, Shift + Enter for new line</span>
            <span>{message.length}/2000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
