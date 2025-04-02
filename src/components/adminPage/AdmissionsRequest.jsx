import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flip, toast, ToastContainer } from "react-toastify";
import axios from "axios";

const API_URL = "http://localhost:9999/api/private/admin";

const AdmissionsRequest = () => {
  const [admissionRequests, setAdmissionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
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
    <>
      <ToastContainer position="top-center" autoClose={3000} transition={Flip} />
      <div className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-500">
          Admission Requests
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Full Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Mobile</th>
                  <th className="px-4 py-2 text-center">Program</th>
                  <th className="px-4 py-2 text-center">State</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admissionRequests.length > 0 ? (
                  admissionRequests.map((request) => (
                    <tr key={request.registrationId} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{`${request.firstName} ${request.middleName} ${request.surName}`}</td>
                      <td className="px-4 py-2">{request.email}</td>
                      <td className="px-4 py-2">{request.mobileNo}</td>
                      <td className="px-4 py-2 text-center">{request.program}</td>
                      <td className="px-4 py-2 text-center">{request.state}</td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleAdmissionAction(request, "approve")}
                            className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                            disabled={actionLoading}
                          >
                            {actionLoading ? "Processing..." : "Approve"}
                          </button>
                          <button
                            onClick={() => handleAdmissionAction(request, "reject")}
                            className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
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
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No admission requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdmissionsRequest;
