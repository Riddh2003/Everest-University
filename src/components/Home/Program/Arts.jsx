import Navbar from "../01_Nav/Navbar.jsx";
import Admission from "../Admission/Admission.jsx";
import React from 'react'
import AdmissionForm from "../../forms/AdmissionForm.jsx";
import Footer from "../Footer/Footer.jsx";
import Card from "../Academic Programs/Card.jsx";
import { GoCode, GoBriefcase, GoGraph, GoDeviceDesktop, GoCodeReview, GoOrganization, GoDesktopDownload } from "react-icons/go";

const Arts = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div className="sticky top-0 z-50">
        <Navbar></Navbar>
      </div>
      <br />
      <h1 className="bg-[#345D7C] text-white text-4xl font-semibold p-3 text-center">College of Liberal Studies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 p-12">
        <div className="text-xl text-justify p-8 leading-relaxed">
          <p>Silver Oak University is proud to offer a comprehensive BA Liberal program with eight specializations: Public Administration, Politics and International Relations, English, Psychology, Economics, Mass Communication, Digital Humanities, Finance, Marketing, and Human Resource Management. This program is thoughtfully aligned with India’s New National Education Policy (NEP), ensuring a modern and relevant education.</p>

          <p>Our BA Liberal in Liberal Studies is an excellent choice for students seeking a flexible and multidisciplinary approach to higher education. The program allows students to personalize their studies according to their interests and career aspirations, providing a broad foundation for numerous career opportunities.</p>

          <p>The flexible study schedule is designed to accommodate students' daily routines and responsibilities, making it easier for them to balance academic and personal commitments. By pursuing this degree, students will gain a holistic education that fosters critical thinking, creativity, and problem-solving skills, essential for success in today's dynamic job market.</p>

          <p>Liberal Studies degree programs at Silver Oak University empower students to explore various disciplines, offering a well-rounded education that prepares them for diverse professional paths. Choose the BA Liberal program at Silver Oak University for a versatile and enriching academic experience that aligns with contemporary educational standards and opens doors to a bright future.</p>
        </div>
        <div className="">
          <AdmissionForm></AdmissionForm>
        </div>
      </div>
      <br />
      <h1 className="bg-[#345D7C] text-white text-4xl font-semibold p-3 mb-16 text-center">Courses We Provide of Computer Application</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-6">

        <Card icon={<GoBriefcase />} logo="MA - English Literature" content="Master of Arts in English Literature, exploring the richness of literary traditions and  critical thinking of Human." time="2-year program" verify="UGC Approved" />
      </div>
      <Admission></Admission>
      <Footer></Footer>
    </div>
  )
}

export default Arts