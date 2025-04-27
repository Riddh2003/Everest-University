import React, { useState, useEffect } from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";
import { Mail, Phone, Person, CalendarToday, School, Business } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
    const [studentProfile, setStudentProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudentProfile();
    }, []);

    const fetchStudentProfile = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const enrollmentId = localStorage.getItem('enrollmentId') || sessionStorage.getItem('enrollmentId');
            const tokenExpiry = localStorage.getItem('tokenExpiry') || sessionStorage.getItem('tokenExpiry');

            // Check if token exists and is not expired
            if (!token) {
                toast.error("Please login first");
                navigate('/studentlogin');
                return;
            }

            // Check if token is expired
            if (tokenExpiry && new Date(tokenExpiry) <= new Date()) {
                toast.error("Your session has expired. Please login again.");
                // Clear any expired tokens
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                localStorage.removeItem('tokenExpiry');
                sessionStorage.removeItem('tokenExpiry');
                localStorage.removeItem('role');
                sessionStorage.removeItem('role');
                localStorage.removeItem('enrollmentId');
                sessionStorage.removeItem('enrollmentId');
                navigate('/studentlogin');
                return;
            }

            if (!enrollmentId) {
                toast.error("Enrollment ID not found. Please login again.");
                navigate('/studentlogin');
                return;
            }

            const response = await axios.get(`/api/private/student/getstudentprofile?enrollmentId=${enrollmentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setStudentProfile(response.data.data);
                console.log("Student profile data:", response.data.data);
            } else {
                toast.error(response.data.message || "Failed to fetch profile");
            }
        } catch (error) {
            console.error("Error fetching student profile:", error);

            // Check if error is due to unauthorized (401)
            if (error.response && error.response.status === 401) {
                toast.error("Your session has expired. Please login again.");
                // Clear any expired tokens
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                localStorage.removeItem('tokenExpiry');
                sessionStorage.removeItem('tokenExpiry');
                localStorage.removeItem('role');
                sessionStorage.removeItem('role');
                localStorage.removeItem('enrollmentId');
                sessionStorage.removeItem('enrollmentId');
                navigate('/studentlogin');
            } else {
                toast.error("Error loading profile data");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4500e2]"></div>
            </div>
        );
    }

    return (
        <div className="p-4">
            {/* Header */}
            <div className="bg-[#4500e2] text-white p-5 rounded-lg shadow-md">
                <h1 className="text-xl font-semibold">My Profile</h1>
            </div>

            {/* Profile & Details Section */}
            <div className="flex flex-col md:flex-row gap-6 p-6">
                {/* Profile Card */}
                <Card className="bg-gradient-to-r from-[#4500e2] to-[#6e29ff] text-white p-6 w-full md:w-1/3 rounded-2xl shadow-lg">
                    <CardContent className="flex flex-col items-center">
                        <img
                            src={studentProfile?.profilePicture || "https://avatar.iran.liara.run/public"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-white"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://avatar.iran.liara.run/public";
                            }}
                        />
                        <h2 className="text-xl font-bold mt-3 text-center">{studentProfile?.fullname || studentProfile?.student?.name || 'Student Name'}</h2>
                        <p className="text-sm">{studentProfile?.enrollmentId || studentProfile?.student?.enrollmentId || 'N/A'}</p>
                        <p className="text-sm font-semibold">Current Semester: {studentProfile?.currentSem || studentProfile?.student?.currentSem || 'N/A'}</p>
                    </CardContent>
                </Card>

                {/* Details Section */}
                <Card className="p-6 w-full md:w-2/3 bg-white rounded-2xl shadow-lg">
                    <CardContent>
                        <h3 className="text-[#4500e2] text-lg font-semibold mb-4">Student Details</h3>
                        <div className="space-y-3 text-gray-700">
                            <p className="flex items-center gap-2">
                                <School className="text-[#4500e2]" /> {studentProfile?.degreeName || studentProfile?.student?.degreeName || 'EVEREST UNIVERSITY'}
                            </p>
                            <p className="flex items-center gap-2">
                                <Business className="text-[#4500e2]" /> {studentProfile?.degree || studentProfile?.student?.degree || 'Program not available'}
                            </p>
                            <p className="flex items-center gap-2">
                                <Person className="text-[#4500e2]" /> {studentProfile?.gender || studentProfile?.student?.gender || 'N/A'}
                            </p>
                            <p className="flex items-center gap-2">
                                <CalendarToday className="text-[#4500e2]" /> {studentProfile?.dateOfBirth || studentProfile?.student?.dateOfBirth || 'N/A'}
                            </p>
                            <p className="flex items-center gap-2">
                                <Mail className="text-[#4500e2]" /> {studentProfile?.email || studentProfile?.student?.email || 'N/A'}
                            </p>
                            <p className="flex items-center gap-2">
                                <Phone className="text-[#4500e2]" /> {studentProfile?.mobileNo || studentProfile?.student?.mobileNo || 'N/A'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Payment Section */}
            <Card className="p-6 mx-4 bg-white rounded-2xl shadow-lg">
                <CardContent>
                    <h3 className="text-[#4500e2] text-lg font-semibold mb-4">Fee Dues</h3>
                    <div className="p-4 bg-[#4500e2] text-white rounded-xl flex flex-col md:flex-row justify-between items-center">
                        <Typography variant="h6" className="text-center md:text-left">
                            Total Outstanding Amount: ₹ {studentProfile?.fees?.[0]?.due_fees || studentProfile?.student?.fees?.[0]?.due_fees || '0'}
                        </Typography>
                        <Button variant="contained" className="bg-[#6e29ff] hover:bg-[#5a17fa] text-white mt-3 md:mt-0">Pay Now</Button>
                    </div>

                    {/* Payment Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <Card className="p-4 bg-gradient-to-r from-[#4500e2] to-[#6e29ff] text-white rounded-lg shadow-md">
                            <Typography variant="h6">TOTAL FEES</Typography>
                            <Typography variant="h5">₹ {studentProfile?.fees?.[0]?.total_fees || studentProfile?.student?.fees?.[0]?.total_fees || '0'}</Typography>
                        </Card>
                        <Card className="p-4 bg-gradient-to-r from-[#6e29ff] to-[#9747FF] text-white rounded-lg shadow-md">
                            <Typography variant="h6">PAID FEES</Typography>
                            <Typography variant="h5">₹ {studentProfile?.fees?.[0]?.paid_fees || studentProfile?.student?.fees?.[0]?.paid_fees || '0'}</Typography>
                        </Card>
                        <Card className="p-4 bg-gradient-to-r from-[#4500e2] to-[#9747FF] text-white rounded-lg shadow-md col-span-1 md:col-span-2">
                            <Typography variant="h6">STATUS</Typography>
                            <Typography variant="h5">{studentProfile?.fees?.[0]?.fee_status || studentProfile?.student?.fees?.[0]?.fee_status || 'Not Available'}</Typography>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            {/* Timetable Table */}
            <Card className="p-6 mx-4 mt-6 bg-white rounded-2xl shadow-lg">
                <CardContent>
                    <h3 className="text-[#4500e2] text-lg font-semibold mb-4">Timetable</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-[#4500e2] text-white">
                                <tr>
                                    <th className="border border-gray-300 p-2">Lecture No.</th>
                                    <th className="border border-gray-300 p-2">Room No.</th>
                                    <th className="border border-gray-300 p-2">Time</th>
                                    <th className="border border-gray-300 p-2">Subject Code</th>
                                    <th className="border border-gray-300 p-2">Subject Name</th>
                                    <th className="border border-gray-300 p-2">Theory / Practical</th>
                                    <th className="border border-gray-300 p-2">Faculty Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentProfile?.timetable && studentProfile.timetable.length > 0 ? (
                                    studentProfile.timetable.map((item, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-300 p-2">{item.lectureNo}</td>
                                            <td className="border border-gray-300 p-2">{item.roomNo}</td>
                                            <td className="border border-gray-300 p-2">{item.time}</td>
                                            <td className="border border-gray-300 p-2">{item.subjectCode}</td>
                                            <td className="border border-gray-300 p-2">{item.subjectName}</td>
                                            <td className="border border-gray-300 p-2">{item.type}</td>
                                            <td className="border border-gray-300 p-2">{item.facultyName}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="border border-gray-300 p-2 text-center">No data found..!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MyProfile;
