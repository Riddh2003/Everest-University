import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useTheme from '../../context/NewContext';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Tooltip,
    useMediaQuery,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';

// Define blue-purple theme colors
const bluePurple = {
    main: '#6a5acd', // SlateBlue (blue-purple)
    dark: '#483d8b', // DarkSlateBlue (darker blue-purple)
    light: '#8a7cdf', // Lighter blue-purple
    lighter: '#e8e6ff', // Very light blue-purple
    gradient: 'linear-gradient(135deg, #5e60ce 0%, #7b68ee 100%)', // Gradient from blue to purple
};

// Custom styled component for the drawer
const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
    width: open ? 240 : 70,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    height: '100%',
    '& .MuiDrawer-paper': {
        width: open ? 240 : 70,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        marginTop: 0,
        height: '100vh',
        background: bluePurple.gradient,
        color: '#fff',
        overflowX: 'hidden',
        borderRight: 'none',
        boxShadow: '0 0 20px rgba(0,0,0,0.15)',
        zIndex: 1200,
        position: 'fixed',
        left: 0,
        top: 0,
    },
}));

// Styled app logo/name component
const AppTitle = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    borderBottom: '1px solid rgba(255,255,255,0.15)',
}));

const NavItem = styled(ListItem)(({ theme, active }) => ({
    minHeight: 48,
    padding: theme.spacing(0, 2.5),
    borderRadius: '12px',
    marginBottom: theme.spacing(0.7),
    backgroundColor: active ? 'rgba(255,255,255,0.2)' : 'transparent',
    '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    transition: 'all 0.2s ease',
}));

function AdminSideBar() {
    const { isOpenForSideBar, setIsOpenForSideBar } = useTheme();
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width:900px)');

    useEffect(() => {
        if (isMobile) {
            setIsOpenForSideBar(false);
        } else {
            setIsOpenForSideBar(true);
        }
    }, [isMobile, location.pathname, setIsOpenForSideBar]);

    // Array of navigation links with Material UI icons
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
        <StyledDrawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isOpenForSideBar}
            onClose={() => setIsOpenForSideBar(false)}
        >
            <AppTitle>
                {isOpenForSideBar ? (
                    <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: '0.5px' }}>
                        Smart Campus
                    </Typography>
                ) : (
                    <SchoolIcon sx={{ fontSize: 30 }} />
                )}
            </AppTitle>

            <List sx={{ p: 1.5 }}>
                {navLinks.map(({ to, name, icon }) => (
                    <NavItem
                        button
                        key={to}
                        component={Link}
                        to={to}
                        active={location.pathname === to ? 1 : 0}
                    >
                        <Tooltip title={isOpenForSideBar ? "" : name} placement="right">
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: isOpenForSideBar ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'inherit'
                                }}
                            >
                                {icon}
                            </ListItemIcon>
                        </Tooltip>
                        {isOpenForSideBar && (
                            <ListItemText
                                primary={name}
                                primaryTypographyProps={{
                                    fontWeight: location.pathname === to ? 'bold' : 'normal',
                                }}
                                sx={{
                                    opacity: isOpenForSideBar ? 1 : 0,
                                    transition: 'opacity 0.3s'
                                }}
                            />
                        )}
                    </NavItem>
                ))}
            </List>
        </StyledDrawer>
    );
}

export default AdminSideBar;