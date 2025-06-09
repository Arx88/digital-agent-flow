
import React from 'react';
import { Plus, Menu, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  timestamp: string;
  status: 'active' | 'completed' | 'error';
  avatar?: string;
}

interface SidebarProps {
  activeTaskId: string;
  onTaskSelect: (taskId: string) => void;
  onNewTask: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTaskId,
  onTaskSelect,
  onNewTask,
  collapsed,
  onToggleCollapse
}) => {
  const tasks: Task[] = [
    {
      id: 'task-1',
      title: 'Crear un pequeño sitio web sobre gatos',
      timestamp: '08:25',
      status: 'active',
      avatar: '🤖'
    },
    {
      id: 'task-2',
      title: 'Página web sobre gatos con...',
      timestamp: '08:24',
      status: 'completed',
      avatar: '📄'
    },
    {
      id: 'task-3',
      title: 'How to improve Mitosis Project...',
      timestamp: 'Sat',
      status: 'error',
      avatar: '⚠️'
    }
  ];

  return (
    <div className={cn(
      "bg-muted/30 border-r border-border flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-80"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="p-2"
          >
            <Menu className="h-4 w-4" />
          </Button>
          {!collapsed && (
            <Button
              onClick={onNewTask}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
            >
              <Plus className="h-4 w-4" />
              New task
              <span className="text-xs opacity-70 ml-2">⌘K</span>
            </Button>
          )}
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto p-2">
        {!collapsed && (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onTaskSelect(task.id)}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-all duration-200",
                  "hover:bg-muted/50",
                  activeTaskId === task.id 
                    ? "bg-blue-50 border-l-4 border-blue-500 text-blue-900" 
                    : "text-muted-foreground"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg">{task.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 text-foreground">
                      {task.title}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        {task.timestamp}
                      </span>
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        task.status === 'active' && "bg-blue-500 animate-pulse",
                        task.status === 'completed' && "bg-green-500",
                        task.status === 'error' && "bg-red-500"
                      )} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-blue-700 text-sm">
              <Users className="h-4 w-4" />
              <span className="font-medium">Share Manus with a friend</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">Get 500 credits each</p>
          </div>
        </div>
      )}
    </div>
  );
};
