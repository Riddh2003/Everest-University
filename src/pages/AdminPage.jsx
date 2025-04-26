import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import AdminSideBar from '../components/adminPage/AdminSideBar';
import menu from '../assets/images/menu.svg';

function AdminPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Close sidebar on mobile when route changes
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    return (
        <div className="flex w-screen h-screen overflow-x-hidden">
            {/* Sidebar for XL and larger screens (always visible) */}
            <div className="hidden xl:flex w-[300px] border-gray-300">
                <AdminSideBar />
            </div>

            {/* Sidebar for smaller screens */}
            <div
                className={`xl:hidden absolute w-[275px] bg-white border-r-2 h-full z-10 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <AdminSideBar setIsSidebarOpen={setIsSidebarOpen} />
            </div>

            {/* Menu Button for smaller screens */}
            <img
                src={menu}
                alt="menu"
                width={50}
                height={50}
                className="absolute bg-white rounded-lg cursor-pointer top-6 right-6 p-2 xl:hidden shadow-2xl shadow-black"
                onClick={toggleSidebar}
            />

            {/* Main Content Area */}
            <div className='items-center justify-center w-full col-span-5 p-4 overflow-y-scroll'>
                <Outlet />
            </div>
        </div>
    );
}

export default AdminPage;
