
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChartComponent from '@/components/ui/ChartComponent';

// Sample data for charts
const patientGrowthData = [
  { month: 'Jan', patients: 120 },
  { month: 'Feb', patients: 140 },
  { month: 'Mar', patients: 180 },
  { month: 'Apr', patients: 190 },
  { month: 'May', patients: 210 },
  { month: 'Jun', patients: 250 },
];

const conditionsData = [
  { name: 'Hypertension', value: 65 },
  { name: 'Diabetes', value: 45 },
  { name: 'Asthma', value: 37 },
  { name: 'Arthritis', value: 29 },
  { name: 'Anxiety', value: 25 },
];

const medicationData = [
  { month: 'Jan', antibiotics: 45, analgesics: 30, antihypertensives: 65 },
  { month: 'Feb', antibiotics: 50, analgesics: 25, antihypertensives: 68 },
  { month: 'Mar', antibiotics: 35, analgesics: 40, antihypertensives: 70 },
  { month: 'Apr', antibiotics: 55, analgesics: 35, antihypertensives: 72 },
  { month: 'May', antibiotics: 40, analgesics: 45, antihypertensives: 75 },
  { month: 'Jun', antibiotics: 60, analgesics: 40, antihypertensives: 80 },
];

type TestReport = {
  id: string;
  patientName: string;
  testName: string;
  date: string;
  status: 'normal' | 'abnormal' | 'critical';
  viewed: boolean;
};

// Sample test reports
const testReports: TestReport[] = [
  {
    id: '1',
    patientName: 'John Smith',
    testName: 'Complete Blood Count',
    date: '2023-07-15',
    status: 'normal',
    viewed: true,
  },
  {
    id: '2',
    patientName: 'Mary Johnson',
    testName: 'Lipid Profile',
    date: '2023-07-14',
    status: 'abnormal',
    viewed: false,
  },
  {
    id: '3',
    patientName: 'Robert Davis',
    testName: 'Chest X-Ray',
    date: '2023-07-13',
    status: 'critical',
    viewed: false,
  },
  {
    id: '4',
    patientName: 'Sarah Wilson',
    testName: 'Thyroid Function',
    date: '2023-07-12',
    status: 'normal',
    viewed: true,
  },
];

const ReportsAnalytics = () => {
  const [activeTab, setActiveTab] = useState('trends');

  const getStatusBadgeClass = (status: TestReport['status']) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'abnormal':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="trends" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="trends">Trends & Analytics</TabsTrigger>
          <TabsTrigger value="test-results">Test Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends" className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="dashboard-card">
              <ChartComponent
                type="area"
                data={patientGrowthData}
                xKey="month"
                yKeys={[{ key: 'patients', name: 'New Patients', color: '#0891b2' }]}
                height={200}
                title="Patient Growth Trend"
                subtitle="New patients registered per month"
              />
            </div>
            <div className="dashboard-card">
              <ChartComponent
                type="pie"
                data={conditionsData}
                xKey="name"
                yKeys={[{ key: 'value', name: 'Patients' }]}
                height={200}
                title="Most Common Conditions"
                subtitle="Distribution of conditions among patients"
              />
            </div>
          </div>
          
          <div className="dashboard-card">
            <ChartComponent
              type="bar"
              data={medicationData}
              xKey="month"
              yKeys={[
                { key: 'antibiotics', name: 'Antibiotics', color: '#0284c7' },
                { key: 'analgesics', name: 'Analgesics', color: '#0891b2' },
                { key: 'antihypertensives', name: 'Antihypertensives', color: '#06b6d4' }
              ]}
              height={250}
              title="Medication Prescriptions"
              subtitle="Monthly breakdown by medication category"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="test-results" className="animate-fade-in">
          <div className="space-y-4">
            <div className="dashboard-card overflow-hidden">
              <h3 className="text-sm font-medium mb-4">Recent Test Results</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Test</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    {testReports.map((report) => (
                      <tr key={report.id} className={!report.viewed ? 'bg-blue-50 dark:bg-blue-900/10' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{report.patientName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{report.testName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{report.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`status-badge ${getStatusBadgeClass(report.status)}`}>
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </span>
                          {!report.viewed && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                              New
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-medical-primary hover:text-medical-dark dark:hover:text-medical-light transition-colors">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {testReports.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">No test results</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">New test results will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsAnalytics;
