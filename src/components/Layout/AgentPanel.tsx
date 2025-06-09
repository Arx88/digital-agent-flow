
import React, { useState, useEffect } from 'react';
import { CodeEditor } from '../CodeEditor';

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
    <div className="w-96 border-l border-border bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-foreground">Manus's Computer</h2>
          {isLive && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-blue-600 font-medium">live</span>
            </div>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          <div className="font-medium">Manus is working: {currentStatus}</div>
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
      <div className="p-4 border-t border-border">
        <div className="flex gap-2 mb-3">
          <Button variant="outline" size="sm">Diff</Button>
          <Button variant="outline" size="sm">Original</Button>
          <Button variant="outline" size="sm">Modified</Button>
        </div>
        <div className="flex gap-1">
          {[15, 19, 20, 21, 22].map((num) => (
            <Button 
              key={num} 
              variant={num === 20 ? "default" : "ghost"} 
              size="sm" 
              className="text-xs"
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
