import React, { useState } from 'react';

const Payments = () => {
    const studentId = 101; // Temporary static student ID (Replace this with actual authenticated user ID later)
    const [semester, setSemester] = useState('1');
    const [year, setYear] = useState(new Date().getFullYear());

    // Dummy payment data
    const allPayments = [
        { id: 1, studentId: 101, transactionId: 'TRX1001', amount: 10000, date: '2025-01-15', semester: '1', year: 2025, status: 'Paid' },
        { id: 2, studentId: 101, transactionId: 'TRX1002', amount: 12000, date: '2025-02-20', semester: '2', year: 2025, status: 'Pending' },
        { id: 3, studentId: 101, transactionId: 'TRX1003', amount: 15000, date: '2024-09-10', semester: '3', year: 2024, status: 'Paid' },
        { id: 4, studentId: 102, transactionId: 'TRX2001', amount: 14000, date: '2025-03-05', semester: '1', year: 2025, status: 'Failed' },
        { id: 5, studentId: 101, transactionId: 'TRX1004', amount: 16000, date: '2023-06-12', semester: '4', year: 2023, status: 'Paid' },
    ];

    // Filter payments by student ID, semester, and year
    const filteredPayments = allPayments.filter(
        (payment) => payment.studentId === studentId && payment.semester === semester && payment.year === parseInt(year)
    );

    // Group payments by year and semester to show total payments
    const paymentsSummary = allPayments
        .filter((payment) => payment.studentId === studentId)
        .reduce((summary, payment) => {
            const key = `${payment.year}-${payment.semester}`;
            if (!summary[key]) {
                summary[key] = { semester: payment.semester, year: payment.year, totalAmount: 0 };
            }
            summary[key].totalAmount += payment.amount;
            return summary;
        }, {});

    const sortedSummary = Object.values(paymentsSummary).sort(
        (a, b) => a.year - b.year || a.semester - b.semester
    );

    return (
        <div className="px-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Payment History</h2>
                <div className="flex gap-4">
                    <select
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

                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="border p-2 rounded"
                    >
                        {[2022, 2023, 2024, 2025, 2026].map((yr) => (
                            <option key={yr} value={yr}>
                                {yr}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Payment Summary */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Payment Summary</h3>
                <table className="min-w-full table-auto">
                    <thead className="bg-[#345D7C] text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Year</th>
                            <th className="px-6 py-3 text-left">Semester</th>
                            <th className="px-6 py-3 text-left">Total Paid (₹)</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {sortedSummary.length > 0 ? (
                            sortedSummary.map((summary) => (
                                <tr key={`${summary.year}-${summary.semester}`} className="border-b">
                                    <td className="px-6 py-4">{summary.year}</td>
                                    <td className="px-6 py-4">{summary.semester}</td>
                                    <td className="px-6 py-4">₹{summary.totalAmount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-4 text-gray-500">
                                    No payment summary found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Payments Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-[#345D7C] text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Transaction ID</th>
                            <th className="px-6 py-3 text-left">Amount (₹)</th>
                            <th className="px-6 py-3 text-left">Date</th>
                            <th className="px-6 py-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filteredPayments.length > 0 ? (
                            filteredPayments.map((payment) => (
                                <tr key={payment.id} className="border-b hover:bg-gray-100">
                                    <td className="px-6 py-4">{payment.transactionId}</td>
                                    <td className="px-6 py-4">₹{payment.amount}</td>
                                    <td className="px-6 py-4">{payment.date}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`${payment.status === 'Paid'
                                                ? 'text-green-500'
                                                : payment.status === 'Pending'
                                                    ? 'text-yellow-500'
                                                    : 'text-red-500'
                                                } font-semibold`}
                                        >
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    No payments found for selected semester and year.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payments;
