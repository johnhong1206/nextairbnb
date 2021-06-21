import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

function SuggestHotel({
  id,
  rating,
  image,
  bed,
  bath,
  type,
  guests,
  name,
  price,
  hotelid,
}) {
  console.log("hotelid", hotelid);
  if (hotelid === id) return false;
  return (
    <div key={id} className="m-1 bg-white z-30 p-4 shadow-lg">
      <Link href={`/hotel/${id}`}>
        <Image
          src={image[0]}
          height={300}
          width={300}
          objectFit="contain"
          className={` w-full rounded-2xl cursor-pointer transition duration-300 ease-in transform sm:hover:scale-125`}
        />
      </Link>

      <div className="flex flex-row items-center justify-center space-x-1">
        <div className="flex items-center">
          <p className="">{rating}</p>
          <AiFillStar className="text-pink-600 w-4 h-4" />
        </div>
        <div className="flex space-x-1 text-sm">
          <div className="flex space-x-1">
            <p>{guests}</p>
            <p className="font-medium">guests</p>
          </div>
          <p>.</p>
          <div>
            <p className="font-medium">{type}</p>
          </div>
          <p>.</p>
          <div className="flex space-x-1">
            <p>{bed}</p>
            <p className="font-medium">bed</p>
          </div>
          <p>.</p>
          <div className="flex space-x-1">
            <p>{bath}</p>
            <p className="font-medium">bath</p>
          </div>
        </div>
      </div>

      <h1 className="mt-2 text-center font-medium line-clamp-1 ">{name}</h1>
      <div className="mt-2 flex item-center justify-center space-x-1">
        <p className="font-medium text-xl md:text-lg">RM {price}</p>
        <p className="font-medium text-xl md:text-lg">/</p>
        <p className="font-medium text-xl md:text-lg">Night</p>
      </div>
    </div>
  );
}

export default SuggestHotel;
