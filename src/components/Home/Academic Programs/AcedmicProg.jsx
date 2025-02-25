import { useState } from "react";
import Card from "./Card"
import { GoCode, GoBriefcase, GoGraph, GoDeviceDesktop, GoCodeReview, GoOrganization, GoDesktopDownload } from "react-icons/go";


const AcedmicProg = () => {

        let [selectDegree, setSelectDegree] = useState("undergraduate");
        let showUndergraduate = () => setSelectDegree("undergraduate");
        let showPostgraduate = () => setSelectDegree("postgraduate");
        let showIntegrated = () => setSelectDegree("integrated");

        return (
                <div className="flex text-[#5CB338] flex-col items-center justify-center mt-20 text-center p-14 bg-[#f5f5f5]">
                        <h1 className="text-3xl font-semibold">Academic Programs</h1>
                        <p className="p-8 text-xl ">Discover our comprehensive range of programs designed for your success</p>
                        <div className="flex items-center justify-center w-full gap-4 text-xl">
                                <button className={`rounded-full p-2 md:w-1/6 sm:w-1/4 sm:text-base text-lg hover:bg-[#5CB338] hover:text-white bg-white ${selectDegree === "undergraduate" ? `bg-[#5CB338] text-white` : "bg-white text-[#0d9488]"}`} onClick={showUndergraduate}>Undergraduate</button>

                                <button className={`rounded-full p-2 md:w-1/6 sm:w-1/4 sm:text-base text-lg  hover:bg-[#5CB338] hover:text-white bg-white ${selectDegree === "postgraduate" ? `bg-[#5CB338] text-white` : "bg-white text-[#0d9488]"} `} onClick={showPostgraduate}>Postgraduate</button>

                                <button className={`rounded-full p-2 md:w-1/6 sm:w-1/4 sm:text-base text-lg  hover:bg-[#5CB338] hover:text-white bg-white ${selectDegree === 'integrated' ? `bg-[#5CB338] text-white` : "bg-white text-[#0d9488]"}`} onClick={showIntegrated}>Integrated</button>
                        </div >
                        <div className='mt-5 grid  grid-flow-col auto-cols-[minmax(210px,1fr)] sm:p-2 xl:auto-cols-[minmax(400px,1fr)] gap-5 xl:p-4 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden w-full'>

                                {selectDegree === 'undergraduate' && (
                                        <>
                                                <Card icon={<GoCode />} logo="BCA" content="Bachelor of Computer Applications focusing on programming, database management, and web development." time="3-year program" verify="UGC Approved" />

                                                <Card icon={<GoBriefcase />} logo="B.COM" content="Bachelor of Commerce specializing in accounting, finance, and business management." time="3-year program" verify="UGC Approved" />

                                                <Card icon={<GoGraph />} logo="BBA" content="Bachelor of Business Administration offering insights into management, marketing, and entrepreneurship." time="3-year program" verify="UGC Approved" />

                                        </>
                                )}
                                {selectDegree === "postgraduate" && (
                                        <>
                                                <Card icon={<GoCodeReview />} logo="MCA" content="Master of Computer Applications advancing knowledge in software development and application design." time="2-year program" verify="AICTE Approved" />

                                                <Card icon={<GoOrganization />} logo="MBA" content="Master of Business Administration focusing on leadership, strategy, and specialized business fields." time="2-year program" verify="AICTE Approved" />

                                                <Card icon={<GoGraph />} logo="M.COM" content="Master of Commerce enhancing expertise in advanced accounting, finance, and corporate governance." time="2-year program" verify="UGC Approved" />

                                                <Card icon={<GoDesktopDownload />} logo="MSC-IT" content="Master of Science in Information Technology focusing on advanced computing, networks, and data science." time="2-year program" verify="UGC Approved" />

                                        </>
                                )}
                                {selectDegree === "integrated" && (
                                        <>
                                                <Card icon={<GoCodeReview />} logo="MCA" content="Master of Computer Applications advancing knowledge in software development and application design." time="2-year program" verify="AICTE Approved" />

                                                <Card icon={<GoDesktopDownload />} logo="MSC-IT" content="Master of Science in Information Technology focusing on advanced computing, networks, and data science." time="2-year program" verify="UGC Approved" />
                                        </>
                                )}

                        </div>
                        <br id="Campus" />
                </div >
        )
}

export default AcedmicProg
