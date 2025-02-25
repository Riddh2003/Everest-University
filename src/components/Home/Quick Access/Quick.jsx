import Tab from "./Tab";
import { IoBookOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { GiGraduateCap } from "react-icons/gi";
import { FaUniversity } from "react-icons/fa";
import { Link } from "react-router-dom";

const Quick = () => {
    return (
        <div className='grid justify-center font-semibold mt-14'>
            <h1 className='text-4xl text-[#5CB338] text-center'>Quick Access</h1>
            <div className="grid items-center justify-center gap-6 mt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 text-white">
                <Link to="/studentportal/login"><Tab heading="Student Portal"
                    ic={<IoBookOutline className="p-3 text-6xl text-center bg-white text-[#5CB338] rounded-3xl"></IoBookOutline>}></Tab></Link>
                <Link to="/admission"><Tab heading="Admissions"
                    ic={<FaUniversity className="p-3 text-6xl text-center bg-white text-[#5CB338] rounded-3xl"></FaUniversity>}></Tab></Link>
                <a href="#Courses">

                    <Tab heading="Courses"
                        ic={<GiGraduateCap className="p-3 rounded-3xl text-6xl text-center bg-white text-[#5CB338]"></GiGraduateCap>}></Tab>
                </a>

                <a href="#Alumni" className="cursor-pointer font-medium">

                    <Tab heading="Alumni"
                        ic={<GrGroup className="p-3 text-6xl text-center bg-white text-[#5CB338] rounded-3xl"></GrGroup>}></Tab>
                </a>
            </div>
            <br id="Courses" />
        </div>
    )
}

export default Quick
