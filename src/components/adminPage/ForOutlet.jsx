import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../../context/NewContext';
import AdminSideBar from './AdminSideBar';
import { Box } from '@mui/material';
import useTheme from '../../context/NewContext';

function ForOutlet() {
  const { isOpenForSideBar } = useTheme();

  return (
    <ThemeProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AdminSideBar />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default ForOutlet;
