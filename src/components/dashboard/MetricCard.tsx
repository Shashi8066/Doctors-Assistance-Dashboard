
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type MetricCardProps = {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    positive: boolean;
  };
  icon: LucideIcon;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'critical' | 'info';
  loading?: boolean;
};

const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'primary',
  loading = false
}: MetricCardProps) => {
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'bg-medical-primary text-white';
      case 'secondary':
        return 'bg-medical-secondary text-white';
      case 'success':
        return 'bg-alert-success text-white';
      case 'warning':
        return 'bg-alert-warning text-white';
      case 'critical':
        return 'bg-alert-critical text-white';
      case 'info':
        return 'bg-alert-info text-white';
      default:
        return 'bg-medical-primary text-white';
    }
  };

  return (
    <div className={cn(
      "dashboard-card overflow-hidden",
      loading && "animate-pulse"
    )}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
          
          {change && (
            <p className={cn(
              "mt-1 text-xs",
              change.positive ? "text-alert-success" : "text-alert-critical"
            )}>
              {change.positive ? '↑' : '↓'} {change.value}
            </p>
          )}
        </div>
        
        <div className={cn(
          "p-2 rounded-md",
          getColorClasses()
        )}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
