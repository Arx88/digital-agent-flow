
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CodeEditor } from '../CodeEditor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentPanelProps {
  taskId: string;
  onCollapse?: () => void;
}

export const AgentPanel: React.FC<AgentPanelProps> = ({ taskId, onCollapse }) => {
  const [currentStatus, setCurrentStatus] = useState('Desarrollo del sitio web');
  const [currentFile, setCurrentFile] = useState('sitio_gatos/styles.css');
  const [timeElapsed, setTimeElapsed] = useState('1:20');
  const [isLive, setIsLive] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    // Simulate time updates
    const interval = setInterval(() => {
      const [minutes, seconds] = timeElapsed.split(':').map(Number);
      const totalSeconds = minutes * 60 + seconds + 1;
      const newMinutes = Math.floor(totalSeconds / 60);
      const newSeconds = totalSeconds % 60;
      setTimeElapsed(`${newMinutes}:${newSeconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeElapsed]);

  return (
    <div className={cn(
      "h-full border-l border-manus-border bg-background flex flex-col",
      isMaximized && "fixed inset-0 z-50 border-l-0"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-manus-border flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-foreground text-base">Manus's Computer</h2>
          <div className="flex items-center gap-2">
            {isLive && (
              <div className="live-indicator">
                <div className="live-dot"></div>
                <span className="text-xs text-manus-blue font-medium">live</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMaximized(!isMaximized)}
              className="h-6 w-6 p-0 hover-scale"
            >
              {isMaximized ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
            </Button>
            {onCollapse && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onCollapse}
                className="h-6 w-6 p-0 hover-scale"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <div className="font-medium">{currentStatus}</div>
          <div className="text-xs mt-1">
            {timeElapsed} Editing file {currentFile}
          </div>
        </div>
      </div>

      {/* Scrollable Code Editor */}
      <ScrollArea className="flex-1">
        <div className="h-full">
          <CodeEditor 
            file={currentFile}
            language="css"
            readOnly={true}
          />
        </div>
      </ScrollArea>

      {/* Controls */}
      <div className="p-4 border-t border-manus-border flex-shrink-0">
        <div className="flex gap-2 mb-3">
          <Button variant="outline" size="sm" className="hover-scale transition-transform">
            Diff
          </Button>
          <Button variant="outline" size="sm" className="hover-scale transition-transform">
            Original
          </Button>
          <Button variant="outline" size="sm" className="hover-scale transition-transform">
            Modified
          </Button>
        </div>
        <div className="flex gap-1">
          {[15, 19, 20, 21, 22].map((num) => (
            <Button 
              key={num} 
              variant={num === 20 ? "default" : "ghost"} 
              size="sm" 
              className={cn(
                "text-xs hover-scale transition-transform",
                num === 20 && "bg-manus-blue text-white"
              )}
            >
              {num}
            </Button>
          ))}
        </div>
        <div className="text-center text-sm text-muted-foreground mt-2">
          3 / 5
        </div>
      </div>
    </div>
  );
};
