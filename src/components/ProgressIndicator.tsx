
import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressStep {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'in-progress' | 'pending' | 'error';
  timestamp?: string;
}

export const ProgressIndicator: React.FC = () => {
  const steps: ProgressStep[] = [
    {
      id: '1',
      title: 'Planificación y búsqueda de contenido',
      status: 'completed',
      timestamp: '08:25'
    },
    {
      id: '2',
      title: 'Búsqueda y selección de imágenes',
      status: 'completed',
      timestamp: '08:26'
    },
    {
      id: '3',
      title: 'Desarrollo del sitio web',
      status: 'in-progress',
      timestamp: '08:27',
      description: 'Creando estructura HTML y estilos CSS...'
    },
    {
      id: '4',
      title: 'Pruebas y optimización',
      status: 'pending'
    },
    {
      id: '5',
      title: 'Entrega del sitio web al usuario',
      status: 'pending'
    }
  ];

  const getStatusIcon = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="h-3 w-3 text-white" />;
      case 'in-progress':
        return <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-subtle" />;
      case 'error':
        return <AlertCircle className="h-3 w-3 text-white" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-manus-green';
      case 'in-progress':
        return 'bg-manus-blue';
      case 'error':
        return 'bg-manus-red';
      default:
        return 'bg-manus-gray/50';
    }
  };

  return (
    <div className="animate-fade-in">
      <h3 className="text-sm font-semibold mb-3 text-foreground">Progreso de la tarea</h3>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-2 group">
            {/* Status Circle */}
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center transition-all-300",
                getStatusColor(step.status),
                "group-hover:scale-110"
              )}>
                {getStatusIcon(step.status)}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-4 bg-manus-border mt-1" />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={cn(
                  "text-sm font-medium transition-colors",
                  step.status === 'completed' ? 'text-manus-green' :
                  step.status === 'in-progress' ? 'text-manus-blue' :
                  'text-muted-foreground'
                )}>
                  {step.title}
                </h4>
                {step.timestamp && (
                  <span className="text-xs text-muted-foreground font-mono">
                    {step.timestamp}
                  </span>
                )}
              </div>
              {step.description && (
                <p className="text-xs text-muted-foreground mt-0.5 animate-fade-in">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
