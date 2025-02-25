import React from "react";
import { Card, CardContent, Button, AppBar, Toolbar, Typography } from "@mui/material";
import { Mail, Phone, Person, CalendarToday, School, Business } from "@mui/icons-material";

const MyProfile = () => {
    return (
        <div className="p-4 ">
            {/* Navbar */}
            <AppBar position="static" className="bg-[#345D7C]">
                <Toolbar className="bg-[#345D7C]">
                    <Typography variant="h6" className="text-white ">My Profile</Typography>
                </Toolbar>
            </AppBar>

            {/* Profile & Details Section */}
            <div className="flex flex-col md:flex-row gap-6 p-6">
                {/* Profile Card */}
                <Card className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 w-full md:w-1/3 rounded-2xl shadow-lg">
                    <CardContent className="flex flex-col items-center">
                        <img
                            src="/profile.jpg"
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-white"
                        />
                        <h2 className="text-xl font-bold mt-3 text-center">JADAV SUMIT HARSHADBHAI</h2>
                        <p className="text-sm">2204050200208</p>
                        <p className="text-sm font-semibold">Current Semester: 6</p>
                    </CardContent>
                </Card>

                {/* Details Section */}
                <Card className="p-6 w-full md:w-2/3 bg-[#FAF4E8] rounded-2xl shadow-lg">
                    <CardContent>
                        <h3 className="text-[#345D7C] text-lg font-semibold mb-4">Student Details</h3>
                        <div className="space-y-3 text-[#345D7C]">
                            <p className="flex items-center gap-2">
                                <School className="text-[#81ACC3]" /> SILVER OAK COLLEGE OF COMPUTER APPLICATION
                            </p>
                            <p className="flex items-center gap-2">
                                <Business className="text-[#81ACC3]" /> INTEGRATED MASTER OF SCIENCE INFORMATION TECHNOLOGY
                            </p>
                            <p className="flex items-center gap-2">
                                <Person className="text-[#81ACC3]" /> Male
                            </p>
                            <p className="flex items-center gap-2">
                                <CalendarToday className="text-[#81ACC3]" /> 18-07-2003
                            </p>
                            <p className="flex items-center gap-2">
                                <Mail className="text-[#81ACC3]" /> sumitroyaltechnosoft7@gmail.com
                            </p>
                            <p className="flex items-center gap-2">
                                <Phone className="text-[#81ACC3]" /> 7016994734
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Payment Section */}
            <Card className="p-6 mx-4 bg-[#D8D4CF] rounded-2xl shadow-lg">
                <CardContent>
                    <h3 className="text-[#345D7C] text-lg font-semibold mb-4">Fee Dues</h3>
                    <div className="p-4 bg-[#243B55] text-white rounded-xl flex flex-col md:flex-row justify-between items-center">
                        <Typography variant="h6" className="text-center md:text-left">Total Outstanding Amount: ₹ 39,250</Typography>
                        <Button variant="contained" className="bg-red-500 text-white mt-3 md:mt-0">Pay Now</Button>
                    </div>

                    {/* Payment Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <Card className="p-4 bg-gradient-to-r from-blue-500 to-blue-300 text-white rounded-lg shadow-md">
                            <Typography variant="h6">TUITION FEES</Typography>
                            <Typography variant="h5">₹ 32,750</Typography>
                        </Card>
                        <Card className="p-4 bg-gradient-to-r from-blue-400 to-blue-200 text-white rounded-lg shadow-md">
                            <Typography variant="h6">TUITION FEES</Typography>
                            <Typography variant="h5">₹ 5,000</Typography>
                        </Card>
                        <Card className="p-4 bg-gradient-to-r from-red-500 to-red-300 text-white rounded-lg shadow-md col-span-1 md:col-span-2">
                            <Typography variant="h6">PROFESSIONAL REGULATORY CHARGES</Typography>
                            <Typography variant="h5">₹ 1,500</Typography>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            {/* Attendance Table */}
            <Card className="p-6 mx-4 mt-6 bg-white rounded-2xl shadow-lg">
                <CardContent>
                    <h3 className="text-[#345D7C] text-lg font-semibold mb-4">Attendance</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border border-gray-300 p-2">Subject Code</th>
                                    <th className="border border-gray-300 p-2">Subject Name</th>
                                    <th className="border border-gray-300 p-2">Theory (%)</th>
                                    <th className="border border-gray-300 p-2">Practical (%)</th>
                                    <th className="border border-gray-300 p-2">Overall (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="border border-gray-300 p-2 text-center">No data found..!</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Timetable Table */}
            <Card className="p-6 mx-4 mt-6 bg-white rounded-2xl shadow-lg">
                <CardContent>
                    <h3 className="text-[#345D7C] text-lg font-semibold mb-4">Timetable</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-200">
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
                                <tr>
                                    <td colSpan="7" className="border border-gray-300 p-2 text-center">No data found..!</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MyProfile;
