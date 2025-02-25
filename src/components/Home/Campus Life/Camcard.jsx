const Camcard = ({ logo, title, content }) => {
  return (
    <div className='mt-6 flex flex-col  text-left text-nowrap shadow-lg hover:shadow-2xl bg-[#5CB338] text-white cursor-progress w-auto p-10 rounded-xl '>
      <div className="text-4xl p-2">
        {logo}
      </div>
      <h1 className='font-bold text-2xl p-2 align-middle '>
        {title}
      </h1>
      <div className='p-2 text-wrap text-xl'>
        {content}
      </div>
    </div>
  )
}

export default Camcard