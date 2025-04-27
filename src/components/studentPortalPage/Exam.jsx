import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "http://localhost:9999/api/private/student";

const Exam = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('all');
    const [semesters, setSemesters] = useState([]);

    useEffect(() => {
        fetchResults();
    }, []);

    // Filter results when selectedSemester changes
    useEffect(() => {
        filterResults();
    }, [selectedSemester, results]);

    const fetchResults = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const enrollmentId = localStorage.getItem("enrollmentId");

            if (!token || !enrollmentId) {
                toast.error("Please login first");
                return;
            }

            const response = await axios.get(`${API_URL}/getresults`, {
                params: { enrollmentId },
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log(response.data);
            if (response.data.success) {
                const resultData = response.data.data;
                setResults(resultData);

                // Extract unique semesters for filter
                const uniqueSemesters = [...new Set(resultData.map(result => result.semNumber))].sort((a, b) => a - b);
                setSemesters(uniqueSemesters);
            } else {
                toast.warning(response.data.message || "No results found");
            }
        } catch (error) {
            console.error("Error fetching results:", error);
            toast.error("Failed to fetch exam results");
        } finally {
            setLoading(false);
        }
    };

    const filterResults = () => {
        if (selectedSemester === 'all') {
            setFilteredResults(results);
        } else {
            const filtered = results.filter(result => result.semNumber === parseInt(selectedSemester));
            setFilteredResults(filtered);
        }
    };

    const handleSemesterChange = (e) => {
        setSelectedSemester(e.target.value);
    };

    // Function to determine appropriate color for grade display
    const getGradeColor = (grade) => {
        switch (grade) {
            case 'A':
            case 'A+': return 'text-green-600';
            case 'B':
            case 'B+': return 'text-blue-600';
            case 'C':
            case 'C+': return 'text-yellow-600';
            case 'D': return 'text-orange-600';
            case 'F': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="overflow-x-auto px-4 pb-6">
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-xl font-bold text-[#4500e2] mb-3 sm:mb-0">Examination Results</h2>

                {/* Semester Filter */}
                {semesters.length > 0 && (
                    <div className="flex items-center">
                        <label htmlFor="semesterFilter" className="mr-2 text-gray-700 font-medium">Filter by Semester:</label>
                        <select
                            id="semesterFilter"
                            value={selectedSemester}
                            onChange={handleSemesterChange}
                            className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#4500e2]"
                        >
                            <option value="all">All Semesters</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                <option key={sem} value={sem}>Semester {sem}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4500e2]"></div>
                </div>
            ) : results.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No examination results available</p>
                </div>
            ) : filteredResults.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No results for the selected semester</p>
                </div>
            ) : (
                <>
                    {/* Table View for Larger Screens */}
                    <div className="overflow-hidden rounded-lg shadow-lg">
                        <table className="min-w-full table-auto hidden sm:table bg-white">
                            <thead className="bg-[#4500e2]">
                                <tr className="text-white">
                                    <th className="px-4 py-3 text-left text-sm font-medium">Subject</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">Semester</th>
                                    <th className="px-4 py-3 text-center text-sm font-medium">Marks</th>
                                    <th className="px-4 py-3 text-center text-sm font-medium">Grade</th>
                                    <th className="px-4 py-3 text-center text-sm font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResults.map((result) => (
                                    <tr key={result.resultId} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm">{result.subjectName}</td>
                                        <td className="px-4 py-3 text-sm">Semester {result.semNumber}</td>
                                        <td className="px-4 py-3 text-center text-sm">
                                            {result.marksObtained} / {result.totalMarks}
                                            <span className="text-xs text-gray-500 ml-1">
                                                ({((result.marksObtained / result.totalMarks) * 100).toFixed(1)}%)
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm">
                                            <span className={`font-bold ${getGradeColor(result.grade)}`}>
                                                {result.grade}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                                ${result.resultStatus === 'PASS'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'}`}>
                                                {result.resultStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Responsive Card View for Mobile Screens */}
                    <div className="sm:hidden mt-4 grid grid-cols-1 gap-4">
                        {filteredResults.map((result) => (
                            <div key={result.resultId} className="bg-white p-4 border rounded-lg shadow-md">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-bold text-[#4500e2]">{result.subjectName}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                        ${result.resultStatus === 'PASS'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'}`}>
                                        {result.resultStatus}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Semester {result.semNumber}</p>
                                <div className="mt-3 flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-medium text-[#4500e2]">Marks:</p>
                                        <p>{result.marksObtained} / {result.totalMarks}</p>
                                        <p className="text-xs text-gray-500">
                                            ({((result.marksObtained / result.totalMarks) * 100).toFixed(1)}%)
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-[#4500e2]">Grade:</p>
                                        <p className={`text-xl font-bold ${getGradeColor(result.grade)}`}>
                                            {result.grade}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Exam;
