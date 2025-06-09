
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ConversationArea } from './ConversationArea';
import { AgentPanel } from './AgentPanel';
import { NewTaskModal } from '../Modals/NewTaskModal';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

export const MainLayout = () => {
  const [activeTaskId, setActiveTaskId] = useState<string>('task-1');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [agentPanelCollapsed, setAgentPanelCollapsed] = useState(false);

  return (
    <div className="h-screen bg-background flex w-full overflow-hidden">
      <Sidebar 
        activeTaskId={activeTaskId}
        onTaskSelect={setActiveTaskId}
        onNewTask={() => setShowNewTaskModal(true)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Resizable Content Area - Full Height */}
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={70} minSize={50}>
            <ConversationArea 
              taskId={activeTaskId}
              onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
          </ResizablePanel>
          
          {!agentPanelCollapsed && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                <AgentPanel 
                  taskId={activeTaskId} 
                  onCollapse={() => setAgentPanelCollapsed(true)}
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>

        {/* Floating toggle button when agent panel is collapsed */}
        {agentPanelCollapsed && (
          <button
            onClick={() => setAgentPanelCollapsed(false)}
            className="fixed right-4 top-1/2 -translate-y-1/2 bg-manus-blue text-white p-2 rounded-l-lg shadow-lg hover:bg-manus-blue/90 transition-colors z-20"
          >
            ←
          </button>
        )}
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
