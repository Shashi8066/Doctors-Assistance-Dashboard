
import React, { useState } from 'react';
import { Plus, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Patient = {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
  age: number;
  gender: string;
  lastVisit: string;
};

type PatientSearchProps = {
  recentPatients: Patient[];
  loading?: boolean;
};

const PatientSearch = ({ recentPatients, loading = false }: PatientSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9"
            placeholder="Search patients by name, ID, or condition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="shadow-sm whitespace-nowrap">
          <Plus className="mr-2 h-4 w-4" />
          Add New Patient
        </Button>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Recent Patients</h3>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="h-20 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            ))}
          </div>
        ) : recentPatients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="dashboard-card flex items-center justify-between animate-fade-in">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                    <AvatarFallback>{patient.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-medium">{patient.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {patient.age} yrs • {patient.gender} • Last visit: {patient.lastVisit}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed rounded-xl">
            <User className="mx-auto h-10 w-10 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No recent patients</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your recently viewed patients will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientSearch;
