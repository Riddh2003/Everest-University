import React from 'react';
import useTheme from '../../context/NewContext'; // Make sure to adjust the path if needed

const NewQuery = () => {
    const { isOpenForSideBar } = useTheme(); // Access the theme context

    return (
        <>
            {/* Sidebar content */}
            <div className={`flex-1 bg-gray-100 p-6 transition-all duration-300 ${isOpenForSideBar ? 'ml-64' : 'ml-20'}`}>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded border border-gray-200">
                        <h3 className="text-gray-500 text-sm">Total Students</h3>
                        <p className="text-2xl font-semibold">2,453</p>
                        <div className="flex items-center mt-2">
                            <span className="text-green-500 text-sm">+12%</span>
                            <span className="text-gray-400 text-sm ml-2">from last month</span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded border border-gray-200">
                        <h3 className="text-gray-500 text-sm">Total Faculty</h3>
                        <p className="text-2xl font-semibold">156</p>
                        <div className="flex items-center mt-2">
                            <span className="text-green-500 text-sm">+5%</span>
                            <span className="text-gray-400 text-sm ml-2">from last month</span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded border border-gray-200">
                        <h3 className="text-gray-500 text-sm">Active Events</h3>
                        <p className="text-2xl font-semibold">23</p>
                        <div className="flex items-center mt-2">
                            <span className="text-red-500 text-sm">-2%</span>
                            <span className="text-gray-400 text-sm ml-2">from last month</span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded border border-gray-200">
                        <h3 className="text-gray-500 text-sm">Books in Circulation</h3>
                        <p className="text-2xl font-semibold">847</p>
                        <div className="flex items-center mt-2">
                            <span className="text-green-500 text-sm">+8%</span>
                            <span className="text-gray-400 text-sm ml-2">from last month</span>
                        </div>
                    </div>
                </div>

                {/* Table Actions */}
                <div className="bg-white border border-gray-200 rounded-lg mb-6">
                    <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center">
                        <h2 className="text-lg font-semibold">Recent Inquiries</h2>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full sm:w-auto">
                                Add Inquiry
                            </button>
                            <select className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto">
                                <option>Bulk Actions</option>
                                <option>Delete Selected</option>
                                <option>Update Status</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        <input type="checkbox" className="rounded" />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inquiry ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                                    <td className="px-6 py-4">#INQ001</td>
                                    <td className="px-6 py-4">John Doe</td>
                                    <td className="px-6 py-4">Student</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                                    </td>
                                    <td className="px-6 py-4">2024-02-20</td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                                        <button className="text-red-600 hover:text-red-800">Delete</button>
                                    </td>
                                </tr>
                                {/* Repeat rows as needed */}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                        <div className="flex-1 flex justify-between sm:hidden">
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
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of
                                    <span className="font-medium">97</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        Previous
                                    </button>
                                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">1</button>
                                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">2</button>
                                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">3</button>
                                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        Next
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewQuery;
