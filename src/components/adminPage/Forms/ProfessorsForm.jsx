import React from 'react';

const ProfessorsForm = ({ facultyData, onChange, onSubmit, onClose }) => {
    if (!facultyData) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 max-h-screen overflow-auto">
        <h2 className="text-xl font-bold mb-4">Edit Faculty</h2>
        <form onSubmit={onSubmit} className="space-y-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={facultyData.name}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={facultyData.email}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={facultyData.password}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Profile Picture</label>
            <input
              type="text"
              name="profilePicture"
              value={facultyData.profilePicture}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Role</label>
            <input
              type="text"
              name="role"
              value={facultyData.role}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Qualification</label>
            <input
              type="text"
              name="qualification"
              value={facultyData.qualification}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <input
              type="text"
              name="status"
              value={facultyData.status}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Department</label>
            <input
              type="text"
              name="department"
              value={facultyData.department}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Created At</label>
            <input
              type="datetime-local"
              name="createdAt"
              value={facultyData.createdAt}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Updated At</label>
            <input
              type="datetime-local"
              name="updatedAt"
              value={facultyData.updatedAt}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfessorsForm;
