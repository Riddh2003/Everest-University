import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Loader from "../basicComponents/Loader";

function Students() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        program: "All Programs",
    });
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchStudents = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('Please login first');
                navigate('/adminlogin');
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get('http://localhost:9999/api/private/profile/getallstudents', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data !== undefined && response.data !== null) {
                    if (Array.isArray(response.data)) {
                        setStudents(response.data);
                    } else if (response.data.data && Array.isArray(response.data.data)) {
                        setStudents(response.data.data);
                    } else {
                        setStudents(Array.isArray(response.data) ? response.data : [response.data]);
                    }
                } else {
                    throw new Error('No data received from server');
                }
            } catch (error) {
                console.error('Error fetching students:', error);

                if (error.response?.status === 401) {
                    toast.error('Session expired. Please login again');
                    localStorage.removeItem('token');
                    navigate('/adminlogin');
                } else {
                    toast.error(error.message || 'Error fetching student data');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [navigate]);

    const handleDeleteStudent = async (enrollmentId) => {
        if (!window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
            return;
        }

        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Please login first');
            navigate('/adminlogin');
            return;
        }

        try {
            setDeleteLoading(true);

            const response = await axios.delete(`http://localhost:9999/api/private/admin/deletestudent`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    enrollmentId: enrollmentId
                }
            });

            if (response.data.success) {
                toast.success('Student deleted successfully');
                // Update the students list by removing the deleted student
                setStudents(students.filter(student => student.enrollmentId !== enrollmentId));
            } else {
                throw new Error(response.data.message || 'Failed to delete student');
            }
        } catch (error) {
            console.error('Error deleting student:', error);
            toast.error(error.response?.data?.message || error.message || 'Error deleting student');
        } finally {
            setDeleteLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.surName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.enrollmentId?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesProgram = filters.program === "All Programs" || student.program === filters.program;

        return matchesSearch && matchesProgram;
    });

    // Pagination
    const startIndex = (page - 1) * rowsPerPage;
    const paginatedStudents = filteredStudents.slice(startIndex, startIndex + rowsPerPage);
    const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

    if (loading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-white/80 z-50">
                <Loader />
            </div>
        );
    }

    return (
        <div className="w-full">
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="bg-white shadow-md rounded-lg">
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="md:col-span-1">
                            <h2 className="text-xl font-medium text-[#621df6]">
                                Student Records
                            </h2>
                        </div>

                        <div className="md:col-span-2">
                            <div className="flex flex-wrap gap-3">
                                <div className="relative flex-grow">
                                    <input
                                        type="text"
                                        placeholder="Search students..."
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
                            </div>
                        </div>
                    </div>
                </div>

                {/* Program Filter */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="w-full md:w-64">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#621df6] focus:border-transparent"
                                value={filters.program}
                                onChange={(e) => setFilters({ ...filters, program: e.target.value })}
                            >
                                <option value="All Programs">All Programs</option>
                                <option value="UG">Undergraduate</option>
                                <option value="PG">Postgraduate</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto max-h-[60vh]">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedStudents.map((student, index) => (
                                <tr
                                    key={student.enrollmentId || index}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.enrollmentId}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-[#621df6] text-white flex items-center justify-center text-xl">
                                                    {student.gender === 'Male' ? '👨‍🎓' : student.gender === 'Female' ? '👩‍🎓' : '🧑‍🎓'}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {student.firstName} {student.surName}
                                                </div>
                                                <div className="text-sm text-gray-500">{student.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.program}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.degree}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Sem {student.currentSem}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                className="p-1 text-[#621df6] hover:bg-[#621df6]/10 rounded-full"
                                                onClick={() => navigate(`/admin/students/${student.enrollmentId}`)}
                                                title="View Details"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <button
                                                className="p-1 text-red-600 hover:bg-red-100 rounded-full"
                                                onClick={() => handleDeleteStudent(student.enrollmentId)}
                                                title="Delete Student"
                                                disabled={deleteLoading}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {paginatedStudents.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                        No students found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        Showing {paginatedStudents.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + rowsPerPage, filteredStudents.length)} of {filteredStudents.length} students
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
        </div>
    );
}

export default Students; 