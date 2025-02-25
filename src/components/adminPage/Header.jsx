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
        <nav className='bg-[#638ba0] border-gray-200 px-4 lg:px-6 py-2.5 justify-center'>
          <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>


            {/* Admin Dashboard Text */}
            <div className='flex mt-4 text-xl content-center'>
              <div className=' items-center text-cente'>
                <button className='text-white' onClick={toggleSidebar}>
                  <h1 className=' text-3xl border-2 border-gray-300 py-1 px-1 text-center justify-center ' >   ☰   </h1>
                </button>
              </div>
              <p className='text-[#F8FAFC] px-6 '>   Admin Dashboard</p>
            </div>

            {/* Logout button and profile menu */}
            <div className="flex items-left lg:order-2">
              {/* Logout Button */}
              <button
                className="hover:bg-[#81ACC3] hover:text-black bg-[#345D7C] text-white border-gray-400 border-2 rounded-md p-1"
                onClick={() => { console.log("logout") }} // Add logout functionality later
              >
                Logout
              </button>

              {/* Profile Dropdown Button */}
              <div className='ml-4 items-center text-center lg:order-2 relative'>
                <button className='text-white' onClick={profile} aria-expanded={isOpen ? 'true' : 'false'} aria-controls="profile-dropdown">
                  Profile
                </button>

                {/* Profile Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-700 text-white rounded-md shadow-lg">
                    <ul>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-600">Profile</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-600">Sign up</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-600">Login</a>
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
