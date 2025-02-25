import Navbar from "../01_Nav/Navbar.jsx";
import Admission from "../Admission/Admission.jsx";
import React from 'react'
import AdmissionForm from "../../forms/AdmissionForm.jsx";
import Footer from "../Footer/Footer.jsx";
import Card from "../Academic Programs/Card.jsx";
import { GoCode, GoBriefcase, GoGraph, GoDeviceDesktop, GoCodeReview, GoOrganization, GoDesktopDownload } from "react-icons/go";

const Commerce = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div className="sticky top-0 z-50">
        <Navbar></Navbar>
      </div>
      <br />
      <h1 className="bg-[#345D7C] text-white text-4xl font-semibold p-3 text-center">Commerce College</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 p-12">
        <div className="text-xl text-justify p-5 leading-relaxed">
          <p>
            The School of Commerce at Everest University provides students with a strong foundation in financial principles, business laws, taxation, and accounting, ensuring they are well-equipped for careers in banking, finance, and corporate sectors.
          </p>

          <p>
            **Programs Offered**
            <ul className="list-disc ml-12 mt-2">
              <li>B.Com (Bachelor of Commerce)</li>
              <li>M.Com (Master of Commerce)</li>
            </ul>
            <br />
            These programs focus on core business concepts, financial management, investment strategies, and taxation policies.
          </p>

          <p>
            **Why Choose Commerce at Everest University?**
            <ul className="list-disc ml-12 mt-2">
              <li> Industry-Centric Curriculum: Designed to meet the evolving needs of the finance and commerce sectors.</li>
              <li> Advanced Learning Facilities: Stock market simulations, accounting software training, and real-time case studies.</li>
              <li> Expert Faculty: Learn from experienced finance professionals, economists, and corporate strategists.</li>
              <li> Practical Exposure: Internships in banks, financial firms, and audit companies.</li>
              <li> Placement Assistance: Strong industry collaborations ensuring job opportunities in top finance companies and firms.</li>
              <li> Certification Opportunities: Access to courses like CA (Chartered Accountant), CFA, and Financial Modeling.</li>
            </ul>
          </p>
        </div>

        <div>
          <AdmissionForm></AdmissionForm>
        </div>
      </div>

      <br />
      <h1 className="bg-[#345D7C] text-white text-4xl font-semibold p-3 mb-16 text-center">Courses We Provide of Commerce</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-6">

        <Card icon={<GoBriefcase />} logo="B.COM" content="Bachelor of Commerce specializing in accounting, finance, and business management." time="3-year program" verify="UGC Approved" />

        <Card icon={<GoGraph />} logo="M.COM" content="Master of Commerce enhancing expertise in advanced accounting, finance, and corporate governance." time="2-year program" verify="UGC Approved" />
      </div>
      <Admission></Admission>
      <Footer></Footer>
    </div>
  )
}

export default Commerce