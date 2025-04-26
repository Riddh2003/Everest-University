import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../../context/NewContext';
import AdminSideBar from './AdminSideBar';
import useTheme from '../../context/NewContext';

function ForOutlet() {
  const { isOpenForSideBar } = useTheme();

  return (
    <ThemeProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <AdminSideBar />

        {/* Main content */}
        <main
          className={`flex-1 transition-all duration-300 ${isOpenForSideBar ? 'lg:ml-60' : 'lg:ml-16'
            } ml-0 w-full`}
        >
          <div className="p-4 sm:p-6 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default ForOutlet;
