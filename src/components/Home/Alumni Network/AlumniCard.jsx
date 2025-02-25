import React from "react";

const AlumniCard = ({ name, classYear, title, quote }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-transform duration-300 transform hover:scale-105">
      <div className="w-16 h-16 mx-auto mb-4 bg-[#5CB338] rounded-full flex items-center justify-center">
        <span className="text-xl font-bold text-white">{name[0]}</span>
      </div>
      <h3 className="text-xl font-bold text-[#5CB338] mb-1">{name}</h3>
      <p className="text-sm text-[#5CB338] mb-2">{classYear}</p>
      <p className="text-[#5CB338] font-medium mt-2">{title}</p>
      <p className="text-[#5CB338] italic mt-4">"{quote}"</p>
    </div>
  );
};

export default AlumniCard;
