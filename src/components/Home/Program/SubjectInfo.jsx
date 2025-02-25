import Navbar from "../01_Nav/Navbar.jsx";
import Admission from "../Admission/Admission.jsx";
import React from 'react'
import AdmissionForm from "../../forms/AdmissionForm.jsx";
import Footer from "../Footer/Footer.jsx";
import Card from "../Academic Programs/Card.jsx";
import { GoCode, GoBriefcase, GoGraph, GoDeviceDesktop, GoCodeReview, GoOrganization, GoDesktopDownload } from "react-icons/go";

const SubjectInfo = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div className="sticky top-0 z-50">
        <Navbar></Navbar>
      </div>
      <br />
      <h1 className="bg-[#345D7C] text-white text-4xl font-semibold p-3 text-center">Commerce College</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 p-12">
        <div className="text-xl text-justify p-12 leading-relaxed">
          <p>
            Welcome to Everest University – Empowering Future Innovators in Computer Applications!
          </p>
          <p>
            At Everest University, we blend academic excellence with practical expertise to shape the next generation of tech leaders. Our Bachelor of Computer Applications (BCA) program is designed to provide a cutting-edge curriculum, hands-on experience, and industry-aligned skills, ensuring students are well-prepared for the evolving world of technology.
          </p>
          <p>
            With a faculty of seasoned professionals and IT experts, we foster a dynamic learning environment covering key areas like software development, artificial intelligence, cybersecurity, cloud computing, and data science. Our state-of-the-art labs, industry collaborations, and project-based approach empower students with real-world problem-solving skills.
          </p>
          <p>
            Join Everest University to embark on a transformative educational journey where knowledge meets innovation, passion drives success, and dreams become reality. Unleash your potential, master technology, and shape the future with us!
          </p>

        </div>
        <div className="">
          <AdmissionForm></AdmissionForm>
        </div>
      </div>
      <br />
      <h1 className="bg-[#345D7C] text-white text-4xl font-semibold p-3 mb-10 text-center">Bachelor of Computer Applications (BCA) – Everest University</h1>

      <div class="bg-gray-100 flex items-center justify-center p-20">

        <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          <h2 class="text-2xl font-bold text-center text-white bg-[#345D7C] py-4">
            BCA Course Details - Everest University
          </h2>

          <table class="w-full border-collapse">
            <tbody>
              <tr class="border-b border-gray-300">
                <td class="px-6 py-4 font-semibold text-gray-700 bg-gray-100">Duration</td>
                <td class="px-6 py-4 text-gray-600">3 Years (6 Semesters)</td>
              </tr>
              <tr class="border-b border-gray-300">
                <td class="px-6 py-4 font-semibold text-gray-700 bg-gray-100">Eligibility</td>
                <td class="px-6 py-4 text-gray-600">10+2 from a recognized board with Mathematics/Computer Science as a subject</td>
              </tr>
              <tr class="border-b border-gray-300">
                <td class="px-6 py-4 font-semibold text-gray-700 bg-gray-100">Mode</td>
                <td class="px-6 py-4 text-gray-600">Regular / Distance / Online</td>
              </tr>
              <tr class="border-b border-gray-300">
                <td class="px-6 py-4 font-semibold text-gray-700 bg-gray-100">Fee Structure</td>
                <td class="px-6 py-4 text-gray-600">₹50,000 - ₹1,50,000 per year (can be customized as per university norms)</td>
              </tr>
              <tr>
                <td class="px-6 py-4 font-semibold text-gray-700 bg-gray-100">Total Credits</td>
                <td class="px-6 py-4 text-gray-600">120-150 (depending on university regulations)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Admission></Admission>
      <Footer></Footer>
    </div>
  )
}

export default SubjectInfo;
