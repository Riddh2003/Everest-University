import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Sample icons as SVGs
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function AdminCoursesMaterial() {
  const [searchTerm, setSearchTerm] = useState("");
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null
  });

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchMaterials();
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.file) {
      alert("Please fill all the required fields");
      return;
    }

    setLoading(true);

    try {
      const materialData = new FormData();

      // Create material JSON
      const materialJson = JSON.stringify({
        title: formData.title,
        description: formData.description
      });

      materialData.append('material', materialJson);
      materialData.append('file', formData.file);

      const response = await axios.post(
        'http://localhost:9999/api/private/material/addMaterial',
        materialData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        alert("Material added successfully");
        setShowAddForm(false);
        setFormData({
          title: "",
          description: "",
          file: null
        });
        fetchMaterials(); // Refresh the materials list
      } else {
        alert(response.data.message || "Failed to add material");
      }
    } catch (err) {
      console.error("Error adding material:", err);
      alert(err.response?.data?.message || "An error occurred while adding the material");
    } finally {
      setLoading(false);
    }
  };

  // Filtered materials based on search
  const filteredMaterials = materials.filter((material) => {
    return (searchTerm === "" ||
      (material.title || "").toLowerCase().includes(searchTerm.toLowerCase()));
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedMaterials = filteredMaterials.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-1">
                <h2 className="text-xl font-medium text-[#4500e2]">
                  Course Materials
                </h2>
              </div>

              <div className="md:col-span-2">
                <div className="flex flex-wrap gap-3">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="Search by title..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 pl-9 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4500e2] focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                      <SearchIcon />
                    </div>
                  </div>

                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-1 px-4 py-2 bg-[#4500e2] text-white rounded-md hover:bg-[#3b00c0] transition-colors"
                  >
                    <AddIcon />
                    Add Material
                  </button>
                </div>
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

          {/* Materials Card Grid */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {!loading && paginatedMaterials.length > 0 ? (
              paginatedMaterials.map((material) => (
                <div key={material.materialId}
                  className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                  <div className="relative h-40 bg-gradient-to-tr from-[#4500e2] to-purple-500">
                    <img
                      src={'https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY='}
                      alt={material.title}
                      className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <button className="p-1 bg-white rounded-full text-[#4500e2] hover:bg-[#4500e2] hover:text-white transition-colors">
                        <EditIcon />
                      </button>
                      <button className="p-1 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                        <DeleteIcon />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="text-lg font-bold text-white truncate">{material.title || 'Untitled Material'}</h3>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-1">
                        {material.course && material.course.semester ?
                          `Semester ${material.course.semester.semesterNumber}` : ''}
                      </p>
                      <p className="text-sm text-gray-500">
                        {material.course ?
                          (typeof material.course === 'string' ? material.course :
                            material.course.degreeName || '') : ''}
                      </p>
                      <p className="mt-2 text-gray-600 line-clamp-2 text-sm">{material.description || ""}</p>
                    </div>

                    <a
                      href={material.filePath || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-2 bg-[#4500e2] text-white rounded-lg hover:bg-[#3b00c0] transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                      View Material
                    </a>
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
                  <p className="mt-1 text-gray-500">Try adjusting your search or add new materials</p>
                </div>
              )
            )}
          </div>

          {/* Pagination */}
          {filteredMaterials.length > 0 && (
            <div className="p-4 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
              <p className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredMaterials.length)} of {filteredMaterials.length} materials
              </p>

              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className={`px-3 py-1 border border-gray-300 rounded-md ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                >
                  Previous
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Calculate page numbers to show
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 border rounded-md ${pageNum === page
                        ? 'bg-[#4500e2] text-white border-[#4500e2]'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className={`px-3 py-1 border border-gray-300 rounded-md ${page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Material Form Popup */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <CloseIcon />
            </button>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#4500e2] mb-4">Add New Material</h3>

              <form onSubmit={handleAddMaterial}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4500e2] focus:border-transparent"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4500e2] focus:border-transparent"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                    File Upload *
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4500e2] focus:border-transparent"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">Supported formats: PDF, DOC, DOCX, PPT, PPTX</p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-[#4500e2] text-white rounded-md hover:bg-[#3b00c0] transition-colors disabled:opacity-70"
                  >
                    {loading ? 'Adding...' : 'Add Material'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCoursesMaterial;