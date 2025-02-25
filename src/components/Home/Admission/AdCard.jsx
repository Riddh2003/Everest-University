const AdCard = ({ StageNo, StageProcess, desc }) => {
  return (
    <div className="flex flex-col sm:w-full mb-2  md:w-full  xl:w-1/4 grid-flow-row p-10 bg-[#345D7C] items-center rounded-lg text-center text-white">
      <div className="flex justify-center p-3 rounded-full">
        <h1 className="p-10 text-center rounded-full w-16 h-16 flex justify-center font-bold bg-white text-2xl items-center text-black ">{StageNo}</h1>
      </div>
      <h3 className="mb-4 mt-2 font-mono cursor-pointer font-bold">{StageProcess}</h3>
      <p>{desc}</p>
    </div>
  )
}

export default AdCard