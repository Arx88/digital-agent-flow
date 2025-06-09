
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
      "bg-manus-light border-r border-manus-border flex flex-col transition-width",
      collapsed ? "sidebar-width-collapsed" : "sidebar-width"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-manus-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="p-2 hover-scale focus-ring"
          >
            <Menu className="h-4 w-4" />
          </Button>
          {!collapsed && (
            <Button
              onClick={onNewTask}
              className="btn-success flex items-center gap-2 text-sm font-medium hover-lift transition-all-300"
            >
              <Plus className="h-4 w-4" />
              New task
              <span className="text-xs opacity-70 ml-1">⌘K</span>
            </Button>
          )}
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto p-2">
        {!collapsed ? (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onTaskSelect(task.id)}
                className={cn(
                  "task-item group",
                  activeTaskId === task.id && "active"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg">{task.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2">
                      {task.title}
                    </h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {task.timestamp}
                      </span>
                      <div className={cn(
                        "status-indicator",
                        task.status === 'active' && "status-active",
                        task.status === 'completed' && "status-completed",
                        task.status === 'error' && "status-error"
                      )} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onTaskSelect(task.id)}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-all-300 hover-scale flex justify-center",
                  activeTaskId === task.id 
                    ? "bg-manus-blue/10 text-manus-blue" 
                    : "hover:bg-muted/50"
                )}
                title={task.title}
              >
                <span className="text-lg">{task.avatar}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-manus-border">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover-lift transition-all-300">
            <div className="flex items-center gap-2 text-manus-blue text-sm">
              <Users className="h-4 w-4" />
              <span className="font-medium">Share Manus with a friend</span>
            </div>
            <p className="text-xs text-manus-blue/80 mt-1">Get 500 credits each</p>
          </div>
        </div>
      )}
    </div>
  );
};
