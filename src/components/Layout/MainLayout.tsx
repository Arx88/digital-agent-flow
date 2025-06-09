
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ConversationArea } from './ConversationArea';
import { AgentPanel } from './AgentPanel';
import { NewTaskModal } from '../Modals/NewTaskModal';

export const MainLayout = () => {
  const [activeTaskId, setActiveTaskId] = useState<string>('task-1');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar 
        activeTaskId={activeTaskId}
        onTaskSelect={setActiveTaskId}
        onNewTask={() => setShowNewTaskModal(true)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex min-h-screen">
        <div className="flex-1 conversation-max-width mx-auto">
          <ConversationArea 
            taskId={activeTaskId}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>
        <div className="agent-panel-width">
          <AgentPanel taskId={activeTaskId} />
        </div>
      </div>

      {showNewTaskModal && (
        <NewTaskModal 
          onClose={() => setShowNewTaskModal(false)}
          onCreateTask={(task) => {
            setActiveTaskId(task.id);
            setShowNewTaskModal(false);
          }}
        />
      )}
    </div>
  );
};
