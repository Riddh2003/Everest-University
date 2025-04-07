import React, { useState, useEffect } from "react";
import useTheme, { ThemeProvider } from "../../context/NewContext";
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
    <ThemeProvider>
      <div className={`flex-1 transition-all duration-300 ${isOpenForSideBar ? 'ml-64' : 'ml-20'}`}>
        <ToastContainer position="top-center" autoClose={3000} transition={Flip} />
        <div className="bg-gray-100 p-4 md:p-6 min-h-screen">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-blue-500">
            Admission Requests
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="max-w-[90%] mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-blue-500">
                    <tr>
                      <th scope="col" className="sticky top-0 z-10 px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
                        Full Name
                      </th>
                      <th scope="col" className="sticky top-0 z-10 px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="sticky top-0 z-10 px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
                        Mobile
                      </th>
                      <th scope="col" className="sticky top-0 z-10 px-6 py-4 text-center text-sm font-semibold text-white tracking-wider">
                        Program
                      </th>
                      <th scope="col" className="sticky top-0 z-10 px-6 py-4 text-center text-sm font-semibold text-white tracking-wider">
                        State
                      </th>
                      <th scope="col" className="sticky top-0 z-10 px-6 py-4 text-center text-sm font-semibold text-white tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {admissionRequests.length > 0 ? (
                      admissionRequests.map((request) => (
                        <tr key={request.registrationId} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {`${request.firstName} ${request.middleName} ${request.surName}`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {request.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {request.mobileNo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                            {request.program}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                            {request.state}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                            <div className="flex justify-center gap-3">
                              <button
                                onClick={() => handleAdmissionAction(request, "approve")}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                                disabled={actionLoading}
                              >
                                {actionLoading ? "Processing..." : "Approve"}
                              </button>
                              <button
                                onClick={() => handleAdmissionAction(request, "reject")}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
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
                        <td colSpan="6" className="px-6 py-10 text-sm text-gray-500 text-center bg-gray-50">
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
    </ThemeProvider>
  );
};

export default AdmissionsRequest;
