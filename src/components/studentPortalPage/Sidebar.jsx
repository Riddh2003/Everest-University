import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useTheme from '../../context/NewContext'; // Import useTheme to access context for managing the sidebar state

const Sidebar = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);
    const { isOpenForSideBar, toggleSidebar } = useTheme();

    const navLinks = [
        {
            to: '/studentportal/myprofile',
            name: 'My Profile',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            ),
        },
        {
            to: '/studentportal/exam',
            name: 'Exam',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-book">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
            ),
        },
        {
            to: '/studentportal/assignments',
            name: 'Assignments',
            color: 'red',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clipboard">
                    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM12 1v4"></path>
                    <path d="M19 7H5"></path>
                </svg>
            ),
        },
        {
            to: '/studentportal/coursematerial',
            name: 'Course Materials',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-folder">
                    <path d="M22 19V7a2 2 0 0 0-2-2H12l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"></path>
                </svg>
            ),
        },
        {
            to: '/studentportal/attendance',
            name: 'Attendance',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-square">
                    <path d="M9 11l3 3L22 4"></path>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
            ),
        },
        {
            to: '/studentportal/payments',
            name: 'Payment',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-credit-card">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
            ),
        },
        {
            to: '/',
            name: 'Logout',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
            ),
        },
    ];

    return (
        <div>
            {/* Sidebar */}
            <div className={`${isOpenForSideBar ? 'w-64' : 'w-20'} bg-blue-600 text-white transition-all duration-300 ease-in-out transform fixed flex flex-col justify-between top-0 left-0 h-full`}>
                {/* Navigation Links */}
                <div className="space-y-4">
                    <div className="p-4 border-b">
                        <Link to='/studentportal' className="text-2xl font-bold">
                            Student Portal
                        </Link>
                    </div>
                    {navLinks.map(({ to, name, icon }) => (
                        <div key={to} className="flex items-center">
                            <Link to={to} onClick={() => setActiveItem(to)} className={`flex items-center w-full px-6 py-2 hover:bg-blue-500 cursor-pointer ${activeItem === to ? 'bg-blue-500' : ''}`}>
                                <span className="mr-4">{icon}</span>
                                <span className={`${isOpenForSideBar ? 'block' : 'hidden'} ${name === 'Logout' ? 'text-red-500' : 'text-white'} font-semibold text-md`}>{name}</span>
                            </Link>
                        </div>
                    ))}
                </div>
                {/* User Profile Section */}
                <div className="p-4 border-t border-gray-200">
                    <Link to='myprofile' className="flex items-center">
                        <img
                            src="https://avatar.iran.liara.run/public"
                            alt="User"
                            className="w-10 h-10 transition-opacity duration-300 rounded-full opacity-100"
                            loading="lazy"
                        />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white">Student Name</p>
                            <p className="text-xs text-white">student@uni.edu</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default Sidebar;
