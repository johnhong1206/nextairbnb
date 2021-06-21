import banner2 from "../images/banner2.webp";

function Banner2() {
  return (
    <div
      style={{ backgroundImage: `url(${banner2})` }}
      className="relative h-screen object-contain bg-no-repeat"
    >
      <div className="absolute top-16 md:top-48 w-1/2 m-10">
        <h1 className="text-4xl font-bold tracking-wider">
          The Greatest Outdoors
        </h1>
        <p className="mt-1 tracking-wide text-lg ">
          Wishlists curated by Airbnb
        </p>
        <button className=" w-full md:w-2/3 h-12 font-medium text-2xl italic bg-black text-gray-50 outline-none mt-3 rounded-2xl hover:bg-transparent hover:bg-gradient-to-t from-[black]  cursor-pointer">
          Get Inspire
        </button>
      </div>
    </div>
  );
}

export default Banner2;
