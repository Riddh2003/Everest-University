import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is authenticated on initial load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const role = localStorage.getItem('role') || sessionStorage.getItem('role');

                if (token) {
                    try {
                        // Verify token by getting user profile
                        const response = await axios.get('/api/private/profile/getuser', {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        if (response.status === 200) {
                            setUser({
                                ...response.data,
                                role
                            });
                        } else {
                            // Token is invalid, clear it
                            localStorage.removeItem('token');
                            sessionStorage.removeItem('token');
                            localStorage.removeItem('role');
                            sessionStorage.removeItem('role');
                        }
                    } catch (err) {
                        console.error('Error verifying token:', err);
                        // In case of error, clear the token
                        localStorage.removeItem('token');
                        sessionStorage.removeItem('token');
                        localStorage.removeItem('role');
                        sessionStorage.removeItem('role');
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Login function for students
    const studentLogin = async (enrollmentId, password) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/public/auth/studentlogin',
                { enrollmentId, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200 && response.data.success) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('role', 'student');
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('role', 'student');

                // Get user profile
                const profileResponse = await axios.get('/api/private/profile/getuser', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                setUser({
                    ...profileResponse.data,
                    role: 'student'
                });

                return { success: true, message: response.data.message };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (err) {
            setError(err.message);
            return { success: false, message: 'Login failed. Please try again.' };
        } finally {
            setLoading(false);
        }
    };

    // Login function for admins
    const adminLogin = async (email, password) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:9999/api/public/auth/adminlogin',
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            if (response.data && response.data.token) {
                const { token, role } = response.data;

                // Store authentication data
                localStorage.setItem('token', token);
                localStorage.setItem('role', role || 'admin');

                // Set default authorization header for future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Update user context
                setUser({
                    email,
                    role: role || 'admin'
                });

                return {
                    success: true,
                    message: 'Login successful'
                };
            }

            return {
                success: false,
                message: response.data.message || 'Login failed'
            };
        } catch (err) {
            console.error('Login error:', err);
            const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
            setError(errorMessage);
            return {
                success: false,
                message: errorMessage
            };
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            await axios.post('/api/public/auth/logout', null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (err) {
            console.error('Error during logout:', err);
        } finally {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            localStorage.removeItem('role');
            sessionStorage.removeItem('role');
            setUser(null);
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/public/auth/register', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 && response.data.success) {
                return { success: true, message: response.data.message };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (err) {
            setError(err.message);
            return { success: false, message: 'Registration failed. Please try again.' };
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                isAuthenticated: !!user,
                studentLogin,
                adminLogin,
                logout,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;