import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Fade from "react-reveal/Fade";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import dynamic from "next/dynamic";

//icons
import { AiFillStar } from "react-icons/ai";

//components
const SuggestHotel = dynamic(() => import("./SuggestHotel"));

//firebase
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../config/firebase";

function HotelDetails({
  hotelDetails,
  name,
  rating,
  city,
  state,
  image,
  description,
  category,
  guests,
  type,
  bed,
  bath,
  price,
  amenities,
  hotelid,
  lat,
  long,
}) {
  const [showAmenities, showsetShowAmenities] = useState(false);
  const [activeImage, setActiveImage] = useState(image[0]);
  const [availableDate, setAvailableDate] = useState(
    availableDate ? availableDate : ""
  );
  console.log("hotelDetails", hotelDetails);

  const suggestHotelRef = db.collection("hotel").where("city", "==", city);

  const [suggestHotels] = useCollection(city && suggestHotelRef);
  console.log(hotelid);

  const coordinates = { latitud: lat, longitude: long };

  console.log("coordinates", coordinates);
  const center = getCenter(coordinates);

  console.log("center.lat", center);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: lat,
    longitude: long,
    zoom: 11,
  });

  return (
    <>
      <Fade bottom>
        <div className="">
          <div className=" max-w-screen-xl mx-auto flex items-center space-x-6 mt-10 ml-10">
            <div className="flex items-center space-x-1 ">
              <p className="text-2xl">{rating}</p>
              <AiFillStar className="text-pink-600 w-6 h-6" />
            </div>

            <div className="flex items-center space-x-2">
              <Link href={`/location/${city}`}>
                <p className="cursor-pointer underline font-medium hover:text-pink-600">
                  {city}
                </p>
              </Link>
              ,
              <Link href={`/state/${state}`}>
                <p className="cursor-pointer underline font-medium hover:text-pink-600">
                  {state}
                </p>
              </Link>
              ,
              <p className="cursor-pointer underline font-medium hover:text-pink-600">
                Malaysia
              </p>
            </div>
          </div>
          <div className="max-w-screen-xl mx-auto mt-5 border-b-2 bg-gray-50 shadow-xl">
            <div className="flex flex-wrap pt-4 ">
              <div className="px-5 w-full md:w-7/12">
                <div className="w-full">
                  <Image
                    className={
                      "w-full rounded-lg cursor-pointer transition duration-300 ease-in transform sm:hover:scale-125"
                    }
                    width={700}
                    height={700}
                    objectFit="contain"
                    src={activeImage}
                    alt=""
                  />
                </div>
                <div className="flex items-center -mt-10 lg:-mt-20">
                  {image &&
                    image.map((image) => (
                      <div
                        className="mr-3 mb-3 cursor-pointer"
                        onClick={() => setActiveImage(image)}
                      >
                        <Image
                          className="rounded-md w-full  cursor-pointer transition duration-300 ease-in transform sm:hover:scale-125"
                          width={100}
                          height={100}
                          objectFit="cover"
                          src={image}
                          alt=""
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="px-5 mb-10 w-full md:w-5/12 space-y-5">
                <h1 className="my-2 lg:mt-20  text-2xl md:text-4xl">{name}</h1>

                <div className="text-lg lg:text-2xl font-medium flex items-center justify-between">
                  <h3>Entire {category} hosted by Zong Hong</h3>
                  <Image
                    className="rounded-full cursor-pointer"
                    src={`https://lh3.googleusercontent.com/ogw/ADGmqu8N43LEmhDossVRfXffxbHyCf2Oq8AWAtHZroO6yQ=s32-c-mo`}
                    width="60"
                    height="60"
                    layout="fixed"
                  />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex space-x-1">
                    <p className="text-base lg:text-lg">{guests}</p>
                    <p className="font-medium text-base lg:text-lg">Guests</p>
                  </div>
                  <p className=" font-bold text-lg">.</p>
                  <div>
                    <p className="font-medium text-base lg:text-lg">{type}</p>
                  </div>
                  <p className=" font-bold text-lg">.</p>
                  <div className="flex space-x-1">
                    <p className="text-base lg:text-lg">{bed}</p>
                    <p className="font-medium text-base lg:text-lg">Bed</p>
                  </div>
                  <p className=" font-bold text-lg">.</p>
                  <div className="flex space-x-1">
                    <p className="text-base lg:text-lg">{bath}</p>
                    <p className="font-medium text-base lg:text-lg">Bath</p>
                  </div>
                </div>
                <div className="flex flex-col items-center bg-white mt-10 shadow-lg p-4">
                  <div className="flex items-center justify-evenly w-full border-b-2 mb-8">
                    <div className="flex space-x-2 text-2xl">
                      <h1>RM {price}</h1>
                      <p>/</p>
                      <h1 className="font-bold">Night</h1>
                    </div>
                    <div className="flex items-center space-x-1 ">
                      <p className="text-2xl">{rating}</p>
                      <AiFillStar className="text-pink-600 w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-20">
                    <div className="mb-4 shadow-lg p-2">
                      <h1 className="text-xl">Available Dates:</h1>
                      <input
                        className="text-black h-10 cursor-pointer"
                        type="date"
                        name="date"
                        value={availableDate}
                        onChange={(e) => setAvailableDate(e.target.value)}
                      ></input>
                    </div>
                    <div className="mb-4 shadow-lg p-2">
                      <h1 className="text-xl">CheckOut Dates:</h1>
                      <input
                        className="text-black h-10 cursor-pointer"
                        type="date"
                        name="date"
                        value={availableDate}
                        onChange={(e) => setAvailableDate(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="p-2 flex space-x-2 items-center justify-center w-full">
                    <h1 className="text-xl">Guests</h1>
                    <select
                      name="time"
                      className="text-black h-10 cursor-pointer flex-grow"
                    >
                      <option value="0">1 Guest</option>
                      <option value="1">2 Guests</option>
                      <option value="2">3 Guests</option>
                    </select>
                  </div>
                  <div className="mt-1 w-full">
                    <h1 className="p-4 bg-pink-400 w-full rounded-2xl cursor-pointer font-medium hover:bg-white hover:text-pink-400 hover:shadow-2xl">
                      Check Avaibility
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 max-w-screen-xl mx-auto mt-5 bg-white border-b-2">
            <p className="mb-10">{description}</p>
          </div>
          <div className="p-2 max-w-screen-xl mx-auto mt-5 bg-white border-b-2">
            <h2 className=" font-bold text-xl">Amenities</h2>
            <div className="mt-2 grid grid-flow-row-dense grid-cols-2 p-4 space-y-8">
              {showAmenities &&
                amenities.map((amenitie) => (
                  <p className=" font-light italic">{amenitie}</p>
                ))}
              {!showAmenities &&
                amenities
                  .slice(0, 6)
                  .map((amenitie) => (
                    <p className=" font-light italic">{amenitie}</p>
                  ))}
              {showAmenities ? (
                <button
                  onClick={() => showsetShowAmenities(false)}
                  className="w-full p-4 rounded-2xl  border-gray-400"
                >
                  show less
                </button>
              ) : (
                <button
                  onClick={() => showsetShowAmenities(true)}
                  className="w-full p-4 rounded-2xl  border-gray-400 "
                >
                  show all {amenities.length} Amenitie
                </button>
              )}
            </div>
          </div>
          <div className="p-2 max-w-screen-xl mx-auto mt-5 bg-white border-b-2">
            <h2 className=" font-bold text-xl">More places to stay </h2>
            <div className="p-1 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {suggestHotels?.docs.slice(0, 4).map((hotel) => (
                <SuggestHotel
                  id={hotel.id}
                  rating={hotel.data().rating}
                  image={hotel.data().image}
                  bed={hotel.data().bed}
                  bath={hotel.data().bath}
                  type={hotel.data().type}
                  name={hotel.data().name}
                  guests={hotel.data().guests}
                  price={hotel.data().price}
                  hotelid={hotelid}
                />
              ))}
            </div>
          </div>
          <div className="h-[40vh] xl:min-w-[600px] relative">
            <ReactMapGL
              mapStyle="mapbox://styles/zonghong/cks1a85to4kqf18p6zuj5zdx6"
              mapboxApiAccessToken={process.env.mapbox_key}
              {...viewport}
              onViewportChange={(nextViewport) => setViewport(nextViewport)}
            >
              <Marker
                longitude={long}
                latitude={lat}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <p
                  className="cursor-pointer text-2xl animate-bounce relative"
                  aria-label="push-pin"
                >
                  📌
                </p>
                <div
                  style={{
                    "background-image":
                      "linear-gradient(rgb(0,0,0,0.5),rgb(0,0,0,0.5))",
                  }}
                  className="absolute -top-4 ml-5 w-32 text-center  text-white rounded-full cursor-pointer hover:bg-red-400"
                >
                  We are here
                </div>
              </Marker>
            </ReactMapGL>
            <h2 className="text-center font-light italic">
              Exact location provided after booking
            </h2>
          </div>
          <div className="pb-10" />
        </div>
      </Fade>
    </>
  );
}

export default HotelDetails;
