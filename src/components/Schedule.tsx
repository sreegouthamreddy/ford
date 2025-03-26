import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const mockSchedules = [
  { time: '00:00', jobs: ['System Backup'] },
  { time: '03:00', jobs: ['Daily Data Processing', 'Log Rotation'] },
  { time: '04:00', jobs: ['Log Cleanup'] },
  { time: '06:00', jobs: ['Morning Reports'] },
  { time: '12:00', jobs: ['Midday Backup', 'Performance Metrics'] },
  { time: '18:00', jobs: ['Evening Reports'] },
  { time: '23:00', jobs: ['Daily Summary'] },
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const currentDate = new Date();

export function Schedule() {
  const [selectedView, setSelectedView] = useState<'day' | 'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const generateCalendarDays = () => {
    const days = [];
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
    }
    
    return days;
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedView('day')}
              className={`px-4 py-2 rounded-lg ${
                selectedView === 'day'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setSelectedView('week')}
              className={`px-4 py-2 rounded-lg ${
                selectedView === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setSelectedView('month')}
              className={`px-4 py-2 rounded-lg ${
                selectedView === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Month
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-gray-600" />
              <span className="text-lg font-semibold">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {selectedView === 'month' && (
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {weekDays.map((day) => (
              <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700">
                {day}
              </div>
            ))}
            {generateCalendarDays().map((date, index) => (
              <div
                key={index}
                className={`bg-white p-2 min-h-[100px] ${
                  date
                    ? 'hover:bg-gray-50 cursor-pointer'
                    : 'bg-gray-50'
                }`}
              >
                {date && (
                  <>
                    <p className={`text-sm font-medium ${
                      date.getDate() === currentDate.getDate() &&
                      date.getMonth() === currentDate.getMonth()
                        ? 'text-blue-600'
                        : 'text-gray-700'
                    }`}>
                      {date.getDate()}
                    </p>
                    <div className="mt-1 space-y-1">
                      {date.getDate() % 3 === 0 && (
                        <div className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5">
                          3 jobs scheduled
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedView === 'week' && (
          <div className="grid grid-cols-8 gap-px bg-gray-200">
            <div className="bg-gray-50 p-4"></div>
            {weekDays.map((day) => (
              <div key={day} className="bg-gray-50 p-4 text-center font-medium text-gray-700">
                {day}
              </div>
            ))}
            {mockSchedules.map((schedule) => (
              <React.Fragment key={schedule.time}>
                <div className="bg-white p-4 text-right text-sm text-gray-600">
                  {schedule.time}
                </div>
                {weekDays.map((day, index) => (
                  <div key={`${schedule.time}-${day}`} className="bg-white p-2 border-t border-gray-100">
                    {index % 3 === 0 && schedule.jobs.map((job, jobIndex) => (
                      <div
                        key={jobIndex}
                        className="text-xs bg-blue-100 text-blue-800 rounded px-2 py-1 mb-1"
                      >
                        {job}
                      </div>
                    ))}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        )}

        {selectedView === 'day' && (
          <div className="space-y-4">
            {mockSchedules.map((schedule) => (
              <div key={schedule.time} className="flex">
                <div className="w-24 text-right text-sm text-gray-600 pr-4 py-2">
                  {schedule.time}
                </div>
                <div className="flex-1 border-l border-gray-200 pl-4 py-2">
                  {schedule.jobs.map((job, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg border border-gray-200 p-3 mb-2 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{job}</span>
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}