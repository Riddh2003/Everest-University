import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

// Simple icon components
const PersonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const PeopleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const WorkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const SchoolIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

function AdminSideBar({ setIsSidebarOpen }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(location.pathname);
    const [adminData, setAdminData] = useState({});

    useEffect(() => {
        // Fetch admin profile data
        fetchAdminProfile();
    }, []);

    const fetchAdminProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            if (!token || !email) return;

            const response = await axios.get(`/api/private/admin/getadminbyemail?email=${email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

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
            to: '/adminportal/coursesmaterial',
            name: 'Courses Material',
            icon: <BookIcon />,
        },
        {
            to: '/adminportal/circulation',
            name: 'Circulation',
            icon: <WorkIcon />,
        },
        {
            to: '/adminlogin',
            name: 'Logout',
            icon: <LogoutIcon />,
            onClick: handleLogout,
        },
    ];

    return (
        <div className="flex flex-col bg-[#4500e2] text-white h-full w-full">
            {/* Logo/Title */}
            <div className="pt-2 text-center">
                <div className="flex justify-center mb-3">
                    <img
                        src="/university-logo.png"
                        alt="Everest University Logo"
                        className="h-16 rounded bg-white p-1 shadow-md"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnk_mHU60ab1ecR7UEdEBTMOebiqbSDtXJtQ&s";
                        }}
                    />
                </div>
                <div className='border-b border-indigo-300 mt-3 pt-2 pb-3'>
                    <Link to='/adminportal' className="text-2xl font-bold tracking-wide hover:text-gray-200 transition-colors">
                        Admin Portal
                    </Link>
                </div>

            </div>

            {/* Navigation Links */}
            <div className="space-y-2 mt-4">
                {navLinks.map(({ to, name, icon, onClick }) => (
                    <div key={to} className="flex items-center">
                        <Link
                            to={to}
                            onClick={(e) => {
                                setActiveItem(to);
                                if (onClick) {
                                    e.preventDefault();
                                    onClick();
                                }
                                if (setIsSidebarOpen) {
                                    setIsSidebarOpen(false);
                                }
                            }}
                            className={`flex items-center w-full px-6 py-2 hover:bg-[#6e29ff] cursor-pointer ${activeItem === to ? 'bg-[#6e29ff]' : ''
                                }`}
                        >
                            <span className="mr-4">{icon}</span>
                            <span className={`${name === 'Logout' ? 'text-red-500' : 'text-white'} font-semibold text-md`}>
                                {name}
                            </span>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Admin Profile Section */}
            <div className="p-4 border-t border-gray-200 mt-auto">
                <Link to='/adminportal/adminprofile' className="flex items-center">
                    <img
                        src="https://avatar.iran.liara.run/public"
                        alt="Admin"
                        className="w-10 h-10 transition-opacity duration-300 rounded-full opacity-100 border-2 border-white"
                        loading="lazy"
                    />
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white">{adminData?.name || 'Admin'}</p>
                        <p className="text-xs text-white">{adminData?.email || 'admin@everest.edu'}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default AdminSideBar;