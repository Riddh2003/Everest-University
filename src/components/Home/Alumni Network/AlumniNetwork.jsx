import React from "react";
import AlumniCard from "./AlumniCard"; // Importing the separate AlumniCard component

const alumniData = [
  {
    name: "John Smith",
    classYear: "Class of 2020",
    title: "Senior Developer at Tech Corp",
    quote: "The foundation I received at SilverPeak University has been instrumental in my success."
  },
  {
    name: "Maria Garcia",
    classYear: "Class of 2019",
    title: "CEO, Innovation Labs",
    quote: "My journey from student to entrepreneur started right here on this campus."
  },
  {
    name: "David Kumar",
    classYear: "Class of 2018",
    title: "Research Scientist, Global Tech",
    quote: "The research opportunities here shaped my career in ways I never imagined."
  }
];

const AlumniNetwork = () => {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl text-[#5CB338] font-bold text-center mb-6">Alumni Network</h2>
        <p className="text-center text-[#5CB338] mb-8 max-w-2xl mx-auto">
          Join our growing network of successful graduates
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {alumniData.map((alumni, index) => (
            <AlumniCard key={index} {...alumni} />
          ))}
        </div>
      </div>
      <br id="Contact" />
    </section>
  );
};

export default AlumniNetwork;
