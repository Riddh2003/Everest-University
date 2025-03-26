import React, { useState, useEffect } from "react";
import useTheme, { ThemeProvider } from "../../context/NewContext";
import { useNavigate } from "react-router-dom";
import { Flip, toast, ToastContainer } from "react-toastify";
import axiosInstance from '../../utils/axiosConfig';

const AdmissionsRequest = () => {
  const [admissionRequest, setAdmissionRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpenForSideBar } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmissionRequest();
  }, []);

  const fetchAdmissionRequest = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No authentication token found", {
          position: "top-center",
          autoClose: 3000
        });
        navigate("/adminlogin");
        return;
      }

      const response = await axiosInstance.get('/api/private/admin/getalladmissionsrequest');

      if (response.data.success) {
        setAdmissionRequest(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch admission requests", {
          position: "top-center",
          autoClose: 3000
        });
      }
    } catch (error) {
      console.error("Error fetching admission requests:", error);
      toast.error(error.response?.data?.message || "Error fetching admission requests", {
        position: "top-center",
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveAdmission = async (email) => {
    try {
      const response = await axiosInstance.post('/api/private/admin/approve', { email });

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000
        });
        fetchAdmissionRequest();
      }
    } catch (error) {
      console.error("Error approving admission:", error);
      toast.error(error.response?.data?.message || "Failed to approve admission", {
        position: "top-center",
        autoClose: 3000
      });
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} transition={Flip} />

      <ThemeProvider value={{ isOpenForSideBar }}>
        <div
          className={`flex-1 bg-gray-100 p-6 transition-all duration-300 ${isOpenForSideBar ? "ml-64" : "ml-20"
            }`}
        >
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-500">
            Admission Requests
          </h1>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
                {/* Table Header */}
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

                {/* Table Body */}
                <tbody>
                  {admissionRequest.length > 0 ? (
                    admissionRequest.map((student, index) => (
                      <tr
                        key={index}
                        className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200"
                      >
                        <td className="px-4 py-2">{`${student.first_name} ${student.middle_name} ${student.sur_name}`}</td>
                        <td className="px-4 py-2">{student.email}</td>
                        <td className="px-4 py-2">{student.mobile_no}</td>
                        <td className="px-4 py-2">{student.program}</td>
                        <td className="px-4 py-2">{student.state}</td>
                        {/* Action Buttons */}
                        <td className="px-4 py-2 text-center">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleApproveAdmission(student.email)}
                          >
                            Approve
                          </button>{" "}
                          |{" "}
                          <button className="text-red-500 hover:text-red-700">
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                        No admission requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </ThemeProvider>
    </>
  );
};

export default AdmissionsRequest;
