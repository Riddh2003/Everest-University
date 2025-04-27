import AdCard from "./AdCard"
const Admission = () => {
  return (
    <div className='flex flex-col justify-center items-center p-4'>
      <h1 className="text-4xl font-semibold flex justify-center">
        Admission
      </h1>
      <p className="flex mt-4 text-xl justify-center mb-14">Your journey to excellence starts here</p>
      <div className=" xl:flex sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 justify-center gap-5 ">

        <AdCard StageNo="1" StageProcess="Apply Online" desc="Complete the online application form and submit required documents"></AdCard>
        <AdCard StageNo="2" StageProcess="Document Verification" desc="Submit original documents for verification process"></AdCard>
        <AdCard StageNo="3" StageProcess="Confirmation" desc="Complete fee payment and secure your admission"></AdCard>
      </div>
    </div>
  )
}

export default Admission