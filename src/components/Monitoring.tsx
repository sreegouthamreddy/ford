import React, { useState } from 'react';
import { Activity, AlertCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react';

const mockMetrics = [
  { id: 1, name: 'CPU Usage', value: '45%', trend: 'up', change: '5%' },
  { id: 2, name: 'Memory Usage', value: '62%', trend: 'down', change: '3%' },
  { id: 3, name: 'Disk I/O', value: '2.3 MB/s', trend: 'up', change: '0.5 MB/s' },
  { id: 4, name: 'Network', value: '1.8 MB/s', trend: 'stable', change: '0.1 MB/s' },
];

const mockAlerts = [
  { id: 1, type: 'error', message: 'Job "Log Cleanup" failed', time: '5 minutes ago' },
  { id: 2, type: 'warning', message: 'High memory usage detected', time: '15 minutes ago' },
  { id: 3, type: 'info', message: 'System backup completed', time: '1 hour ago' },
  { id: 4, type: 'success', message: 'New job schedule applied', time: '2 hours ago' },
];

const mockLogs = [
  { id: 1, level: 'INFO', message: 'Daily Data Processing started', timestamp: '2024-03-14 03:00:00' },
  { id: 2, level: 'ERROR', message: 'Failed to clean up logs: Permission denied', timestamp: '2024-03-14 04:00:00' },
  { id: 3, level: 'INFO', message: 'Weekly Reports completed successfully', timestamp: '2024-03-14 05:00:00' },
  { id: 4, level: 'WARN', message: 'High memory usage detected', timestamp: '2024-03-14 06:00:00' },
];

export function Monitoring() {
  const [activeTab, setActiveTab] = useState<'overview' | 'alerts' | 'logs'>('overview');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'alerts'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Alerts
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'logs'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Logs
            </button>
          </div>
          <button
            onClick={handleRefresh}
            className={`p-2 text-gray-600 hover:text-gray-900 ${refreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockMetrics.map((metric) => (
              <div key={metric.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{metric.name}</p>
                    <p className="text-2xl font-semibold">{metric.value}</p>
                    <p className={`text-sm ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'} {metric.change}
                    </p>
                  </div>
                  <Activity className="h-10 w-10 text-blue-600" />
                </div>
              </div>
            ))}
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">System Performance</h2>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart placeholder - Would implement with a charting library
            </div>
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start space-x-4">
                  {alert.type === 'error' && <AlertCircle className="h-5 w-5 text-red-500" />}
                  {alert.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                  {alert.type === 'info' && <Activity className="h-5 w-5 text-blue-500" />}
                  {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert .message}</p>
                    <p className="text-sm text-gray-500">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        log.level === 'ERROR' ? 'bg-red-100 text-red-800' :
                        log.level === 'WARN' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {log.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}