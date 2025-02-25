import React from 'react';

const ContactCard = ({ logo, label1, label2 }) => {
  return (
    <div className='bg-white rounded-xl h-20 p-2 flex gap-4 items-center sm:p-8 mt-4 overflow-hidden shadow-lg'>
      <div className='p-3 bg-[#5CB338] text-white rounded-full'>
        <p>{logo}</p>
      </div>
      <div className='text-[#5CB338]'>
        <h1 className='text-sm font-semibold'>{label1}</h1>
        <p className='text-sm font-semibold'>{label2}</p>
      </div>
    </div>
  );
};

export default ContactCard;