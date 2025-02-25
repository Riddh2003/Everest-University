import React from "react";
import uniImage from "/univ.jpg";
import { Link, Navigate } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-[#5CB338] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left md:mr-8">
          <h1 className="text-4xl md:text-5xl font-bold">
            Shape Your Future at <span className="text-blue-700">Everest University</span>
          </h1>
          <p className="mt-4 text-white">
            Discover world-class education, innovative research, and endless opportunities for growth and success.
          </p>
          <div className="mt-6 flex justify-center md:justify-start gap-4">

            <Link to="/admission" className="cursor-pointer font-medium hover:text-white">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-500 transition">
                Apply Now
              </button>
            </Link>

            <a className="" href="#Courses">
              <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-500 transition">
                Explore Programs
              </button>
            </a>
          </div>
          <div className="mt-8 flex justify-center md:justify-start gap-8 text-white">
            <div>
              <p className="text-2xl font-bold">50+</p>
              <p>Programs</p>
            </div>
            <div>
              <p className="text-2xl font-bold">1000+</p>
              <p>Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold">95%</p>
              <p>Placement</p>
            </div>
          </div>
        </div>
        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img src={uniImage} alt="University" className="w-full h-64 md:h-80 rounded-xl object-cover" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
