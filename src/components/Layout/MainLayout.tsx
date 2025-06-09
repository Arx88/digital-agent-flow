
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ConversationArea } from './ConversationArea';
import { AgentPanel } from './AgentPanel';
import { NewTaskModal } from '../Modals/NewTaskModal';
import { ProgressIndicator } from '../ProgressIndicator';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

export const MainLayout = () => {
  const [activeTaskId, setActiveTaskId] = useState<string>('task-1');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [agentPanelCollapsed, setAgentPanelCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar 
        activeTaskId={activeTaskId}
        onTaskSelect={setActiveTaskId}
        onNewTask={() => setShowNewTaskModal(true)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Fixed Progress Indicator */}
        <div className="border-b border-manus-border bg-background z-10">
          <div className="max-w-4xl mx-auto px-6">
            <ProgressIndicator />
          </div>
        </div>

        {/* Resizable Content Area */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
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
