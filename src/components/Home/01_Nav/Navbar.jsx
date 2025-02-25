import { CgMenuRound, CgClose } from "react-icons/cg";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const Navbar = () => {

    const navigate = useNavigate();

    const handleNavigation = (path, hash) => {
        navigate(path + hash); // Navigates to the page with the hash
        setTimeout(() => {
            document.getElementById(hash.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
        }, 500); // Delay to allow page load
    };
    const [isOpen, setIsOpen] = useState(false);
    const [isHover, setIsHover] = useState(false);

    return (
        <nav className="flex items-center relative w-full justify-between px-4 py-4 bg-white text-[#5CB338] shadow-lg h-22">
            {/* Logo */}
            <div className="flex min-w-0 items-center gap-3 flex-shrink-0">
                <img src="/logo.jpg" className="w-12 h-12 border-2 border-[#5CB338] rounded-full flex-none" alt="" />
                <Link to="/" className=" text-4xl h-12 truncate flex-1 font-semibold cursor-pointer min-w-0"
                >
                    Everest University
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="lg:hidden md:block block text-[#5CB338] text-4xl focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <CgClose /> : <CgMenuRound />}
            </button>
            {/* Navigation Links */}
            <ul
                className={`fixed flex-shrink top-0 right-0 text-nowrap h-full w-3/4 p-4 flex flex-col items-center text-[#5CB338] text-xl transform transition-transform duration-300 ease-in-out lg:absolute lg:flex lg:flex-row  lg:space-x-4 md:hide lg:justify-evenly
                ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-full lg:translate-x-0"}`}
            >
                {/* Close button inside mobile menu */}
                <button
                    className="absolute top-4 right-4 text-3xl lg:hidden"
                    onClick={() => setIsOpen(false)}
                >
                    <CgClose />
                </button>

                <Link to="/" className="cursor-pointer font-medium hover:text-[#5B913B]">Home</Link>
                <Link className="cursor-pointer flex item-center font-medium hover:text-[#5B913B]"
                    onClick={() => setIsHover(!isHover)}
                >Academics &nbsp; <FaCaretDown className="mt-1.5" /></Link>
                {isHover && (
                    <div className="lg:absolute sticky bg-[#5CB338] text-[#345D7C] top-24 p-4 lg:left-48 lg:text-[#e3f4f2] opacity-95 lg:bg-[#5CB338] rounded-md left-12 ">
                        <div className="grid text-lg">
                            <a className=" hover:text-stone-900" href="/ComputerScience">Computer Science </a>
                            <a className=" hover:text-stone-900" href="/Commerce">Commerce</a>
                            <a className=" hover:text-stone-900" href="/Management">Management</a>
                        </div>
                    </div>
                )}
                <Link to="/admissionpage" className="cursor-pointer font-medium hover:text-[#5B913B]">Admissions</Link>
                <a onClick={
                    () => handleNavigation("/", "#Campus")
                } className="cursor-pointer font-medium hover:text-[#5B913B]">Campus Life</a>
                <a
                    onClick={
                        () => handleNavigation("/", "#Alumni")
                    }
                    className="cursor-pointer font-medium hover:text-[#5B913B]">Alumni</a>
                <a onClick={
                    () => handleNavigation("/", "#Contact")
                } className="cursor-pointer font-medium hover:text-[#5B913B]">Contact</a>

                {/* Apply Now Button */}
                {/* <div className="ml-2">
                    <Link to="/admission">
                        <button
                            className="px-4 py-2 bg-white text-[#345D7C] font-medium rounded-lg shadow-md hover:bg-gray-200 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Apply Now
                        </button>
                    </Link>
                </div> */}
            </ul>
        </nav >
    );
};

export default Navbar;