import React, { useState, useEffect } from 'react';

const Exam = () => {
    // Sample data for exam details (replace with API data if needed)
    const [exams, setExams] = useState([
        {
            id: 1,
            subject: 'Mathematics',
            date: '2025-03-15',
            time: '10:00 AM - 12:00 PM',
            duration: '2 hours',
            venue: 'Room A1',
            status: 'Scheduled',
        },
        {
            id: 2,
            subject: 'Physics',
            date: '2025-03-18',
            time: '2:00 PM - 4:00 PM',
            duration: '2 hours',
            venue: 'Room B2',
            status: 'Completed',
        },
        {
            id: 3,
            subject: 'Chemistry',
            date: '2025-03-20',
            time: '9:00 AM - 11:00 AM',
            duration: '2 hours',
            venue: 'Room C3',
            status: 'Scheduled',
        },
    ]);

    useEffect(() => {
        // Fetch exam details from API if needed
    }, []);

    return (
        <div className="overflow-x-auto px-4">
            <h2 className="text-xl font-bold mb-4 text-[#345D7C]">Exam Details</h2>

            {/* Table View for Larger Screens */}
            <table className="min-w-full table-auto hidden md:table">
                <thead className="bg-[#345D7C]">
                    <tr className='text-white'>
                        <th className="px-6 py-3 text-lg text-left">Subject</th>
                        <th className="px-6 py-3 text-lg text-left">Date</th>
                        <th className="px-6 py-3 text-lg text-left">Time</th>
                        <th className="px-6 py-3 text-lg text-left">Duration</th>
                        <th className="px-6 py-3 text-lg text-left">Venue</th>
                        <th className="px-6 py-3 text-lg text-left">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {exams.map((exam) => (
                        <tr key={exam.id} className="border-b hover:bg-gray-100">
                            <td className="px-6 py-4">{exam.subject}</td>
                            <td className="px-6 py-4">{exam.date}</td>
                            <td className="px-6 py-4">{exam.time}</td>
                            <td className="px-6 py-4">{exam.duration}</td>
                            <td className="px-6 py-4">{exam.venue}</td>
                            <td className="px-6 py-4">
                                <span
                                    className={`${exam.status === 'Scheduled'
                                        ? 'text-blue-500'
                                        : 'text-green-500'
                                        } font-semibold`}
                                >
                                    {exam.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Responsive Card View for Mobile Screens */}
            <div className="md:hidden mt-6 space-y-4">
                {exams.map((exam) => (
                    <div key={exam.id} className="bg-white p-4 border rounded-lg shadow-md">
                        <h3 className="text-lg font-bold mb-2">{exam.subject}</h3>
                        <p><strong>Date:</strong> {exam.date}</p>
                        <p><strong>Time:</strong> {exam.time}</p>
                        <p><strong>Duration:</strong> {exam.duration}</p>
                        <p><strong>Venue:</strong> {exam.venue}</p>
                        <p>
                            <strong>Status:</strong>{' '}
                            <span className={exam.status === 'Scheduled' ? 'text-blue-500' : 'text-green-500'}>
                                {exam.status}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Exam;
