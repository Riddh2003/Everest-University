import React, { useState, useEffect } from "react";

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [semester, setSemester] = useState("");
    const [studentName, setStudentName] = useState("");

    useEffect(() => {
        // Get the JWT token from localStorage
        const token = localStorage.getItem("token");
        if (token) {
            // Decode the token to extract student data (e.g., student ID or name)
            const studentInfo = JSON.parse(atob(token.split('.')[1])); // Assuming JWT is in 'base64'
            setStudentName(studentInfo.name);
            fetchAttendanceData(studentInfo.id);
        }
    }, []);

    const fetchAttendanceData = async (studentId) => {
        try {
            const response = await fetch(`API_URL/attendance/${studentId}`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
            });
            const data = await response.json();
            setAttendanceData(data);
        } catch (err) {
            console.error("Error fetching attendance data:", err);
        }
    };

    const filterBySemester = (semester) => {
        return attendanceData.filter((attendance) => attendance.semester === semester);
    };

    return (
        <div className="w-full p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-500">Welcome, {studentName}</h2>

            {/* Semester Filter */}
            <div className="mb-8">
                <label className="mr-4">Select Semester:</label>
                <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="border p-3 rounded-md"
                >
                    <option value="">All Semesters</option>
                    <option value="1st Sem">1st Sem</option>
                    <option value="2nd Sem">2nd Sem</option>
                    <option value="3rd Sem">3rd Sem</option>
                    <option value="4th Sem">4th Sem</option>
                    <option value="5th Sem">5th Sem</option>
                    <option value="6th Sem">6th Sem</option>
                </select>
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="border border-gray-300 px-6 py-3 text-left">Date</th>
                            <th className="border border-gray-300 px-6 py-3 text-left">Subject</th>
                            <th className="border border-gray-300 px-6 py-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filterBySemester(semester).map((record) => (
                            <tr key={record.id} className="border-b hover:bg-gray-100">
                                <td className="border border-gray-300 px-6 py-4">{record.date}</td>
                                <td className="border border-gray-300 px-6 py-4">{record.subject}</td>
                                <td className="border border-gray-300 px-6 py-4">{record.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;
