import React, { useState, useEffect } from "react";
import useTheme, { ThemeProvider } from "../../context/NewContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Flip, toast, ToastContainer } from "react-toastify";

const AdmissionsRequest = () => {
  const [admissionRequest, setAdmissionRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpenForSideBar } = useTheme();
  const navigate = useNavigate();

  // Create an Axios instance with common configurations
  const axiosInstance = axios.create({
    baseURL: "http://localhost:9999/api/private/admin",
    withCredentials: true, // Ensures cookies and authentication headers are sent
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    fetchAdmissionRequest();
  }, []);

  const fetchAdmissionRequest = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        console.error("No token found. Redirecting to login...");
        navigate("/adminlogin");
        return;
      }

      console.log("Fetching admissions request...");
      const response = await axiosInstance.get("/getalladmissionsrequest");

      console.log("API Response:", response); // Debugging the response

      if (response.data.success) {
        setAdmissionRequest(response.data.data);
      } else {
        toast.error(response.data.message || "No data available", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching admission requests:", error);

      toast.error("Error fetching admission requests. Please try again later.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveAdmission = async (email) => {
    try {
      console.log(`Approving admission for email: ${email}`);

      const response = await axiosInstance.get(`/approve?email=${email}`);

      console.log("Approval API Response:", response);

      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          transition: Flip,
        });
        fetchAdmissionRequest(); // Refresh list after approval
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          transition: Flip,
        });
      }
    } catch (error) {
      console.error("Error approving admission request:", error);
      toast.error("Error approving admission request. Try again!", {
        position: "top-center",
        autoClose: 5000,
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
