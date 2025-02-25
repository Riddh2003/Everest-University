import React from 'react';
import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import ContactCard from './ContactCard';

const Contact = () => {
  return (
    <div className='flex flex-col mt-8 bg-white text-center items-center' id='Contact'>
      <h1 className='text-4xl text-[#5CB338] font-bold'>Contact Us</h1>
      <p className='p-5 text-[#5CB338]'>Get in touch with us for any inquiries</p>

      <div className="grid md:grid-cols-2 space-x-4 gap-7 p-8 w-full max-w-8xl">
        <div className="bg-[#5CB338] shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-white">Send Us A Message</h2>
          <form className="space-y-6 text-left justify-start">
            <div>
              <label className="block text-white mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">
                Department
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              >
                <option value="">Select Department</option>
                <option value="computer-science">Computer Science</option>
                <option value="business">Business Administration</option>
                <option value="engineering">Engineering</option>
              </select>
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">
                Message
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Write your message here"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-lg text-[#5CB338] p-2 font-semibold rounded-lg hover:shadow-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
        <div>
          <div className="w-full min-h-[300px] h-[50vh] md:h-[60vh] border-solid border-2 rounded-lg">
            <Map
              initialViewState={{
                longitude: 77.2090, // New Delhi Example
                latitude: 28.6139,
                zoom: 12
              }}
              style={{ width: "100%", height: "100%" }} // Ensures the map fills the container
              mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            >
              <Marker longitude={77.2090} latitude={28.6139}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg"
                  width="40"
                  height="40"
                  alt="Marker"
                  style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.4))" }}
                />
              </Marker>
            </Map>
          </div>

          <div className="gap-x-4 mt-6 md:mt-3 grid md:grid-cols-2 sm:grid-cols-1 gap-y-0 text-left text-xl text-nowrap items-center">
            <ContactCard logo={<IoCallOutline />} label1="Phone" label2="+1 (555) 123-4567"></ContactCard>
            <ContactCard logo={<MdOutlineMail />} label1="Email" label2="info@EverestUni.edu"></ContactCard>
            <ContactCard logo={<IoLocationOutline />} label1="Location" label2="123 University Ave, City, State"></ContactCard>
            <ContactCard logo={<MdOutlineAccessTime />} label1="Office Hours" label2="Mon-Fri: 9:00 AM - 5:00 PM"></ContactCard>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  )
}

export default Contact;