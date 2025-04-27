import React, { useState, useEffect } from "react";
import StudentsForm from './StudentsForm';
import axios from "axios";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Simple icon components since we don't have Heroicons
const PlusIcon = () => <span className="inline-block w-5 h-5 text-center font-bold">+</span>;
const EyeIcon = () => <span className="inline-block w-5 h-5 text-center">👁️</span>;
const PencilIcon = () => <span className="inline-block w-5 h-5 text-center">✏️</span>;
const TrashIcon = () => <span className="inline-block w-5 h-5 text-center">🗑️</span>;
const SearchIcon = () => <span className="inline-block w-5 h-5 text-center">🔍</span>;

const Student = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const toggleDropdown = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const openPopup = (index) => {
    setCurrentStudent({ ...filteredStudents[index], index });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setCurrentStudent(null);
    setIsPopupOpen(false);
  };

  const openViewPopup = (index) => {
    setViewStudent(filteredStudents[index]);
    setIsViewPopupOpen(true);
  };

  const closeViewPopup = () => {
    setViewStudent(null);
    setIsViewPopupOpen(false);
  };

  const openDeleteConfirm = (index) => {
    setStudentToDelete({ ...filteredStudents[index], index });
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setStudentToDelete(null);
    setIsDeleteConfirmOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStudents = [...students];
    updatedStudents[currentStudent.index] = { ...currentStudent };
    delete updatedStudents[currentStudent.index].index;
    setStudents(updatedStudents);
    closePopup();
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found.");
        return;
      }

      // Call the delete API endpoint
      const response = await axios.post(
        "http://localhost:9999/api/private/student/deletestudent",
        { enrollmentId: studentToDelete.enrollmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        // Show success toast
        toast.success("Student deleted successfully");

        // Update the UI by removing the deleted student
        const updatedStudents = students.filter(s => s.enrollmentId !== studentToDelete.enrollmentId);
        setStudents(updatedStudents);
        setFilteredStudents(filteredStudents.filter(s => s.enrollmentId !== studentToDelete.enrollmentId));
        closeDeleteConfirm();
      } else {
        // Show error toast
        toast.error(response.data.message || "Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error(error.response?.data?.message || "Error deleting student. Please try again.");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterStudents(students, term);
  };

  const filterStudents = (studentList, term) => {
    if (!term) {
      setFilteredStudents(studentList);
      return;
    }

    const filtered = studentList.filter(student =>
      student.firstName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        console.error("No token found.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:9999/api/private/student/getallstudent",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      // Check if response data has a data property, otherwise use the response data directly
      let studentData = [];
      if (response.data && response.data.data) {
        studentData = response.data.data;
      } else {
        studentData = response.data || [];
      }

      setStudents(studentData);
      setFilteredStudents(studentData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <ToastContainer position="top-center" autoClose={3000} transition={Flip} />
      {/* Page Title and Add Button */}
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-800 border-l-4 border-indigo-600 pl-3">
          Students
        </h1>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search by first name..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 w-full lg:w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'} found
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-auto max-h-[calc(100vh-250px)]">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                      Enrollment ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                      Program
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                      Current Sem
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents && filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-indigo-50'} hover:bg-indigo-100 transition-colors duration-150`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.enrollmentId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.firstName} {student.middleName} {student.surName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.program}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.currentSem}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              className="p-1 rounded-full text-indigo-600 hover:bg-indigo-100"
                              title="View"
                              onClick={() => openViewPopup(index)}
                            >
                              <EyeIcon />
                            </button>
                            <button
                              className="p-1 rounded-full text-indigo-800 hover:bg-indigo-100"
                              title="Edit"
                              onClick={() => openPopup(index)}
                            >
                              <PencilIcon />
                            </button>
                            <button
                              className="p-1 rounded-full text-red-600 hover:bg-red-100"
                              title="Delete"
                              onClick={() => openDeleteConfirm(index)}
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                        {searchTerm ? 'No students match your search.' : 'No students found.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Student Popup */}
      {isPopupOpen && (
        <StudentsForm
          studentData={currentStudent}
          onClose={closePopup}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}

      {/* View Student Popup */}
      {isViewPopupOpen && viewStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-indigo-800">
                Student Details
              </h2>
              <button
                onClick={closeViewPopup}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Enrollment ID</p>
                    <p className="font-medium text-indigo-800">{viewStudent.enrollmentId}</p>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-indigo-800">{viewStudent.firstName} {viewStudent.middleName} {viewStudent.surName}</p>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium text-indigo-800">{viewStudent.gender}</p>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium text-indigo-800">{viewStudent.dateOfBirth}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-indigo-800">{viewStudent.email}</p>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="font-medium text-indigo-800">{viewStudent.mobileNo}</p>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Program & Degree</p>
                    <p className="font-medium text-indigo-800">{viewStudent.program} - {viewStudent.degreeName} ({viewStudent.degree})</p>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Current Semester & Year</p>
                    <p className="font-medium text-indigo-800">Semester {viewStudent.currentSem}, Year {viewStudent.currentYear}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={closeViewPopup}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {isDeleteConfirmOpen && studentToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-red-600">
                Confirm Delete
              </h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete student <span className="font-semibold">{studentToDelete.firstName} {studentToDelete.surName}</span> with enrollment ID <span className="font-semibold">{studentToDelete.enrollmentId}</span>?
              </p>
              <p className="text-gray-700 mb-4 text-sm">
                This action cannot be undone.
              </p>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={closeDeleteConfirm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;