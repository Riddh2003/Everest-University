import React from 'react';
import Navbar from "../components/Home/01_Nav/Navbar";
import AdmissionForm from "../components/forms/AdmissionForm.jsx";
import Footer from '../components/Home/Footer/Footer.jsx';

const AdmissionPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Sticky Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Add padding to prevent content from being hidden under the navbar */}
      <div className="flex flex-col items-center justify-center flex-grow p-4 mt-20">
        <div className="md:w-1/2 lg:w-1/2">
          <AdmissionForm />
        </div>
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default AdmissionPage;
