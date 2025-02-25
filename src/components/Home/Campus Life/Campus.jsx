import { FaRegSmile, FaRegStar } from "react-icons/fa";
import { TiGroupOutline } from "react-icons/ti";
// import image from "Tech_fest2.jpeg"

import Camcard from "./Camcard"

const Campus = () => {
  return (
    <div className="bg-quick text-center text-[#5CB338] p-8 mb-10" >
      <h1 className=" font-semibold text-4xl pb-8">Campus Life</h1>
      <p className="text-xl pb-5">Experience a vibrant and enriching student life at SilverPeak University</p>
      <div className="grid p-10 gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <Camcard logo={<FaRegSmile></FaRegSmile>} title="Sports & Athletics" content="State-of-the-art sports facilities including indoor and outdoor courts"></Camcard>
        <Camcard logo={<FaRegStar></FaRegStar>} title="Cultural Activities" content="Regular cultural events, festivals, and performances"></Camcard>
        <Camcard logo={<TiGroupOutline></TiGroupOutline>} title="Student Clubs" content="Join various academic and recreational clubs"></Camcard>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-1 xl:grid-cols-3 gap-7 p-4">

        <div className="bg-white text-[#5CB338] shadow-lg rounded-xl p-7 ">
          <img src="/Tech_Fest2.jpg" className=" rounded-lg" alt="" />
          <h1 className="text-xl font-bold p-3">Tech Fest 2024</h1>
          <p>Annual technology festival featuring competitions and workshops</p>
        </div>
        <div className="bg-white text-[#5CB338] shadow-lg rounded-xl p-7">
          <img src="/Cultural.webp" className=" rounded-lg" alt="" />
          <h1 className="text-xl font-bold p-3">Cultural Week</h1>
          <p>Week-long celebration of art, music, and dance</p>
        </div>
        <div className="bg-white text-[#5CB338] shadow-lg rounded-xl p-7 ">
          <img src="/Sport.jpg" className=" rounded-lg" alt="" />
          <h1 className="text-xl font-bold p-3">Sports Meet</h1>
          <p>Annual inter-college sports competition</p>
        </div>
      </div>
      <div className=" text-center bg-[#5CB338] text-white rounded-lg flex flex-col justify-center items-center selection:bg-red-500 selection:text-yellow-400 mt-8">

        <h1 className="text-4xl mt-7 font-bold">
          Student Experiences
        </h1>
        <i className="p-4 w-fit rounded-xl mt-8">
          "The campus life at SilverPeak University is incredibly dynamic and engaging. I've grown both academically and personally."
          <br />
          <b>- Sarah Johnson, Computer Science</b>
        </i>
        <br id="Alumni" />
      </div>
    </div>
  )
}

export default Campus