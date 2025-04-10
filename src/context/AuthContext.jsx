import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { use } from 'react';

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
                        const response = await axios.get(`http://localhost:9999/api/private/profile/getstudent?enrollmentId=${enrollmentId}`, {
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
            console.log("[AUTH] Attempting student login for:", enrollmentId);
    
            // Send the data directly, not nested in a userData object
            const response = await axios.post('http://localhost:9999/api/public/auth/studentlogin', {
                enrollmentId,
                password
            });
            console.log("[AUTH] Student login response:", response);
    
            if (response.status === 200 && response.data.success) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                localStorage.setItem('role', 'student');
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('role', 'student');
                sessionStorage.setItem('enrollmentId', enrollmentId);
    
                // Get user profile - fix the API call
                console.log('token : ', token);
                try {
                    const studentResponse = await axios.get(`http://localhost:9999/api/private/student/getstudent?enrollmentId=${enrollmentId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        // Allow 302 status to be treated as success
                        validateStatus: function (status) {
                            return status === 200 || status === 302;
                        }
                    });
                    
                    // console.log("[AUTH] Student profile response:", studentResponse);
                    
                    if (studentResponse.data) {
                        setUser({
                            ...studentResponse.data,
                            role: 'student'
                        });
                        console.log("[AUTH] User state updated with profile data");
                    } else {
                        console.error("[AUTH] Student profile data is empty");
                        // Set minimal user data if profile fetch fails
                        setUser({
                            enrollmentId,
                            role: 'student'
                        });
                    }
                } catch (profileError) {
                    console.error("[AUTH] Error fetching student profile:", profileError);
                    // Set minimal user data if profile fetch fails
                    setUser({
                        enrollmentId,
                        role: 'student'
                    });
                }
                
                return { success: true, message: response.data.message };
            } else {
                return { success: false, message: response.data.message || "Login failed" };
            }
        } catch (err) {
            console.error("[AUTH] Login error:", err);
            setError(err.message);
            return { success: false, message: err.response?.data?.message || 'Login failed. Please try again.' };
        } finally {
            setLoading(false);
        }
    };

    // Login function for admins
    const adminLogin = async (email, password) => {
        try {
            setLoading(true);
            console.log("[AUTH] Attempting admin login for:", email);

            // Clear any existing tokens first
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            delete axios.defaults.headers.common['Authorization'];

            const response = await axios.post('http://localhost:9999/api/public/auth/adminlogin',
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log("[AUTH] Admin login response:", response);

            if (response.data && response.data.token) {
                const { token, role } = response.data;
                console.log("[AUTH] Admin login successful. Role:", role);

                // Store authentication data
                localStorage.setItem('token', token);
                localStorage.setItem('role', role || 'admin');

                // Set default authorization header for all future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                console.log("[AUTH] Set global auth header: Bearer " + token.substring(0, 15) + "...");

                // Update user context
                setUser({
                    email,
                    role: role || 'admin'
                });

                // Verify the token was stored correctly
                const storedToken = localStorage.getItem('token');
                console.log("[AUTH] Stored token verification:", storedToken ? "Token saved successfully" : "Failed to save token");

                return {
                    success: true,
                    message: 'Login successful'
                };
            }

            console.log("[AUTH] Admin login failed:", response.data);
            return {
                success: false,
                message: response.data.message || 'Login failed'
            };
        } catch (err) {
            console.error('[AUTH] Login error:', err);

            // Detailed error logging
            if (err.response) {
                console.error('[AUTH] Error status:', err.response.status);
                console.error('[AUTH] Error data:', err.response.data);
            }

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
            console.log("[AUTH] Logging out user");

            // Clear auth data first to ensure frontend logout succeeds even if API fails
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            localStorage.removeItem('role');
            sessionStorage.removeItem('role');

            // Reset axios default headers
            delete axios.defaults.headers.common['Authorization'];

            // Clear user state
            setUser(null);

            // Only try to call logout endpoint if we were previously logged in
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (token) {
                try {
                    await axios.post('http://localhost:9999/api/public/auth/logout', null, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        // Don't throw error on non-200 responses for logout
                        validateStatus: function (status) {
                            return status < 500; // Accept any status code less than 500
                        }
                    });
                    console.log("[AUTH] Server logout successful");
                } catch (logoutErr) {
                    // Just log the error but don't prevent logout on frontend
                    console.error('[AUTH] Error during server logout:', logoutErr);
                }
            }

            console.log("[AUTH] Logout completed successfully");
            return { success: true, message: 'Logged out successfully' };
        } catch (err) {
            console.error('[AUTH] Error during logout:', err);
            return { success: false, message: 'Error during logout' };
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:9999/api/public/auth/register', userData, {
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

    // Check if there's a login function for the admin
    // Add a function to check if the current user has admin role
    const checkAdminRole = () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return false;

            // Decode the token
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));

            // Check if the role is admin
            return payload && payload.role === 'admin';
        } catch (e) {
            console.error('Error checking admin role:', e);
            return false;
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
                register,
                checkAdminRole
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