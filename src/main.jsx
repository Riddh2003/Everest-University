import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/NewContext'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'

// Configure axios globally
axios.defaults.withCredentials = true;
console.log('Axios configured with withCredentials: true');

// Configure axios interceptors
axios.interceptors.response.use(
    response => response,
    error => {
        // Handle 401 authentication errors
        if (error.response && error.response.status === 401) {
            console.error('Authentication error detected:', error.response.data);

            // Check if we should redirect to login
            const currentPath = window.location.pathname;
            if (!currentPath.includes('/login')) {
                // Clear auth data
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                localStorage.removeItem('role');
                sessionStorage.removeItem('role');
                localStorage.removeItem('email');
                sessionStorage.removeItem('email');
                localStorage.removeItem('enrollmentId');
                sessionStorage.removeItem('enrollmentId');
                localStorage.removeItem('tokenExpiry');
                sessionStorage.removeItem('tokenExpiry');

                // Determine redirect based on path
                if (currentPath.includes('/adminportal')) {
                    window.location.href = '/adminlogin';
                } else if (currentPath.includes('/studentportal')) {
                    window.location.href = '/studentlogin';
                }
            }
        }
        return Promise.reject(error);
    }
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider>
                    <ToastContainer />
                    <App />
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)
