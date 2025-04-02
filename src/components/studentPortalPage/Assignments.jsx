import React, { useState, useEffect } from 'react';

const Assignments = () => {
    const studentId = 101; // Temporary static student ID (Replace this with actual authenticated user ID later)
    const [semester, setSemester] = useState('1');
    const [assignments, setAssignments] = useState([
        {
            id: 1,
            studentId: 101,
            title: 'Assignment 1: Math Homework',
            description: 'Solve the problems on page 45, 46, and 47.',
            dueDate: '2025-02-15',
            status: 'Pending',
            semester: '1', // Added semester field
        },
        {
            id: 2,
            studentId: 101,
            title: 'Assignment 2: Science Report',
            description: 'Write a report on the Solar System.',
            dueDate: '2025-02-20',
            status: 'Completed',
            semester: '2', // Added semester field
        },
        {
            id: 3,
            studentId: 101,
            title: 'Assignment 3: History Essay',
            description: 'Write an essay about World War II.',
            dueDate: '2025-02-22',
            status: 'Pending',
            semester: '1', // Added semester field
        },
        {
            id: 4,
            studentId: 102,
            title: 'Assignment 4: Chemistry Lab Report',
            description: 'Complete the lab report on chemical reactions.',
            dueDate: '2025-03-01',
            status: 'Pending',
            semester: '1',
        },
    ]);

    useEffect(() => {
        // Fetch assignments from API if needed
    }, []);

    // Filter assignments by studentId and semester
    const filteredAssignments = assignments.filter(
        (assignment) => assignment.studentId === studentId && assignment.semester === semester
    );

    return (
        <div className="overflow-x-auto px-4 py-6">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">Assignments</h2>

            {/* Semester Filter */}
            <div className="mb-4">
                <label htmlFor="semester" className="mr-2">Select Semester:</label>
                <select
                    id="semester"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="border p-2 rounded"
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <option key={sem} value={sem}>
                            Semester {sem}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table View for Large Screens */}
            <table className="w-full table-auto border border-gray-300 hidden md:table">
                <thead>
                    <tr className="border-b bg-blue-500 text-white text-lg">
                        <th className="px-4 py-3 text-left">Title</th>
                        <th className="px-4 py-3 text-left">Description</th>
                        <th className="px-4 py-3 text-left">Due Date</th>
                        <th className="px-4 py-3 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssignments.length > 0 ? (
                        filteredAssignments.map((assignment) => (
                            <tr key={assignment.id} className="border-b">
                                <td className="px-4 py-3">{assignment.title}</td>
                                <td className="px-4 py-3">{assignment.description}</td>
                                <td className="px-4 py-3">{assignment.dueDate}</td>
                                <td className="px-4 py-3">{assignment.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-gray-500">
                                No assignments found for this semester.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Responsive Card View for Small Screens */}
            <div className="md:hidden mt-4 space-y-4">
                {filteredAssignments.length > 0 ? (
                    filteredAssignments.map((assignment) => (
                        <div key={assignment.id} className="p-4 border rounded-lg shadow">
                            <h3 className="text-lg font-bold">{assignment.title}</h3>
                            <p><strong>Description:</strong> {assignment.description}</p>
                            <p><strong>Due Date:</strong> {assignment.dueDate}</p>
                            <p><strong>Status:</strong> {assignment.status}</p>
                        </div>
                    ))
                ) : (
                    <div className="p-4 border rounded-lg shadow text-center text-gray-500">
                        No assignments found for this semester.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Assignments;
