import Navbar from "../01_Nav/Navbar.jsx";
import Admission from "../Admission/Admission.jsx";
import React from 'react'
import AdmissionForm from "../../forms/AdmissionForm.jsx";
import Footer from "../Footer/Footer.jsx";
import Card from "../Academic Programs/Card.jsx";
import { GoCode, GoBriefcase, GoGraph, GoDeviceDesktop, GoCodeReview, GoOrganization, GoDesktopDownload } from "react-icons/go";

const ComputerScience = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div className="sticky top-0 z-50">
        <Navbar></Navbar>
      </div>
      <br />
      <h1 className="bg-[#345D7C] text-white text-4xl font-semibold p-3 text-center">College of Computer Science</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 p-12">
        <div className="text-xl text-justify p-5 leading-relaxed">
          <p>
            Everest University is a premier institution dedicated to academic excellence and industry-driven education, preparing students for the ever-evolving tech landscape. Our School of Computer Applications offers cutting-edge programs designed to provide practical exposure and career-focused learning.
          </p>

          <p>
            Programs Offered
            Everest University provides advanced and industry-aligned programs in Computer Applications, including:

            <p>
              <ul className="list-disc ml-12">

                <li>BCA (Bachelor of Computer Applications)</li>
                <li>B.Sc (CS-IT) – Computer Science & Information Technology</li>
                <li>MCA (Master of Computer Applications)</li>
                <li>M.Sc (Information Technology)</li>
              </ul>
            </p>
            <br />
            Each program is structured to equip students with expertise in software development, artificial intelligence, cybersecurity, cloud computing, blockchain, and data analytics.
          </p>

          <p>
            Why Choose Everest University?

            <ul className="list-disc ml-12">
              <li> Industry-Focused Curriculum: Programs designed in collaboration with tech leaders to ensure students gain real-world skills.</li>
              <li> State-of-the-Art Infrastructure: Modern computer labs, high-speed internet, and cloud computing environments.</li>
              <li> Expert Faculty: Learn from experienced professors, researchers, and industry professionals.</li>
              <li> Hands-on Learning: Live projects, industry case studies, and hackathons for practical exposure.</li>
              <li> Placement Assistance: 100% placement support with top tech companies, startups, and MNCs.</li>
              <li> Global Certification Programs: Access to Microsoft, AWS, Google Cloud, and IBM certifications.</li>
            </ul>
          </p>

        </div>

        <div className="">
          <AdmissionForm></AdmissionForm>
        </div>
      </div>
      <br />
      <h1 className="bg-[#345D7C] text-white text-4xl font-semibold p-3 mb-16 text-center">Courses We Provide of Computer Science</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-6">

        <Card icon={<GoCode />} logo="BCA" content="Bachelor of Computer Applications focusing on programming, database management, and web development." time="3-year program" verify="UGC Approved" />

        <Card icon={<GoDeviceDesktop />} logo="BSC-IT" content="Bachelor of Science in Information Technology emphasizing software development and data analysis." time="3-year program" verify="UGC Approved" />

        <Card icon={<GoCodeReview />} logo="MCA" content="Master of Computer Applications advancing knowledge in software development and application design." time="2-year program" verify="AICTE Approved" />

        <Card icon={<GoDesktopDownload />} logo="MSC-IT" content="Master of Science in Information Technology focusing on advanced computing, networks, and data science." time="2-year program" verify="UGC Approved" />
      </div>
      <Admission></Admission>
      <Footer></Footer>
    </div>
  )
}

export default ComputerScience