import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/NewContext'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

// Configure axios globally
axios.defaults.withCredentials = true;
console.log('Axios configured with withCredentials: true');

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <React.StrictMode>
            <AuthProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </AuthProvider>
        </React.StrictMode>
    </BrowserRouter>
)
