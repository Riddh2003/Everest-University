import Navbar from "../01_Nav/Navbar.jsx";
import Admission from "../Admission/Admission.jsx";
import React from 'react'
import AdmissionForm from "../../forms/AdmissionForm.jsx";
import Footer from "../Footer/Footer.jsx";
import Card from "../Academic Programs/Card.jsx";
import { GoCode, GoBriefcase, GoGraph, GoDeviceDesktop, GoCodeReview, GoOrganization, GoDesktopDownload } from "react-icons/go";

const Management = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div className="sticky top-0 z-50">
        <Navbar></Navbar>
      </div>
      <br />
      <h1 className="bg-[#345D7C] text-white text-4xl font-semibold p-3 text-center">Management College</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 p-12">
        <div className="text-xl text-justify p-5 leading-relaxed">
          <p>
            The School of Management at Everest University focuses on developing future leaders by providing students with essential managerial skills, strategic thinking abilities, and entrepreneurial insights needed to thrive in the corporate world.
          </p>

          <p>
            **Programs Offered**
            <ul className="list-disc ml-12 mt-2">
              <li>BBA (Bachelor of Business Administration)</li>
              <li>MBA (Master of Business Administration) – Various Specializations</li>
            </ul>
            <br />
            These programs focus on leadership, organizational strategy, business analytics, and corporate decision-making.
          </p>

          <p>
            **Why Choose Management at Everest University?**
            <ul className="list-disc ml-12 mt-2">
              <li> Industry-Relevant Curriculum: Designed with input from top corporate executives and business leaders.</li>
              <li> Practical Learning: Business case studies, corporate simulations, and leadership development programs.</li>
              <li> Expert Faculty: Learn from industry experts, CEOs, and experienced business strategists.</li>
              <li> Internship & Live Projects: Work with leading organizations to gain hands-on experience.</li>
              <li> Placement Assistance: Excellent placement record with top MNCs, consulting firms, and startups.</li>
              <li> Global Exposure: International business programs and exchange opportunities with reputed universities.</li>
            </ul>
          </p>
        </div>

        <div>
          <AdmissionForm></AdmissionForm>
        </div>
      </div>

      <br />
      <h1 className="bg-[#345D7C] text-white text-4xl font-semibold p-3 mb-16 text-center">Courses We Provide of Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-6">

        <Card icon={<GoGraph />} logo="BBA" content="Bachelor of Business Administration offering insights into management, marketing, and entrepreneurship." time="3-year program" verify="UGC Approved" />

        <Card icon={<GoOrganization />} logo="MBA" content="Master of Business Administration focusing on leadership, strategy, and specialized business fields." time="2-year program" verify="AICTE Approved" />
      </div>
      <Admission></Admission>
      <Footer></Footer>
    </div>
  )
}

export default Management