import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseMaterial = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMaterials = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost:9999/api/private/material/listMaterials');
                if (response.data.success) {
                    setMaterials(response.data.data || []);
                } else {
                    setError(response.data.message || 'Failed to fetch materials');
                }
            } catch (err) {
                setError(err.message || 'An error occurred while fetching materials');
                console.error('Error fetching materials:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterials();
    }, []);

    // Filtered materials based on search
    const filteredMaterials = materials.filter((material) => {
        return (searchTerm === "" ||
            (material.title || '').toLowerCase().includes(searchTerm.toLowerCase()));
    });

    return (
        <div className="w-full p-6">
            <h2 className="text-3xl font-semibold mb-8 text-center text-[#4500e2]">Course Materials</h2>

            {/* Search Bar */}
            <div className="flex justify-center mb-10">
                <div className="relative w-full max-w-xl">
                    <input
                        type="text"
                        placeholder="Search by material name..."
                        className="w-full px-5 py-3 rounded-full border-2 border-[#4500e2]/20 focus:border-[#4500e2] focus:outline-none focus:ring-2 focus:ring-[#4500e2]/50 shadow-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute right-4 top-3.5 text-[#4500e2]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Loading and Error States */}
            {loading && (
                <div className="flex justify-center my-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4500e2]"></div>
                </div>
            )}
            {error && <p className="text-center text-red-500 my-6 font-medium">{error}</p>}

            {/* Display Materials in Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
                {!loading && filteredMaterials.length > 0 ? (
                    filteredMaterials.map((material) => (
                        <div key={material.id || material.materialId}
                            className="relative bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
                            <div className="relative h-48 bg-gradient-to-tr from-[#4500e2] to-purple-500">
                                <img
                                    src={material.image || 'https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY='}
                                    alt={material.title || material.subject}
                                    className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                                <div className="absolute bottom-3 left-4 right-4">
                                    <h3 className="text-xl font-bold text-white truncate">{material.title || 'Untitled Material'}</h3>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500 mb-1">
                                        {material.course && material.course.semester ?
                                            `Semester ${material.course.semester.semesterNumber}` : ''}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {material.course ?
                                            (typeof material.course === 'string' ? material.course :
                                                material.course.degreeName || '') : ''}
                                    </p>
                                    <p className="mt-2 text-gray-600 line-clamp-2">{material.description || ""}</p>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 mt-4">
                                    <a
                                        href={material.fileUrl || material.filePath || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center py-2 bg-[#4500e2] text-white rounded-lg hover:bg-[#3b00c0] transition-colors duration-300 shadow-md hover:shadow-lg"
                                    >
                                        View
                                    </a>
                                    <a
                                        href={material.fileUrl || material.filePath || "#"}
                                        download
                                        className="flex-1 text-center py-2 bg-white text-[#4500e2] border border-[#4500e2] rounded-lg hover:bg-[#4500e2]/10 transition-colors duration-300"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && (
                        <div className="col-span-full text-center py-10">
                            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m0 16v1m-8-8h1m15.719 0h1M5.929 5.929l.707.707M18.364 18.364l.707.707M12 12h.01m-6.938 4.5a7 7 0 1 1 12.254-5.957 5 5 0 0 0-3.256 4.491 3.5 3.5 0 0 1-2.241 3.126l-.265.07a2.5 2.5 0 0 1-.608.075h-2.49a1.5 1.5 0 0 1-.93-2.661l.067-.053c.22-.17.418-.364.59-.583" />
                            </svg>
                            <p className="mt-4 text-lg text-gray-600">No materials found</p>
                            <p className="mt-1 text-gray-500">Try adjusting your search</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default CourseMaterial;
