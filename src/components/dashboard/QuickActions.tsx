
import React from 'react';
import { 
  CalendarPlus, 
  FileText, 
  FilePlus, 
  Pill, 
  Upload, 
  MessageSquarePlus,
  Stethoscope,
  FileSignature,
  Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Action = {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
};

const QuickActions = () => {
  const actions: Action[] = [
    {
      icon: <Pill className="h-5 w-5" />,
      label: 'New Prescription',
      color: 'bg-medical-primary hover:bg-medical-dark',
      onClick: () => console.log('New prescription'),
    },
    {
      icon: <CalendarPlus className="h-5 w-5" />,
      label: 'Schedule Follow-Up',
      color: 'bg-emerald-500 hover:bg-emerald-600',
      onClick: () => console.log('Schedule follow-up'),
    },
    {
      icon: <Upload className="h-5 w-5" />,
      label: 'Upload Reports',
      color: 'bg-amber-500 hover:bg-amber-600',
      onClick: () => console.log('Upload medical reports'),
    },
    {
      icon: <Printer className="h-5 w-5" />,
      label: 'Print Reports',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => console.log('Generate and print reports'),
    },
    {
      icon: <MessageSquarePlus className="h-5 w-5" />,
      label: 'Send Message',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      onClick: () => console.log('Send message'),
    },
    {
      icon: <Stethoscope className="h-5 w-5" />,
      label: 'Start Checkup',
      color: 'bg-pink-500 hover:bg-pink-600',
      onClick: () => console.log('Start checkup'),
    },
    {
      icon: <FileSignature className="h-5 w-5" />,
      label: 'Medical Certificate',
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => console.log('Create medical certificate'),
    },
    {
      icon: <FilePlus className="h-5 w-5" />,
      label: 'Add Patient',
      color: 'bg-teal-500 hover:bg-teal-600',
      onClick: () => console.log('Add new patient'),
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Quick Actions</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={`w-full h-16 ${action.color} text-white transition-all duration-200 hover:shadow-md animate-scale-in`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={action.onClick}
                >
                  <div className="flex flex-col items-center justify-center">
                    {action.icon}
                    <span className="text-xs mt-1 font-normal">{action.label}</span>
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
