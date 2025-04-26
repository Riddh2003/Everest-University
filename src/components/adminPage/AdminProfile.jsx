import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProfile = () => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                // Get admin email from localStorage or sessionStorage
                const email = localStorage.getItem('email') || sessionStorage.getItem('email');

                // Try to get token from both localStorage and sessionStorage
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');

                console.log("Auth data:", {
                    email,
                    tokenExists: !!token,
                    tokenSource: localStorage.getItem('token') ? 'localStorage' : sessionStorage.getItem('token') ? 'sessionStorage' : 'none'
                });

                if (!email) {
                    throw new Error('Admin email not found. Please login again.');
                }

                if (!token) {
                    throw new Error('Authentication token not found. Please login again.');
                }

                // Explicitly include the token in the request headers and set withCredentials to true
                console.log("Making API request with token:", token.substring(0, 15) + "...");

                const response = await axios.get(`http://localhost:9999/api/private/admin/getadminbyemail?email=${email}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // This is important for CORS with credentials
                });

                console.log("API Response:", response.status, response.data);

                // Check the structure of the response data
                if (response.data) {
                    // If response.data.data exists and contains the admin info
                    if (response.data.data) {
                        setAdmin(response.data.data);
                    }
                    // If response.data itself is the admin object
                    else if (response.data.adminId) {
                        setAdmin(response.data);
                    }
                    // If response.data.success exists and contains the admin info
                    else if (response.data.success && typeof response.data.success === 'object') {
                        setAdmin(response.data.success);
                    }
                    // Fallback - show the entire response data structure for debugging
                    else {
                        console.log("Response structure:", JSON.stringify(response.data, null, 2));
                        setAdmin(response.data);
                    }
                } else {
                    throw new Error('Failed to fetch admin data');
                }
            } catch (err) {
                console.error('Detailed error:', err);
                if (err.response) {
                    console.error('Error status:', err.response.status);
                    console.error('Error data:', err.response.data);

                    if (err.response.status === 403) {
                        setError('Authentication failed. Please login again.');
                        // Store current URL to redirect back after login
                        sessionStorage.setItem('redirectUrl', window.location.pathname);
                    } else {
                        setError(err.response.data?.message || 'An error occurred while fetching admin data');
                    }
                } else {
                    setError(err.message || 'An error occurred while fetching admin data');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    // For debugging - log what we actually have
    useEffect(() => {
        if (admin) {
            console.log("Admin data in state:", admin);
        }
    }, [admin]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5e19f3]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    // If no admin data is available even though loading is complete
    if (!admin) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Warning! </strong>
                    <span className="block sm:inline">No admin data available. Please try logging in again.</span>
                </div>
            </div>
        );
    }

    // For emoji profile picture when no actual picture is available
    const getInitialEmoji = (name) => {
        const emojis = ['👨‍🏫', '👩‍🏫', '👨‍🎓', '👩‍🎓', '👨‍💼', '👩‍💼', '🧑‍🏫', '🧑‍🎓'];
        // Use the name to deterministically select an emoji
        const nameSum = name?.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) || 0;
        return emojis[nameSum % emojis.length];
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = () => {
        // Would implement the save functionality here
        setIsEditing(false);
        // Show a success message
        alert("Profile updated successfully!");
    };

    return (
        <div className="w-full h-screen bg-white p-4 md:p-6 overflow-auto">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
                <div className="bg-[#5e19f3] p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="mb-4 md:mb-0 md:mr-6">
                                {admin?.profilePicture ? (
                                    <img
                                        src={admin.profilePicture}
                                        alt={admin.name || "Admin"}
                                        className="w-24 h-24 rounded-full border-4 border-white object-cover"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full border-4 border-white bg-purple-100 flex items-center justify-center text-4xl">
                                        {getInitialEmoji(admin?.name || "Admin")}
                                    </div>
                                )}
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="text-2xl font-bold text-white">{admin?.name || "Admin"}</h1>
                                <p className="text-purple-100 capitalize">{admin?.role || "Administrator"}</p>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <button
                                onClick={handleEdit}
                                className="bg-white text-[#5e19f3] hover:bg-purple-50 font-semibold py-2 px-4 rounded-lg shadow-sm transition-all duration-200 ease-in-out"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-[#5e19f3]">Personal Information</h2>
                        {isEditing && (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="bg-[#5e19f3] text-white hover:bg-[#4e16c7] font-medium py-1.5 px-3 rounded-lg shadow-sm transition-all duration-200"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium py-1.5 px-3 rounded-lg shadow-sm transition-all duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Admin ID</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    readOnly
                                    value={admin?.adminId || ""}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                                />
                            ) : (
                                <p className="text-gray-800 font-medium">{admin?.adminId || "N/A"}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    defaultValue={admin?.name || ""}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e19f3] focus:border-transparent"
                                />
                            ) : (
                                <p className="text-gray-800 font-medium">{admin?.name || "N/A"}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Email Address</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    defaultValue={admin?.email || ""}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e19f3] focus:border-transparent"
                                />
                            ) : (
                                <p className="text-gray-800 font-medium">{admin?.email || "N/A"}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Role</label>
                            {isEditing ? (
                                <select
                                    defaultValue={admin?.role || ""}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e19f3] focus:border-transparent"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="staff">Staff</option>
                                </select>
                            ) : (
                                <p className="text-gray-800 font-medium capitalize">{admin?.role || "N/A"}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Phone Number</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    defaultValue={admin?.phoneNumber || ""}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e19f3] focus:border-transparent"
                                />
                            ) : (
                                <p className="text-gray-800 font-medium">{admin?.phoneNumber || "N/A"}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Status</label>
                            {isEditing ? (
                                <select
                                    defaultValue={admin?.status || ""}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e19f3] focus:border-transparent"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            ) : (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${admin?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {admin?.status || "N/A"}
                                </span>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Qualification</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    defaultValue={admin?.qualification || ""}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e19f3] focus:border-transparent"
                                />
                            ) : (
                                <p className="text-gray-800 font-medium">{admin?.qualification || "N/A"}</p>
                            )}
                        </div>

                        {isEditing && (
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm font-medium mb-1">Profile Picture URL</label>
                                <input
                                    type="text"
                                    defaultValue={admin?.profilePicture || ""}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e19f3] focus:border-transparent"
                                />
                            </div>
                        )}
                    </div>

                    {admin?.notifications && admin.notifications.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-[#5e19f3] mb-4">Notifications</h2>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                {admin.notifications.map((notification, index) => (
                                    <div key={index} className="border-b border-gray-200 py-2 last:border-b-0">
                                        {notification}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
