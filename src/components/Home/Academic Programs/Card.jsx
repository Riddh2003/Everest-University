import { GiCheckMark } from "react-icons/gi";
import { Link } from "react-router-dom";

const Card = ({ icon, logo, content, time, verify }) => {
    return (
        <div className='mt-6 flex flex-col justify-between text-left text-nowrap overflow-hidden shadow-lg hover:shadow-2xl text-[#5CB338] bg-white cursor-progress p-10 rounded-xl'>
            <div className="text-4xl text-quick-bor p-2">
                {icon}
            </div>
            <h1 className='font-bold text-2xl p-2 align-middle '>{logo}</h1>
            <div className='p-2 text-wrap'>
                {content}
            </div>
            <div className="flex items-center p-2">
                <GiCheckMark className="text-quick-bor text-2xl mr-3"></GiCheckMark>{time}
            </div>
            <div className="flex items-center p-2">
                <GiCheckMark className="text-quick-bor text-2xl mr-3"></GiCheckMark>{verify}
            </div>
            <Link to="/SubjectInfo">
                <div className='p-3 justify-center mt-4 w-full flex'>
                    <button className='p-2 rounded-xl shadow-md text-xl bg-[#5CB338] text-white hover:bg-white hover:text-[#5CB338] w-full'>
                        Learn More
                    </button>
                </div>
            </Link>
        </div>
    )
}

export default Card
