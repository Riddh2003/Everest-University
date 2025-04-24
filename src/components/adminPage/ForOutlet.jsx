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
      <Box sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f0eeff', // Light blue-purple background
        position: 'relative'
      }}>
        {/* Sidebar */}
        <AdminSideBar />

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 2.5, md: 3 },
            width: {
              xs: '100%',
              md: `calc(100% - ${isOpenForSideBar ? '240px' : '70px'})`
            },
            ml: {
              xs: 0,
              md: isOpenForSideBar ? '240px' : '70px'
            },
            transition: 'all 0.3s ease',
            height: '100%',
            overflow: 'auto'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ForOutlet;
