import React, { useState, useEffect } from "react";
import useTheme from "../../context/NewContext";
import { useNavigate } from "react-router-dom";
import { Flip, toast, ToastContainer } from "react-toastify";
import axios from "axios";

const API_URL = "http://localhost:9999/api/private/admin";

const AdmissionsRequest = () => {
  const [admissionRequests, setAdmissionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { isOpenForSideBar } = useTheme();
  const navigate = useNavigate();

  // Fetch admission requests from backend
  const fetchAdmissionRequests = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/adminlogin");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/getalladmissionsrequest`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.data);
      if (response.data.success) {
        setAdmissionRequests(response.data.data); // Store fetched data
      } else {
        toast.error(response.data.message || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching admissions:", error);
      toast.error("Error fetching admissions");
    } finally {
      setLoading(false);
    }
  };

  // Approve or Reject Admission with full data
  const handleAdmissionAction = async (request, action) => {
    if (!request) {
      toast.error("Invalid admission data");
      return;
    }

    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/${action}`,
        request, // Send full request data
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(`${action} Response:`, response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        fetchAdmissionRequests(); // Refresh data after action
      } else {
        throw new Error(response.data.message || `Failed to ${action} admission`);
      }
    } catch (error) {
      console.error(`${action} Error:`, error);
      toast.error(error.response?.data?.message || `Failed to ${action} admission`);
    } finally {
      setActionLoading(false);
    }
  };

  // Fetch data when component loads
  useEffect(() => {
    fetchAdmissionRequests();
  }, []);

  return (
    <div className="w-full">
      <ToastContainer position="top-center" autoClose={3000} transition={Flip} />

      <div className="min-h-screen px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 text-center mb-8">
            Admission Requests
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Full Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Mobile</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Program</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">State</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {admissionRequests.length > 0 ? (
                      admissionRequests.map((request) => (
                        <tr
                          key={request.registrationId}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                            {`${request.firstName} ${request.middleName} ${request.surName}`}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                            {request.email}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                            {request.mobileNo}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                            <span className="px-2 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full">
                              {request.program}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${request.state === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                              }`}>
                              {request.state}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                            <div className="flex justify-center space-x-2">
                              <button
                                className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                                onClick={() => handleAdmissionAction(request, "approve")}
                                disabled={actionLoading}
                              >
                                {actionLoading ? "Processing..." : "Approve"}
                              </button>
                              <button
                                className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                                onClick={() => handleAdmissionAction(request, "reject")}
                                disabled={actionLoading}
                              >
                                {actionLoading ? "Processing..." : "Reject"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-6 text-sm text-center text-gray-500">
                          No admission requests found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionsRequest;
