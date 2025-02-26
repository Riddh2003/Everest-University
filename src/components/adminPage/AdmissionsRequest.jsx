import React, { useState, useEffect } from "react";
import useTheme, { ThemeProvider } from "../../context/NewContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Flip, toast, ToastContainer } from "react-toastify";

const AdmissionsRequest = () => {
  const [admissionRequest, setadmissionRequest] = useState([]); // State to hold demo data
  const [openIndex, setOpenIndex] = useState(null);
  const { isOpenForSideBar } = useTheme();
  const navigate = useNavigate();

  const toggleDropdown = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close it if already open
    } else {
      setOpenIndex(index); // Open the selected dropdown
    }
  };

  const fetchAdmissionRequest = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      console.log("Token : ", token);

      if (token == null) {
        navigate("/adminlogin");
      }

      const response = await axios.get(
        "http://localhost:9999/api/private/admin/getalladmissionsrequest",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      setadmissionRequest(response.data.data);
    } catch (error) {
      console.error("Error fetching admission requests :", error);
      alert("Error fetching admission requests.");
    }
  };

  const handleApproveAdmission = async (email) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      console.log("Token : ", token);

      if (token == null) {
        navigate("/adminlogin");
      }

      const response = await axios.get(
        `http://localhost:9999/api/private/admin/approve?email=${email}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        if (response.data.success === false) {
          toast.error(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });
        } else {
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });
        }
      }
    } catch (error) {
      console.error("Error approving admission request :", error);
      alert("Error approving admission request");
    }
  };

  // fetch data when component mounts
  useEffect(() => {
    fetchAdmissionRequest();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />

      <ThemeProvider value={{ isOpenForSideBar }}>
        <div
          className={`flex-1 bg-gray-100 p-6 transition-all duration-300 ${isOpenForSideBar ? "ml-64" : "ml-20"
            }`}
        >
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-500">
            Admission Requests
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white border-separate border border-gray-200 rounded-lg shadow-md">
              {/* Table Header */}
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Fullname</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Mobile</th>
                  <th className="px-4 py-2 text-left">Gender</th>
                  <th className="px-4 py-2 text-center">Degree</th>
                  <th className="px-4 py-2 text-center">Status</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {admissionRequest && admissionRequest.length > 0 ? (
                  admissionRequest.map((student, index) => (
                    <tr
                      key={index}
                      className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200"
                    >
                      <td className="px-4 py-2 text-nowrap">
                        {student.fullName}
                      </td>
                      <td className="px-4 py-2 text-nowrap">{student.email}</td>
                      <td className="px-4 py-2 text-nowrap">
                        {student.mobileNo}
                      </td>
                      <td className="px-4 py-2 text-nowrap">
                        {student.gender}
                      </td>
                      <td className="px-4 py-2 text-nowrap">
                        {student.degree}
                      </td>
                      <td className="px-4 py-2 text-nowrap">
                        {student.status}
                      </td>
                      {/* Action Button */}
                      <td className="px-4 py-2 text-center text-nowrap">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleApproveAdmission(student.email)}
                        >
                          Approve
                        </button>{" "}
                        |{" "}
                        <button className="text-blue-500 hover:text-blue-700">
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="13"
                      className="px-4 py-2 text-center text-gray-500"
                    >
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default AdmissionsRequest;