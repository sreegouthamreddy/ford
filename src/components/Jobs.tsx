import React, { useState } from 'react';
import { Play, Pause, RefreshCw, Trash2, Plus, Filter } from 'lucide-react';

const mockJobs = [
  { id: 'JOB001', name: 'Daily Data Processing', type: 'Box', status: 'running', schedule: '0 3 * * *', owner: 'system', lastRun: '2024-03-14 03:00 AM', nextRun: '2024-03-15 03:00 AM' },
  { id: 'JOB002', name: 'Weekly Reports', type: 'Command', status: 'completed', schedule: '0 1 * * 0', owner: 'reports', lastRun: '2024-03-10 01:00 AM', nextRun: '2024-03-17 01:00 AM' },
  { id: 'JOB003', name: 'System Backup', type: 'Command', status: 'scheduled', schedule: '0 0 * * *', owner: 'system', lastRun: '2024-03-14 00:00 AM', nextRun: '2024-03-15 00:00 AM' },
  { id: 'JOB004', name: 'Log Cleanup', type: 'Command', status: 'failed', schedule: '0 4 * * *', owner: 'system', lastRun: '2024-03-14 04:00 AM', nextRun: '2024-03-15 04:00 AM' },
];

export function Jobs() {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleJobSelection = (jobId: string) => {
    setSelectedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              <span>New Job</span>
            </button>
            <button
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                selectedJobs.length > 0 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-100 text-gray-400'
              }`}
              disabled={selectedJobs.length === 0}
            >
              <Play className="h-4 w-4" />
              <span>Start</span>
            </button>
            <button
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                selectedJobs.length > 0 ? 'bg-orange-600 text-white hover:bg-orange-700' : 'bg-gray-100 text-gray-400'
              }`}
              disabled={selectedJobs.length === 0}
            >
              <Pause className="h-4 w-4" />
              <span>Pause</span>
            </button>
            <button
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                selectedJobs.length > 0 ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-100 text-gray-400'
              }`}
              disabled={selectedJobs.length === 0}
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center space-x-2 hover:bg-gray-200"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {filterOpen && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">All</option>
                <option value="running">Running</option>
                <option value="completed">Completed</option>
                <option value="scheduled">Scheduled</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">All</option>
                <option value="box">Box</option>
                <option value="command">Command</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Owner</label>
              <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">All</option>
                <option value="system">System</option>
                <option value="reports">Reports</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Jobs Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedJobs.length === mockJobs.length}
                    onChange={(e) =>
                      setSelectedJobs(e.target.checked ? mockJobs.map(job => job.id) : [])
                    }
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Run</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedJobs.includes(job.id)}
                      onChange={() => toggleJobSelection(job.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        job.status === 'running'
                          ? 'bg-green-100 text-green-800'
                          : job.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : job.status === 'scheduled'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.schedule}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.lastRun}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.nextRun}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}