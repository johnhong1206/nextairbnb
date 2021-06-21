import Image from "next/image";
import Link from "next/link";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Currency from "react-currency-formatter";
import { AiFillStar } from "react-icons/ai";

function LocationList({
  id,
  name,
  city,
  image,
  rating,
  state,
  type,
  guests,
  bed,
  bath,
  price,
  category,
  amenities,
}) {
  return (
    <>
      <Link href={`/hotel/${id}`}>
        <div className="flex flex-col md:flex-row md:relative shadow-md p-4 mt-10 bg-white cursor-pointer hover:opacity-70">
          <Link href={`/hotel/${id}`}>
            <div className="w-full md:w-1/3">
              <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={true}
                showThumbs={false}
                interval={5000}
              >
                {image.map((image) => (
                  <Image src={image} width="400" height="300" />
                ))}
              </Carousel>
            </div>
          </Link>

          <div className="w-full md:w-2/3 p-2">
            <div className="">
              <p className="text-gray-600">
                Entire {category} in {city}
              </p>
              <div className="flex items-baseline justify-between ">
                <h1 className="font-medium text-xl lg:text-3xl line-clamp-1 lg:line-clamp-none">
                  {name}
                </h1>
                <div className="flex lg:hidden items-center">
                  <p className="text-xl md:text-lg">{rating}</p>
                  <AiFillStar className="text-pink-600 w-6 h-6 md:w-4 md:h-4" />
                </div>

                <div className="flex lg:hidden space-x-1">
                  <p className="font-medium text-xl md:text-lg">RM {price}</p>
                  <p className="font-medium text-xl md:text-lg">/</p>
                  <p className="font-medium text-xl md:text-lg">Night</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 mt-2">
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
            <div className="mt-2 grid grid-flow-row-dense grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {amenities.slice(0, 4).map((amenitie) => (
                <p className=" font-light italic">{amenitie}</p>
              ))}
            </div>
            <div className="hidden lg:flex md:absolute md:bottom-4">
              <div className="flex items-center ">
                <p className="text-2xl">{rating}</p>
                <AiFillStar className="text-pink-600 w-8 h-8" />
              </div>
            </div>

            <div className="hidden lg:flex md:absolute md:bottom-4 md:right-10">
              <p className="font-medium text-2xl">RM {price}</p>
              <p className="font-medium text-2xl">/</p>
              <p className="font-medium text-2xl">Night</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default LocationList;
