import React, { useState, useEffect } from 'react';
import useTheme from '../../context/NewContext'; // Import useTheme to access context for managing the sidebar state
import AdminSideBar from './AdminSideBar';

function Header() {
  // State to manage the profile dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function for the profile dropdown
  const profile = () => {
    setIsOpen(!isOpen);
  };

  // Destructuring the theme context to get sidebar state and toggle function
  const { isOpenForSideBar, toggleSidebar } = useTheme();

  return (
    <>
      {/* Header section */}
      <header className='shadow sticky z-50 top-0'>
        <nav className='bg-blue-600 border-gray-200 px-4 py-3'>
          <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>

            {/* Sidebar Toggle and Admin Dashboard Text */}
            <div className='flex items-center'>
              <button className='text-white' onClick={toggleSidebar}>
                <h1 className='text-3xl border-2 border-gray-300 py-1 px-1'>☰</h1>
              </button>
              <p className='text-white text-xl ml-4'>Admin Dashboard</p>
            </div>

            {/* Logout button and profile menu */}
            <div className="flex items-center">
              {/* Logout Button */}
              <button
                className="hover:bg-blue-700 bg-blue-500 text-white border-white border-2 rounded-md p-2 mr-4"
                onClick={() => { console.log("logout") }} // Add logout functionality later
              >
                Logout
              </button>

              {/* Profile Dropdown Button */}
              <div className='relative'>
                <button className='text-white' onClick={profile} aria-expanded={isOpen ? 'true' : 'false'} aria-controls="profile-dropdown">
                  Profile
                </button>

                {/* Profile Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-blue-700 text-white rounded-md shadow-lg">
                    <ul>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-blue-600">Profile</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-blue-600">Sign up</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-blue-600">Login</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Sidebar and main content area */}
      <div>
        <AdminSideBar />
      </div>
    </>
  );
}

export default Header; // Export the Header component