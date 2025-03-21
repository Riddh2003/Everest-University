import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import useTheme from '../../context/NewContext'; // Import useTheme to access context for managing the sidebar state

function AdminSideBar() {
    // Destructuring the theme context to get sidebar state and toggle function
    const { isOpenForSideBar, setIsOpenForSideBar } = useTheme();

    // State to manage the screen width
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const location = useLocation();

    // Update screen width state on window resize
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Close sidebar on mobile when route changes or screen width changes
    useEffect(() => {
        if (screenWidth < 900) {
            setIsOpenForSideBar(false); // Close only on small screens
        } else if (screenWidth >= 900) {
            setIsOpenForSideBar(true); // Open on larger screens
        }
    }, [screenWidth, location]);

    // Close sidebar on mobile when route changes or screen width changes
    useEffect(() => {
        if (screenWidth < 700) {
            setIsOpenForSideBar(false); // Close only on small screens
        } else if (screenWidth >= 700) {
            setIsOpenForSideBar(true); // Open on larger screens
        }
    }, [screenWidth, location]);

    // Array of navigation links
    const navLinks = [
        {
            to: '/adminportal/newquery',
            name: 'Home',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home">
                    <path d="M3 9l9-7 9 7v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                    <path d="M9 22V12h6v10"></path>
                </svg>
            ),
        },
        {
            to: '/adminportal/professors',
            name: 'Professors',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            ),
        },
        {
            to: '/adminportal/student',
            name: 'Students',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            ),
        },
        {
            to: '/adminportal/admissionrequest',
            name: 'Admissions',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            ),
        },
        {
            to: '/adminportal/courses',
            name: 'Courses',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-book">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
            ),
        },
        {
            to: '/adminportal/circulation',
            name: 'Circulation',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-briefcase">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
            ),
        },
    ];

    return (
        <>
            {/* Sidebar */}
            <div className={`${isOpenForSideBar ? 'w-64' : 'w-20'} bg-blue-600 text-white transition-all duration-300 ease-in-out transform fixed top-0 left-0 h-full mt-16`}>
                {/* Navigation Links - Using div instead of table for better semantics */}
                <div className="mt-8 space-y-4">
                    {navLinks.map(({ to, name, icon }) => (
                        <div key={to} className="flex items-center">
                            <div className="px-6 py-2">
                                <Link to={to} className="flex items-center">
                                    {icon}
                                </Link>
                            </div>
                            {isOpenForSideBar && (
                                <div className="px-6 py-2 hover:bg-blue-500 cursor-pointer hover:rounded">
                                    <Link to={to}>
                                        {name}
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AdminSideBar