import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTheme from '../../context/NewContext';
import axios from 'axios';
import { toast } from 'react-toastify';

// Simple icon components
const PersonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const PeopleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const WorkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const SchoolIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

function AdminSideBar() {
    const { isOpenForSideBar, setIsOpenForSideBar } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [adminData, setAdminData] = useState({});

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        // Initial check
        checkIsMobile();

        // Add event listener for window resize
        window.addEventListener('resize', checkIsMobile);

        // Set sidebar state based on device
        if (window.innerWidth < 1024) {
            setIsOpenForSideBar(false);
        } else {
            setIsOpenForSideBar(true);
        }

        // Fetch admin profile data
        fetchAdminProfile();

        // Cleanup event listener
        return () => window.removeEventListener('resize', checkIsMobile);
    }, [setIsOpenForSideBar]);

    const fetchAdminProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            if (!token || !email) return;

            const response = await axios.get(`http://localhost:9999/api/private/admin/getadminbyemail?email=${email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Admin profile response:", response.success);
            if (response.success) {
                setAdminData(response.data);
            }
        } catch (error) {
            console.error("Error fetching admin profile:", error);
            // Set fallback data when there's an error
            const email = localStorage.getItem('email');
            if (email) {
                setAdminData(prev => ({
                    ...prev,
                    email: email
                }));
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        sessionStorage.removeItem('token');
        toast.success("Logged out successfully");
        navigate('/adminlogin');
    };

    // Array of navigation links with icons
    const navLinks = [
        {
            to: '/adminportal/adminprofile',
            name: 'Admin Profile',
            icon: <PersonIcon />,
        },
        {
            to: '/adminportal/professors',
            name: 'Professors',
            icon: <PersonIcon />,
        },
        {
            to: '/adminportal/student',
            name: 'Students',
            icon: <PeopleIcon />,
        },
        {
            to: '/adminportal/admissionrequest',
            name: 'Admissions',
            icon: <SchoolIcon />,
        },
        {
            to: '/adminportal/courses',
            name: 'Courses',
            icon: <BookIcon />,
        },
        {
            to: '/adminportal/circulation',
            name: 'Circulation',
            icon: <WorkIcon />,
        },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                aria-label="toggle sidebar"
                onClick={() => setIsOpenForSideBar(!isOpenForSideBar)}
                className={`fixed z-50 bg-indigo-600 text-white p-2 rounded-lg shadow-lg transition-all duration-300 ${isOpenForSideBar ? 'lg:left-60 left-[16rem]' : 'left-4'
                    } top-4 lg:hidden`}
            >
                {isOpenForSideBar ? <ChevronLeftIcon /> : <MenuIcon />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed h-screen top-0 left-0 z-40 transition-all duration-300 ease-in-out ${isOpenForSideBar ? 'w-60 lg:w-60 md:w-64 sm:w-64' : 'w-0 lg:w-16'
                    } ${isMobile && !isOpenForSideBar ? '-translate-x-full' : 'translate-x-0'}`}
            >
                <div className="h-full flex flex-col bg-gradient-to-b from-indigo-600 to-purple-600 text-white shadow-xl overflow-hidden">
                    {/* Logo/Title */}
                    <div className="flex items-center justify-center p-4 border-b border-indigo-400/30">
                        <div className="flex flex-col items-center gap-2">
                            <SchoolIcon className="w-20 h-12" />
                            {isOpenForSideBar && (
                                <h1 className="text-lg font-bold tracking-wider">Everest University</h1>
                            )}
                        </div>
                    </div>

                    {/* Toggle button for desktop */}
                    {!isMobile && (
                        <div className="flex justify-center my-2">
                            <button
                                onClick={() => setIsOpenForSideBar(!isOpenForSideBar)}
                                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                {isOpenForSideBar ? <ChevronLeftIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    )}

                    {/* Navigation Links */}
                    <div className="p-3 flex-1 overflow-y-auto">
                        <ul className="space-y-2">
                            {navLinks.map(({ to, name, icon }) => {
                                const isActive = location.pathname === to;
                                return (
                                    <li key={to}>
                                        <Link
                                            to={to}
                                            className={`flex items-center p-2 rounded-lg transition-all ${isActive
                                                ? 'bg-white/20 font-medium'
                                                : 'hover:bg-white/10'
                                                }`}
                                            title={!isOpenForSideBar ? name : ''}
                                        >
                                            <span className={`${isOpenForSideBar ? 'mr-3' : 'mx-auto'}`}>
                                                {icon}
                                            </span>
                                            {isOpenForSideBar && (
                                                <span className="transition-opacity duration-200">
                                                    {name}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Admin Profile Section - Moved back to bottom */}
                    <div className="p-4 border-t border-indigo-400/30">
                        <div className={`flex ${isOpenForSideBar ? 'items-center gap-3' : 'flex-col items-center'}`}>
                            <img
                                src="https://avatar.iran.liara.run/public"
                                alt="Admin"
                                className="w-10 h-10 rounded-full border-2 border-white bg-white object-cover"
                            />
                            {isOpenForSideBar && (
                                <div className="overflow-hidden">
                                    <p className="font-semibold text-sm truncate">
                                        {adminData?.name}
                                    </p>
                                    <p className="text-xs text-indigo-100 truncate">
                                        {adminData?.email}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Logout button */}
                    <div className="p-3 border-t border-indigo-400/30">
                        <button
                            onClick={handleLogout}
                            className={`w-full flex items-center p-2 rounded-lg transition-colors hover:bg-red-500/30 text-white`}
                        >
                            <span className={`${isOpenForSideBar ? 'mr-3' : 'mx-auto'}`}>
                                <LogoutIcon />
                            </span>
                            {isOpenForSideBar && (
                                <span className="font-medium">Logout</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile when sidebar is open */}
            {isMobile && isOpenForSideBar && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsOpenForSideBar(false)}
                ></div>
            )}
        </>
    );
}

export default AdminSideBar;