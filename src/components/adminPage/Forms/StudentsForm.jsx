import React from 'react';

const StudentsForm = ({ studentData, onChange, onSubmit, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 max-h-screen overflow-auto">
        <h2 className="text-xl font-bold mb-4">Edit Student</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Enrollment ID</label>
            <input
              type="text"
              name="enrollmentId"
              value={studentData.enrollmentId}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Surname</label>
            <input
              type="text"
              name="surName"
              value={studentData.surName}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={studentData.firstName}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={studentData.middleName}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mobile Number</label>
            <input
              type="text"
              name="mobileNo"
              value={studentData.mobileNo}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={studentData.email}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={studentData.password}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <input
              type="text"
              name="gender"
              value={studentData.gender}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={studentData.dateOfBirth}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Program</label>
            <input
              type="text"
              name="program"
              value={studentData.program}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Degree</label>
            <input
              type="text"
              name="degree"
              value={studentData.degree}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Degree Name</label>
            <input
              type="text"
              name="degreeName"
              value={studentData.degreeName}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Current Semester</label>
            <input
              type="number"
              name="currentSem"
              value={studentData.currentSem}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Current Year</label>
            <input
              type="number"
              name="currentYear"
              value={studentData.currentYear}
              onChange={onChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Created At</label>
            <input
              type="datetime-local"
              name="createAt"
              value={studentData.createAt}
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

export default StudentsForm;
