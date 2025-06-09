
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
        return <Check className="h-4 w-4 text-white" />;
      case 'in-progress':
        return <div className="w-2 h-2 bg-white rounded-full animate-pulse" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-white" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-6 text-foreground">Progreso de la tarea</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-4">
            {/* Status Circle */}
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                getStatusColor(step.status)
              )}>
                {getStatusIcon(step.status)}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-8 bg-gray-200 mt-2" />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={cn(
                  "font-medium",
                  step.status === 'completed' ? 'text-green-700' :
                  step.status === 'in-progress' ? 'text-blue-700' :
                  'text-muted-foreground'
                )}>
                  {step.title}
                </h4>
                {step.timestamp && (
                  <span className="text-xs text-muted-foreground">
                    {step.timestamp}
                  </span>
                )}
              </div>
              {step.description && (
                <p className="text-sm text-muted-foreground mt-1">
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
