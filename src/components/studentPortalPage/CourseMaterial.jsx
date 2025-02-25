import React, { useState } from "react";

const CourseMaterial = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");

    // Sample course materials data
    const materials = [
        {
            id: 1,
            subject: "Mathematics",
            year: "1st Year",
            semester: "1st Sem",
            course: "B.Tech",
            image: "https://via.placeholder.com/150?text=Math+Book",
            fileUrl: "https://example.com/math.pdf"
        },
        {
            id: 2,
            subject: "Physics",
            year: "1st Year",
            semester: "2nd Sem",
            course: "B.Tech",
            image: "https://via.placeholder.com/150?text=Physics+Book",
            fileUrl: "https://example.com/physics.pdf"
        },
        {
            id: 3,
            subject: "Operating Systems",
            year: "2nd Year",
            semester: "3rd Sem",
            course: "B.Sc",
            image: "https://via.placeholder.com/150?text=OS+Book",
            fileUrl: "https://example.com/os.pdf"
        },
        {
            id: 4,
            subject: "Machine Learning",
            year: "3rd Year",
            semester: "5th Sem",
            course: "B.Tech",
            image: "https://via.placeholder.com/150?text=ML+Book",
            fileUrl: "https://example.com/ml.pdf"
        },
    ];

    // Filtered materials based on search and dropdown selections
    const filteredMaterials = materials.filter((material) => {
        return (
            (searchTerm === "" || material.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedYear === "" || material.year === selectedYear) &&
            (selectedSemester === "" || material.semester === selectedSemester) &&
            (selectedCourse === "" || material.course === selectedCourse)
        );
    });

    return (
        <div className="w-full p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center">Course Materials</h2>

            {/* Search and Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by Subject Name..."
                    className="border p-3 rounded-md w-full sm:w-1/4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Year Dropdown */}
                <select
                    className="border p-3 rounded-md w-full sm:w-1/5"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                </select>

                {/* Semester Dropdown */}
                <select
                    className="border p-3 rounded-md w-full sm:w-1/5"
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                >
                    <option value="">Select Semester</option>
                    <option value="1st Sem">1st Sem</option>
                    <option value="2nd Sem">2nd Sem</option>
                    <option value="3rd Sem">3rd Sem</option>
                    <option value="4th Sem">4th Sem</option>
                    <option value="5th Sem">5th Sem</option>
                    <option value="6th Sem">6th Sem</option>
                    <option value="7th Sem">7th Sem</option>
                    <option value="8th Sem">8th Sem</option>
                </select>

                {/* Course Dropdown */}
                <select
                    className="border p-3 rounded-md w-full sm:w-1/5"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                >
                    <option value="">Select Course</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="MBA">MBA</option>
                </select>
            </div>

            {/* Display Materials in Cards with Images, View & Download Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {filteredMaterials.length > 0 ? (
                    filteredMaterials.map((material) => (
                        <div key={material.id} className="border p-4 rounded-lg shadow-lg bg-white flex flex-col items-center">
                            <img src={material.image} alt={material.subject} className="w-full h-40 object-cover rounded-md mb-4" />
                            <h3 className="text-lg font-semibold">{material.subject}</h3>
                            <p className="text-gray-600">{material.year}</p>
                            <p className="text-gray-600">{material.semester}</p>
                            <p className="text-gray-600">{material.course}</p>

                            {/* Buttons */}
                            <div className="mt-4 flex gap-3">
                                <a
                                    href={material.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-[#345D7C] text-white rounded-md hover:bg-blue-600 transition"
                                >
                                    View Material
                                </a>
                                <a
                                    href={material.fileUrl}
                                    download
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full">No materials found.</p>
                )}
            </div>
        </div>
    );
};

export default CourseMaterial;
