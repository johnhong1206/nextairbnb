import banner3 from "../images/banner3.jpg";

function BecomeHost() {
  return (
    <div
      style={{ backgroundImage: `url(${banner3})` }}
      className="relative h-screen object-contain bg-no-repeat"
    >
      <div className="absolute top-16 md:top-48 w-1/2 m-10">
        <h1 className="text-4xl font-bold text-white">Beome a Host</h1>
        <p className="mt-1 text-lg text-white">
          Earn extra income and unlock new opportunities by sharing your space
        </p>
        <button className=" w-full md:w-2/3 h-12 font-medium text-2xl italic bg-white text-gray-900 outline-none mt-3 rounded-2xl hover:bg-transparent hover:bg-gradient-to-t  hover:text-white cursor-pointer">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default BecomeHost;
