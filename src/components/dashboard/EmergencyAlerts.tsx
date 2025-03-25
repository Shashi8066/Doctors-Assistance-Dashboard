
import React from 'react';
import { AlertTriangle, Clock, ExternalLink, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type EmergencyAlert = {
  id: string;
  patientName: string;
  patientId: string;
  condition: string;
  status: 'critical' | 'urgent' | 'stable';
  time: string;
  details: string;
};

type EmergencyAlertsProps = {
  alerts: EmergencyAlert[];
  loading?: boolean;
};

const getStatusClasses = (status: EmergencyAlert['status']) => {
  switch (status) {
    case 'critical':
      return 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/20 dark:border-red-500 dark:text-red-400';
    case 'urgent':
      return 'bg-amber-100 border-amber-500 text-amber-800 dark:bg-amber-900/20 dark:border-amber-500 dark:text-amber-400';
    case 'stable':
      return 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/20 dark:border-green-500 dark:text-green-400';
    default:
      return 'bg-gray-100 border-gray-500 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300';
  }
};

const EmergencyAlerts = ({ alerts, loading = false }: EmergencyAlertsProps) => {
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="h-36 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="dashboard-card p-6 text-center">
        <div className="flex items-center justify-center bg-green-100 dark:bg-green-900/20 h-12 w-12 rounded-full mx-auto mb-4">
          <AlertTriangle className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">No emergency alerts</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Everything is under control.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div 
          key={alert.id}
          className={cn(
            'dashboard-card border-l-4 animate-fade-in',
            alert.status === 'critical' ? 'animate-pulse-slow' : ''
          )}
          style={{
            borderLeftColor: 
              alert.status === 'critical' 
                ? 'var(--alert-critical)' 
                : alert.status === 'urgent' 
                  ? 'var(--alert-warning)' 
                  : 'var(--alert-success)'
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2",
                    alert.status === 'critical' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                      : alert.status === 'urgent' 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  )}
                >
                  {alert.status.toUpperCase()}
                </span>
                <h3 className="text-sm font-medium">{alert.patientName}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">ID: {alert.patientId}</span>
              </div>
              
              <p className="text-sm mt-1">{alert.condition}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.details}</p>
              
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                <Clock className="h-3 w-3 mr-1" />
                <span>{alert.time}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="h-8">
                <PhoneCall className="h-3 w-3 mr-1" />
                <span className="text-xs">Call</span>
              </Button>
              <Button size="sm" className="h-8 bg-alert-critical hover:bg-red-600">
                <ExternalLink className="h-3 w-3 mr-1" />
                <span className="text-xs">View Details</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmergencyAlerts;
