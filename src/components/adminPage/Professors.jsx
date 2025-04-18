import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTheme from '../../context/NewContext';
import ProfessorsForm from './ProfessorsForm';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function Professors() {
  const { isOpenForSideBar } = useTheme();
  const navigate = useNavigate();
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProfessor, setCurrentProfessor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    department: "All Departments",
    role: "All Roles",
    status: "All Status",
  });

  useEffect(() => {
    const fetchFaculty = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Please login first');
        navigate('/adminlogin');
        return;
      }

      try {
        const response = await axios.get('http://localhost:9999/api/private/profile/getallfaculty', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        if (response.data) {
          // Correctly access the data array from response
          setProfessors(response.data || []);
        } else {
          throw new Error(response.data.message || 'Failed to fetch faculty data');
        }
      } catch (error) {
        console.error('Error fetching faculty:', error);
        if (error.response?.status === 401) {
          toast.error('Session expired. Please login again');
          localStorage.removeItem('token');
          navigate('/adminlogin');
        } else {
          toast.error(error.response?.data?.message || 'Error fetching faculty data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, [navigate]);

  // Update the openPopup function to handle both edit and add
  const openPopup = (index = null) => {
    if (index !== null) {
      setCurrentProfessor({ ...professors[index] });
    } else {
      setCurrentProfessor(null); // For adding new faculty
    }
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setCurrentProfessor(null);
    setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProfessor(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your update logic here
  };

  const filteredFaculty = professors.filter((faculty) => {
    const matchesSearch = faculty.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filters.department === "All Departments" || faculty.department === filters.department;
    const matchesRole = filters.role === "All Roles" || faculty.role === filters.role;
    const matchesStatus = filters.status === "All Status" || faculty.status === filters.status;

    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className={`flex-1 bg-gray-100 p-2 transition-all duration-300 ${isOpenForSideBar ? 'ml-64' : 'ml-20'}`}>
      <section id="faculty" className="p-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg">

          {/* Table Header */}
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-semibold text-blue-500">Faculty Records</h2>
            <div className="flex flex-col lg:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search faculty..."
                  className="pl-8 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
              {/* // Update the Add Faculty button to open the form */}
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => openPopup()}
              >
                Add Faculty
              </button>

              <select
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => console.log(e.target.value)}
              >
                <option>Bulk Actions</option>
                <option>Delete Selected</option>
                <option>Update Status</option>
                <option>Export Data</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
            >
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Engineering</option>
              <option>Business</option>
              <option>Arts</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            >
              <option>All Roles</option>
              <option>Professor</option>
              <option>Associate Professor</option>
              <option>Assistant Professor</option>
              <option>Lecturer</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>On Leave</option>
              <option>Retired</option>
            </select>
            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors">
              Apply Filters
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Password</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profile Picture</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qualification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFaculty.map((faculty, index) => (
                  <tr key={faculty.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4">{faculty.name}</td>
                    <td className="px-6 py-4">{faculty.email}</td>
                    <td className="px-6 py-4">********</td>
                    <td className="px-6 py-4">
                      {faculty.profilePicture && (
                        <img
                          src={faculty.profilePicture}
                          className="w-8 h-8 rounded-full"
                          alt="avatar"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">{faculty.role}</td>
                    <td className="px-6 py-4">{faculty.qualification}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${faculty.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {faculty.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{faculty.department}</td>
                    <td className="px-6 py-4">{faculty.createdAt}</td>
                    <td className="px-6 py-4">{faculty.updatedAt}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => openPopup(index)}
                        >
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          Delete
                        </button>
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
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">45</span> faculty members
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
      {isPopupOpen && (
        <ProfessorsForm
          facultyData={currentProfessor}
          onClose={closePopup}
        />
      )}
    </div>
  );
}

export default Professors;