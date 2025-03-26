import React from 'react';
import { BarChart2, TrendingUp, Clock, AlertCircle } from 'lucide-react';

// Mock data for charts
const weeklyStats = [
  { day: 'Mon', completed: 45, failed: 2 },
  { day: 'Tue', completed: 52, failed: 1 },
  { day: 'Wed', completed: 48, failed: 3 },
  { day: 'Thu', completed: 51, failed: 0 },
  { day: 'Fri', completed: 46, failed: 1 },
  { day: 'Sat', completed: 28, failed: 0 },
  { day: 'Sun', completed: 25, failed: 1 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Jobs</p>
              <p className="text-2xl font-semibold">248</p>
              <p className="text-sm text-green-600">↑ 12% from last week</p>
            </div>
            <BarChart2 className="h-10 w-10 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-semibold">98.8%</p>
              <p className="text-sm text-green-600">↑ 2.1% from last week</p>
            </div>
            <TrendingUp className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Duration</p>
              <p className="text-2xl font-semibold">12m 30s</p>
              <p className="text-sm text-red-600">↓ 1m from last week</p>
            </div>
            <Clock className="h-10 w-10 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Failed Jobs</p>
              <p className="text-2xl font-semibold">3</p>
              <p className="text-sm text-green-600">↓ 2 from last week</p>
            </div>
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
        </div>
      </div>

      {/* Weekly Performance Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Weekly Performance</h2>
        <div className="h-64">
          <div className="flex h-full items-end space-x-2">
            {weeklyStats.map((stat) => (
              <div key={stat.day} className="flex-1 space-y-2">
                <div className="relative h-full">
                  <div
                    className="absolute bottom-0 w-full bg-blue-500 rounded-t"
                    style={{ height: `${(stat.completed / 60) * 100}%` }}
                  />
                  <div
                    className="absolute bottom-0 w-full bg-red-500 rounded-t"
                    style={{ height: `${(stat.failed / 60) * 100}%`, width: '30%', left: '35%' }}
                  />
                </div>
                <div className="text-xs text-center font-medium text-gray-600">{stat.day}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
            <span className="text-sm text-gray-600">Failed</span>
          </div>
        </div>
      </div>
    </div>
  );
}