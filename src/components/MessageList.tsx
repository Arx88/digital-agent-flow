
import React from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: string;
  type?: 'text' | 'action' | 'file';
}

interface MessageListProps {
  taskId: string;
}

export const MessageList: React.FC<MessageListProps> = ({ taskId }) => {
  const messages: Message[] = [
    {
      id: '1',
      content: 'Perfecto, voy a crear un pequeño sitio web sobre gatos. Comenzaré por planificar la estructura y buscar contenido relevante.',
      sender: 'agent',
      timestamp: '08:25',
      type: 'text'
    },
    {
      id: '2',
      content: '📁 Creando estructura de archivos...',
      sender: 'agent',
      timestamp: '08:25',
      type: 'action'
    },
    {
      id: '3',
      content: '✅ Archivo creado: index.html',
      sender: 'agent',
      timestamp: '08:26',
      type: 'file'
    },
    {
      id: '4',
      content: '✅ Archivo creado: styles.css',
      sender: 'agent',
      timestamp: '08:26',
      type: 'file'
    },
    {
      id: '5',
      content: '✅ Archivo creado: script.js',
      sender: 'agent',
      timestamp: '08:27',
      type: 'file'
    },
    {
      id: '6',
      content: 'Ahora estoy desarrollando los estilos CSS para que el sitio tenga un diseño atractivo y responsive. Estoy utilizando gradientes y animaciones para hacer la experiencia más interactiva.',
      sender: 'agent',
      timestamp: '08:27',
      type: 'text'
    }
  ];

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="flex gap-3">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
            {message.sender === 'agent' ? '🤖' : 'U'}
          </div>

          {/* Message Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm">
                {message.sender === 'agent' ? 'Manus' : 'You'}
              </span>
              <span className="text-xs text-muted-foreground">
                {message.timestamp}
              </span>
            </div>

            <div className={`rounded-lg p-3 ${
              message.type === 'action' ? 'bg-blue-50 border border-blue-200 text-blue-800' :
              message.type === 'file' ? 'bg-green-50 border border-green-200 text-green-800' :
              'bg-muted/50'
            }`}>
              <p className="text-sm leading-relaxed">
                {message.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
