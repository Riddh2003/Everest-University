import React from 'react'
import useTheme from '../../context/NewContext'; // Access theme context to manage sidebar state

function Courses() {
  const { isOpenForSideBar } = useTheme(); // Retrieve sidebar state from the theme context

  return (
    <div className={`flex-1 bg-gray-100 p-6 transition-all duration-300 ${isOpenForSideBar ? 'ml-64' : 'ml-20'}`}>
      {/* Section for displaying student records */}
      <section id="students" className="p-6">
        <div className="bg-white border border-gray-200 rounded-lg">
          {/* Table Header */}
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-semibold">Student Records</h2>
            <div className="flex flex-col lg:flex-row gap-2 w-full sm:w-auto">
              {/* Search bar */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-8 pr-4 py-2 border border-gray-300 rounded w-full"
                />
                <svg
                  className="w-4 h-4 absolute left-2.5 top-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {/* Button to add a new student */}
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Add Student
              </button>
              {/* Bulk Actions dropdown */}
              <select className="px-4 py-2 border border-gray-300 rounded">
                <option>Bulk Actions</option>
                <option>Delete Selected</option>
                <option>Update Status</option>
                <option>Export Selected</option>
              </select>
            </div>
          </div>

          {/* Filters section */}
          <div className="p-4 border-b border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Course filter */}
            <select className="px-4 py-2 border border-gray-300 rounded">
              <option>All Courses</option>
              <option>Computer Science</option>
              <option>Engineering</option>
              <option>Business</option>
            </select>
            {/* Year filter */}
            <select className="px-4 py-2 border border-gray-300 rounded">
              <option>All Years</option>
              <option>First Year</option>
              <option>Second Year</option>
              <option>Third Year</option>
              <option>Fourth Year</option>
            </select>
            {/* Status filter */}
            <select className="px-4 py-2 border border-gray-300 rounded">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>On Leave</option>
            </select>
            {/* Apply filters button */}
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
              Apply Filters
            </button>
          </div>

          {/* Table displaying student records */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {/* Checkbox for selecting multiple students */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <input type="checkbox" className="rounded" />
                  </th>
                  {/* Other column headers */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Student rows */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4">STU001</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <img
                      src="https://avatar.iran.liara.run/public"
                      alt="Alex Johnson"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>Alex Johnson</span>
                  </td>
                  <td className="px-6 py-4">20</td>
                  <td className="px-6 py-4">Computer Science</td>
                  <td className="px-6 py-4">Second Year</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4">STU002</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <img
                      src="https://avatar.iran.liara.run/public"
                      alt="Sarah Williams"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>Sarah Williams</span>
                  </td>
                  <td className="px-6 py-4">19</td>
                  <td className="px-6 py-4">Engineering</td>
                  <td className="px-6 py-4">First Year</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">On Leave</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              {/* Mobile pagination buttons */}
              <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                  <span className="font-medium">97</span> students
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
  )
}

export default Courses
