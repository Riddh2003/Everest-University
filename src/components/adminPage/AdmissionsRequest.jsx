import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flip, toast, ToastContainer } from "react-toastify";
import axios from "axios";

const API_URL = "http://localhost:9999/api/private/admin";

const AdmissionsRequest = () => {
  const [admissionRequests, setAdmissionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
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

      // Format the request payload based on the action
      let payload;
      let endpoint;

      if (action === "approve") {
        // For approve endpoint, we send the StudentDto structure
        endpoint = `${API_URL}/approve`;
        payload = {
          registrationId: request.registrationId,
          firstName: request.firstName,
          middleName: request.middleName,
          surName: request.surName,
          email: request.email,
          mobileNo: request.mobileNo,
          gender: request.gender,
          dateOfBirth: request.dateOfBirth,
          city: request.city,
          state: request.state,
          program: request.program,
          degree: request.degree,
          degreeName: request.degreeName
        };
      } else {
        // For reject endpoint, we only need registrationId
        endpoint = `${API_URL}/reject`;
        payload = {
          registrationId: request.registrationId
        };
      }

      // Log the payload for debugging
      console.log(`Sending ${action} request with payload:`, payload);

      const response = await axios.post(
        endpoint,
        payload,
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

      // Provide detailed error information in console
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }

      // User-friendly error message
      const errorMessage = error.response?.data?.message ||
        (error.response?.status === 500 ?
          "Server error. Please check server logs for details." :
          `Failed to ${action} admission`);
      toast.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle view student details
  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowPopup(true);
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedStudent(null);
  };

  // Fetch data when component loads
  useEffect(() => {
    fetchAdmissionRequests();
  }, []);

  return (
    <div className="w-full">
      <ToastContainer position="top-center" autoClose={3000} transition={Flip} />

      {(loading || actionLoading) && (
        <div className="fixed inset-0 flex justify-center items-center bg-white/80 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {/* Student Details Popup */}
      {showPopup && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-indigo-700">Student Details</h2>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-500">Registration ID</p>
                <p className="text-base font-semibold">{selectedStudent.registrationId}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="text-base font-semibold">{`${selectedStudent.firstName} ${selectedStudent.middleName} ${selectedStudent.surName}`}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-base font-semibold">{selectedStudent.email}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-500">Mobile</p>
                <p className="text-base font-semibold">{selectedStudent.mobileNo}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-500">Gender</p>
                <p className="text-base font-semibold">{selectedStudent.gender}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                <p className="text-base font-semibold">{new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-500">City</p>
                <p className="text-base font-semibold">{selectedStudent.city}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-500">State</p>
                <p className="text-base font-semibold">{selectedStudent.state}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-500">Program</p>
                <p className="text-base font-semibold">{selectedStudent.program}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-500">Degree</p>
                <p className="text-base font-semibold">{selectedStudent.degree}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded col-span-1 md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Degree Name</p>
                <p className="text-base font-semibold">{selectedStudent.degreeName}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded col-span-1 md:col-span-2">
                <p className="text-sm font-medium text-gray-500">10th Certificate</p>
                {selectedStudent.tenthFilePath ? (
                  <a
                    href={selectedStudent.tenthFilePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    View 10th Certificate
                  </a>
                ) : (
                  <p className="text-gray-500 italic">Not available</p>
                )}
              </div>
              <div className="bg-gray-50 p-3 rounded col-span-1 md:col-span-2">
                <p className="text-sm font-medium text-gray-500">12th Certificate</p>
                {selectedStudent.twelthPath ? (
                  <a
                    href={selectedStudent.twelthPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    View 12th Certificate
                  </a>
                ) : (
                  <p className="text-gray-500 italic">Not available</p>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  closePopup();
                  handleAdmissionAction(selectedStudent, "approve");
                }}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  closePopup();
                  handleAdmissionAction(selectedStudent, "reject");
                }}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen px-4 py-6">
        <div className="">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 text-center mb-8">
            Admission Requests
          </h1>

          {loading ? (
            <div className="h-64"></div>
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
                                className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                onClick={() => handleViewDetails(request)}
                              >
                                View
                              </button>
                              <button
                                className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                                onClick={() => handleAdmissionAction(request, "approve")}
                                disabled={actionLoading}
                              >
                                Approve
                              </button>
                              <button
                                className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                                onClick={() => handleAdmissionAction(request, "reject")}
                                disabled={actionLoading}
                              >
                                Reject
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
