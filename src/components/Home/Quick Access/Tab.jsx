

const Tab = ({ ic, heading }) => {
  return (
    <div className=' flex flex-col bg-[#5CB338] justify-center text-center hover:scale-105 hover:shadow-lg rounded-2xl w-56 h-48 transition-transform duration-500 ease-in-out'>
      <div className="flex justify-center text-center">
        <div className="rounded-xl ">
          {ic}
        </div>
      </div>
      <h3>
        {heading}
      </h3>
    </div>
  )
}

export default Tab
