import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfessorsForm from './ProfessorsForm';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function Professors() {
  const navigate = useNavigate();
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProfessor, setCurrentProfessor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    department: "All Departments",
  });
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [viewMode, setViewMode] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

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

        console.log('API Response:', response);

        // Check if response.data exists and is not empty
        if (response.data !== undefined && response.data !== null) {
          // If data is an array, use it directly
          if (Array.isArray(response.data)) {
            setProfessors(response.data);
          }
          // If data is an object with data property that's an array
          else if (response.data.data && Array.isArray(response.data.data)) {
            setProfessors(response.data.data);
          }
          // Otherwise, assume the whole response is our data
          else {
            setProfessors(Array.isArray(response.data) ? response.data : [response.data]);
          }
        } else {
          throw new Error('No data received from server');
        }
      } catch (error) {
        console.error('Error fetching faculty:', error);

        // Handle authentication errors
        if (error.response?.status === 401) {
          toast.error('Session expired. Please login again');
          localStorage.removeItem('token');
          navigate('/adminlogin');
        }
        // Handle server errors
        else if (error.response?.status >= 500) {
          toast.error('Server error. Please try again later.');
        }
        // Handle not found errors
        else if (error.response?.status === 404) {
          toast.error('API endpoint not found. Please check server configuration.');
        }
        // Handle network errors (no response)
        else if (error.request && !error.response) {
          toast.error('Network error. Please check your connection and server availability.');
        }
        // Handle other errors
        else {
          toast.error(error.message || 'Error fetching faculty data');
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const viewFaculty = (faculty) => {
    setSelectedFaculty(faculty);
    setViewMode(true);
  };

  const closeViewMode = () => {
    setSelectedFaculty(null);
    setViewMode(false);
  };

  const filteredFaculty = professors.filter((faculty) => {
    const matchesSearch = faculty.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filters.department === "All Departments" || faculty.department === filters.department;

    return matchesSearch && matchesDepartment;
  });

  // Pagination
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedFaculty = filteredFaculty.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(filteredFaculty.length / rowsPerPage);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white/80 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-4 border-t-[#5cb338] border-[#5cb338]/30"></div>
      </div>
    );
  }

  // If in view mode, show detailed faculty info
  if (viewMode && selectedFaculty) {
    return (
      <div className="p-6">
        <div className="max-w-[1000px] mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-medium text-[#621df6]">Faculty Details</h2>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 flex items-center"
              onClick={closeViewMode}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-[#621df6] text-white flex items-center justify-center text-4xl">
                  {selectedFaculty.gender === 'Male' ? (
                    <span className="text-4xl">👨‍🏫</span>
                  ) : selectedFaculty.gender === 'Female' ? (
                    <span className="text-4xl">👩‍🏫</span>
                  ) : (
                    <span className="text-4xl">👤</span>
                  )}
                </div>
                <h2 className="mt-4 text-2xl font-bold">{selectedFaculty.name}</h2>
                <p className="text-[#621df6] font-medium">{selectedFaculty.role}</p>
                <div className="mt-2">
                  <span className={`inline-flex px-3 py-1 text-sm rounded-full ${selectedFaculty.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                    }`}>
                    {selectedFaculty.status}
                  </span>
                </div>
              </div>

              <div className="w-full md:w-2/3 mt-6 md:mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border rounded-md">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedFaculty.email}</p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">{selectedFaculty.department}</p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <p className="text-sm text-gray-500">Qualification</p>
                    <p className="font-medium">{selectedFaculty.qualification}</p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{selectedFaculty.phoneNumber || "Not provided"}</p>
                  </div>
                  <div className="p-3 border rounded-md md:col-span-2">
                    <p className="text-sm text-gray-500">Joined On</p>
                    <p className="font-medium">{selectedFaculty.createdAt || "Not available"}</p>
                  </div>
                  {selectedFaculty.address && (
                    <div className="p-3 border rounded-md md:col-span-2">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{selectedFaculty.address}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Additional Information</h3>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <p className="text-gray-700">
                      {selectedFaculty.bio || "No additional information available for this faculty member."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white shadow-md rounded-lg">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="md:col-span-1">
              <h2 className="text-xl font-medium text-[#621df6]">
                Faculty Records
              </h2>
            </div>

            <div className="md:col-span-2">
              <div className="flex flex-wrap gap-3">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search faculty..."
                    className="w-full px-4 py-2 pl-9 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#621df6] focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                <button
                  className="flex items-center gap-2 px-4 py-2 bg-[#621df6] text-white rounded-md hover:bg-[#5019d0] transition-colors shadow-md"
                  onClick={() => openPopup()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Add Faculty
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Department Filter */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="w-full md:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#621df6] focus:border-transparent"
                value={filters.department}
                onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              >
                <option value="All Departments">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[60vh]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedFaculty.map((faculty, index) => (
                <tr
                  key={faculty.id || index}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">

                        <div className="h-10 w-10 rounded-full bg-[#621df6] text-white flex items-center justify-center text-xl">
                          {faculty.gender === 'Male' ? '👨‍🏫' : faculty.gender === 'Female' ? '👩‍🏫' : '🧑‍🏫'}
                        </div>

                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{faculty.name}</div>
                        <div className="text-sm text-gray-500">{faculty.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{faculty.department}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{faculty.role || 'N/A'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${faculty.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {faculty.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="p-1 text-[#621df6] hover:bg-[#621df6]/10 rounded-full"
                        onClick={() => viewFaculty(faculty)}
                        title="View Details"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded-full"
                        onClick={() => openPopup(startIndex + index)}
                        title="Edit Faculty"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        className="p-1 text-red-600 hover:bg-red-100 rounded-full"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this faculty member?')) {
                            // Add your delete functionality here
                            // You may want to call a delete API function
                            toast.success('Faculty member deleted successfully');
                          }
                        }}
                        title="Delete Faculty"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paginatedFaculty.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No faculty found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            Showing {paginatedFaculty.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + rowsPerPage, filteredFaculty.length)} of {filteredFaculty.length} faculty members
          </p>

          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded-md ${page === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-[#621df6] border border-gray-300 hover:bg-gray-50"
                }`}
            >
              Previous
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + Math.max(1, Math.min(page - 2, totalPages - 4));
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded-md ${pageNum === page
                      ? "bg-[#621df6] text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded-md ${page === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-[#621df6] border border-gray-300 hover:bg-gray-50"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

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