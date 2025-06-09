
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CodeEditor } from '../CodeEditor';
import { cn } from '@/lib/utils';

interface AgentPanelProps {
  taskId: string;
}

export const AgentPanel: React.FC<AgentPanelProps> = ({ taskId }) => {
  const [currentStatus, setCurrentStatus] = useState('Desarrollo del sitio web');
  const [currentFile, setCurrentFile] = useState('sitio_gatos/styles.css');
  const [timeElapsed, setTimeElapsed] = useState('1:20');
  const [isLive, setIsLive] = useState(true);

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
    <div className="h-full border-l border-manus-border bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-manus-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-foreground text-base">Manus's Computer</h2>
          {isLive && (
            <div className="live-indicator">
              <div className="live-dot"></div>
              <span className="text-xs text-manus-blue font-medium">live</span>
            </div>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          <div className="font-medium">{currentStatus}</div>
          <div className="text-xs mt-1">
            {timeElapsed} Editing file {currentFile}
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 overflow-hidden">
        <CodeEditor 
          file={currentFile}
          language="css"
          readOnly={true}
        />
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-manus-border">
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
