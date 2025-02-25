import React, { useState } from 'react'
import useTheme from '../../context/NewContext'; // Importing theme context for sidebar state management

function Circulation() {
  const { isOpenForSideBar } = useTheme(); // Access the theme context to check if sidebar is open

  // State variables for managing search input and selected bulk action
  const [search, setSearch] = useState('');
  const [selectedBulkAction, setSelectedBulkAction] = useState('Bulk Actions');

  // Example data for events
  const events = [
    {
      id: 'EVT001',
      name: 'Annual Tech Symposium',
      department: 'Computer Science Department',
      date: 'Mar 15, 2024',
      time: '9:00 AM - 5:00 PM',
      location: 'Main Auditorium',
      capacity: 500,
      registered: 423,
      status: 'Scheduled',
    },
    {
      id: 'EVT002',
      name: 'Cultural Festival',
      department: 'Student Council',
      date: 'Mar 20, 2024',
      time: '10:00 AM - 8:00 PM',
      location: 'University Ground',
      capacity: 1000,
      registered: 756,
      status: 'Registration Open',
    },
  ];

  return (
    <>
      <div className={`flex-1 bg-gray-100 p-6 transition-all duration-300 ${isOpenForSideBar ? 'ml-64' : 'ml-20'}`}>
        {/* Event Management Section */}
        <section id="events" className="p-6">
          <div className="bg-white border border-gray-200 rounded-lg">
            {/* Table Header */}
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg font-semibold">Event Management</h2>
              <div className="flex flex-col lg:flex-row gap-2 w-full sm:w-auto">
                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="pl-8 pr-4 py-2 border border-gray-300 rounded w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} // Update search state on input change
                  />
                  <svg className="w-4 h-4 absolute left-2.5 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {/* Add Event Button */}
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mt-2 sm:mt-0">
                  Add Event
                </button>
                {/* Bulk Actions Dropdown */}
                <select
                  className="px-4 py-2 border border-gray-300 rounded mt-2 sm:mt-0"
                  value={selectedBulkAction}
                  onChange={(e) => setSelectedBulkAction(e.target.value)} // Update bulk action state
                >
                  <option>Bulk Actions</option>
                  <option>Delete Selected</option>
                  <option>Update Status</option>
                  <option>Export Events</option>
                </select>
              </div>
            </div>

            {/* Filters */}
            <div className="p-4 border-b border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <select className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto">
                <option>All Categories</option>
                <option>Academic</option>
                <option>Cultural</option>
                <option>Sports</option>
                <option>Workshop</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto">
                <option>All Locations</option>
                <option>Main Hall</option>
                <option>Auditorium</option>
                <option>Sports Complex</option>
                <option>Conference Room</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto">
                <option>All Status</option>
                <option>Scheduled</option>
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
              {/* Apply Filters Button */}
              <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 w-full sm:w-auto mt-2 sm:mt-0">
                Apply Filters
              </button>
            </div>

            {/* Table of Events */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      <input type="checkbox" className="rounded" /> {/* Checkbox for selecting events */}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Event Rows */}
                  {events
                    .filter((event) => event.name.toLowerCase().includes(search.toLowerCase())) // Filter events by search input
                    .map((event) => (
                      <tr className="hover:bg-gray-50" key={event.id}>
                        <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                        <td className="px-6 py-4">{event.id}</td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{event.name}</div>
                          <div className="text-sm text-gray-500">{event.department}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div>{event.date}</div>
                          <div className="text-sm text-gray-500">{event.time}</div>
                        </td>
                        <td className="px-6 py-4">{event.location}</td>
                        <td className="px-6 py-4">
                          <div>{event.capacity} seats</div>
                          <div className="text-sm text-green-600">{event.registered} registered</div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${event.status === 'Scheduled'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                              }`}
                          >
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800">Edit</button>
                            <button className="text-red-600 hover:text-red-800">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                {/* Mobile Pagination */}
                <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                {/* Desktop Pagination */}
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                    <span className="font-medium">24</span> events
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      2
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      3
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Circulation;
