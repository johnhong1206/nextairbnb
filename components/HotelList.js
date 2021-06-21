import Image from "next/image";
import Link from "next/link";

function HotelList({ id, name, image, rating, state }) {
  return (
    <div
      key={id}
      className=" relative flex flex-col m-5 bg-white z-30 p-10 shadow-lg"
    >
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {state}
      </p>
      <Link href={`/hotel/${id}`}>
        <Image
          src={image}
          height={300}
          width={300}
          objectFit="contain"
          className={` cursor-pointer  transition duration-300 ease-in transform sm:hover:scale-125`}
        />
      </Link>
      <Link href={`/hotel/${id}`}>
        <h4 className="my-3 text-center text-lg font-medium cursor-pointer">
          {name}
        </h4>
      </Link>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_) => (
            <p>⭐</p>
          ))}
      </div>
    </div>
  );
}

export default HotelList;
