
import React, { useState } from 'react';
import { X, Wand2, BarChart3, Search, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Task {
  id: string;
  title: string;
}

interface NewTaskModalProps {
  onClose: () => void;
  onCreateTask: (task: Task) => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({ onClose, onCreateTask }) => {
  const [taskDescription, setTaskDescription] = useState('');

  const categories = [
    { name: 'Recommend', color: 'bg-red-500', count: 10 },
    { name: 'Featured', color: 'bg-blue-500', count: 11 },
    { name: 'Life', color: 'bg-red-400', count: 12 },
    { name: 'Research', color: 'bg-green-500', count: 13 },
    { name: 'Education', color: 'bg-blue-600', count: 14 },
    { name: 'Data Analysis', color: 'bg-orange-500', count: 15 },
    { name: 'Productivity', color: 'bg-purple-500', count: 16 },
    { name: 'Content Creator', color: 'bg-teal-500', count: 17 },
    { name: 'IT & Development', color: 'bg-pink-500', count: 18 }
  ];

  const quickActions = [
    { icon: Wand2, label: 'Create', color: 'text-purple-600' },
    { icon: BarChart3, label: 'Analyze', color: 'text-blue-600' },
    { icon: Search, label: 'Research', color: 'text-green-600' },
    { icon: Code2, label: 'Code', color: 'text-orange-600' }
  ];

  const handleCreateTask = () => {
    if (taskDescription.trim()) {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: taskDescription
      };
      onCreateTask(newTask);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateTask();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Hello juan pablo valastro
            </h1>
            <h2 className="text-xl text-muted-foreground">
              What can I do for you?
            </h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-8">
          {/* Task Input */}
          <div className="text-center">
            <div className="max-w-2xl mx-auto">
              <Input
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Give Manus a task to work on..."
                className="text-lg py-6 border-2 border-blue-200 focus:border-blue-500 rounded-xl"
              />
              {taskDescription && (
                <Button 
                  onClick={handleCreateTask}
                  className="mt-4 px-8 py-2 bg-blue-600 hover:bg-blue-700"
                >
                  Start Task
                </Button>
              )}
            </div>
          </div>

          {/* Mode Buttons */}
          <div className="flex justify-center gap-4">
            <Button variant="default" className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              Standard
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <div className="w-4 h-4 bg-pink-500 rounded"></div>
              Premium Mode
            </Button>
            <div className="text-sm text-muted-foreground flex items-center">
              0 + 174 credits
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  {category.name}
                  <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-xs">
                    #{category.count}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="flex flex-col items-center gap-2 p-6 h-auto"
                >
                  <action.icon className={`h-8 w-8 ${action.color}`} />
                  <span>{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Examples Gallery */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Featured Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Website Builder', 'Data Analysis', 'Content Creation'].map((example) => (
                <div key={example} className="border border-border rounded-lg p-4">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h4 className="font-medium text-foreground">{example}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Turn anything into websites!
                  </p>
                  <Button variant="outline" size="sm">
                    View space
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
