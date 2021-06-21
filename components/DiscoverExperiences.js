import disexp1 from "../images/disexp1.webp";
import disexp2 from "../images/disexp2.jpg";
import disexp3 from "../images/disexp3.jpg";
import Image from "next/image";

function DiscoverExperiences() {
  const discoverExpData = [
    {
      name: "Outdoor getaways",
      src: `${disexp1}`,
      description: "Travel from home with Online Experience.",
    },
    {
      name: "Unique stays",
      src: `${disexp2}`,
      description: "Live,interactive activities led by Hosts.",
    },
    {
      name: "Entire homes",
      src: `${disexp3}`,
      description: "Local things to do, Wherever you are.",
    },
  ];
  return (
    <div className="flex flex-col m-5 z-30 p-10  md:-mt-16">
      <div className="p-4 mx-auto ">
        <h1 className=" font-medium text-black  text-center text-lg md:text-xl lg:text-5xl">
          Discover Experiences
        </h1>
      </div>
      <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
        {discoverExpData.map((discoverExp) => (
          <div
            key={discoverExp.src}
            className="p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50"
          >
            <Image
              src={discoverExp.src}
              height={1920}
              width={1920}
              layout="responsive"
              className=" rounded-2xl"
            />
            <div className="mt-2">
              <h3 className="font-medium text-xl ml-2">{discoverExp.name}</h3>
              <p className=" font-thin text-small ml-2">
                {discoverExp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscoverExperiences;
