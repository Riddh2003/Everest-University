import React, { useState, useContext, useEffect } from "react";
import useTheme, { ThemeProvider } from "../../context/NewContext";
import StudentsForm from './StudentsForm'; // Import the popup form
import axios from "axios";

const Student = () => {
  // const [students, setStudents] = useState(demoDataArray); // State to hold demo data
  const [students, setStudents] = useState([]); // State to hold demo data
  const [openIndex, setOpenIndex] = useState(null); // Track which dropdown is open
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Track popup visibility
  const [currentStudent, setCurrentStudent] = useState(null); // Track current student data for editing
  const [loading, setLoading] = useState(true);

  const toggleDropdown = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close it if already open
    } else {
      setOpenIndex(index); // Open the selected dropdown
    }
  };

  const openPopup = (index) => {
    setCurrentStudent({ ...students[index], index }); // Include index in student data
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setCurrentStudent(null);
    setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStudents = [...students];
    updatedStudents[currentStudent.index] = { ...currentStudent };
    delete updatedStudents[currentStudent.index].index; // Remove index from student data
    setStudents(updatedStudents);
    closePopup();
  };

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      console.log("Token : ", token);

      if (!token) {
        console.error("No token found.");
        setLoading(false);
        return;
      }

      // Try using the proxy configured in vite.config.js
      const response = await axios.get(
        "http://localhost:9999/api/private/student/getallstudent",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      console.log(response.data.data);
      setStudents(response.data.data);
      setLoading(false);
    } catch (error) 
    {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  // fetch data when component mounts
  useEffect(() => {
    fetchStudentData();
  }, []);

  const { isOpenForSideBar } = useTheme();

  return (
    <ThemeProvider value={{ isOpenForSideBar }}>
      <div
        className={`flex-1 bg-gray-100 p-6 transition-all duration-300 ${isOpenForSideBar ? "ml-64" : "ml-20"
          }`}
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-500">Students</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white border-separate border border-gray-200 rounded-lg shadow-md">
            {/* Table Header */}
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Enrollment_ID</th>
                <th className="px-4 py-2 text-left">Surname</th>
                <th className="px-4 py-2 text-left">Firstname</th>
                <th className="px-4 py-2 text-left">Middlename</th>
                <th className="px-4 py-2 text-left">Mobile</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Gender</th>
                <th className="px-4 py-2 text-left">DOB</th>
                <th className="px-4 py-2 text-center">Program</th>
                <th className="px-4 py-2 text-center">Degree</th>
                <th className="px-4 py-2 text-center">Degree Name</th>
                <th className="px-4 py-2 text-center">Current Sem</th>
                <th className="px-4 py-2 text-center">Current Year</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {students && students.length > 0 ? (
                students.map((student, index) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200"
                  >
                    <td className="px-4 py-2 text-nowrap">{student.enrollmentId}</td>
                    <td className="px-4 py-2 text-nowrap">{student.surName}</td>
                    <td className="px-4 py-2 text-nowrap">{student.firstName}</td>
                    <td className="px-4 py-2 text-nowrap">{student.middleName}</td>
                    <td className="px-4 py-2 text-nowrap">{student.mobileNo}</td>
                    <td className="px-4 py-2 text-nowrap">{student.email}</td>
                    <td className="px-4 py-2 text-nowrap">{student.gender}</td>
                    <td className="px-4 py-2 text-nowrap">{student.dateOfBirth}</td>
                    <td className="px-4 py-2 text-nowrap">{student.program}</td>
                    <td className="px-4 py-2 text-nowrap">{student.degree}</td>
                    <td className="px-4 py-2 text-nowrap">{student.degreeName}</td>
                    <td className="px-4 py-2 text-nowrap">{student.currentSem}</td>
                    <td className="px-4 py-2 text-nowrap">{student.currentYear}</td>

                    {/* Action Button */}
                    <td className="px-4 py-2 text-center text-nowrap">
                      <button className="text-blue-500 hover:text-blue-700">View</button> | <button className="text-blue-500 hover:text-blue-700">Edit</button> | <button className="text-blue-500 hover:text-blue-700"> Delete</button>
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
        {isPopupOpen && (
          <StudentsForm
            studentData={currentStudent}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClose={closePopup}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Student;