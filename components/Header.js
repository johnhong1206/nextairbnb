import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import db from "../config/firebase";

import { useRouter } from "next/router";
import Logo from "../images/Airbnb-logo.jpg";
import {
  AiOutlineGlobal,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import { clearFilters, clearNearby } from "../features/placeSlice";
import { useDispatch } from "react-redux";
function Header({ hotels }) {
  const dispatch = useDispatch();
  console.log("hotels.city", hotels.city);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults(hotels.filter((hotel) => hotel.city.includes(searchTerm)));
  };

  const navtoHome = () => {
    router.replace("/");
    dispatch(clearFilters());
    dispatch(clearNearby());
  };

  const add = () => {
    db.collection("hotel").add({
      amenities: [],
      category: "",
      city: "",
      guests: Number(),
      bath: Number(),
      bed: Number(),
      price: Number(),
      image: [],
      description: "",
      rating: Number(),
      name: "",
      state: "",
      title: "",
      type: "",
      live: "",
    });
  };

  return (
    <div className="bg-white p-2">
      <div className="flex justify-between">
        <div onClick={navtoHome} className=" cursor-pointer">
          <Image
            className="object-contain"
            src={Logo}
            width={100}
            height={100}
          />
        </div>
        <div className="hidden lg:flex">
          <div className="flex items-center space-x-6 cursor-pointer ml-20">
            <div className="hover:underline">
              <h3 className="font-medium">Place to Stay</h3>
            </div>
            <div className="hover:underline">
              <h3 className="font-medium">Experience</h3>
            </div>
            <div className="hover:underline">
              <h3 className="font-medium">Online Experience</h3>
            </div>
            <div onClick={add} className="hover:underline">
              <h3 className="font-medium">Add</h3>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-0 md:space-x-4">
          <div className="hidden lg:flex cursor-pointer hover:bg-gray-400 rounded-full p-4">
            <h3>Become Host</h3>
          </div>
          <div className="hidden lg:flex cursor-pointer hover:text-pink-600">
            <AiOutlineGlobal className="h-8 w-8" />
          </div>
          <div className="flex items-center  justify-evenly w-24 h-12 bg-gray-300 p-2 rounded-full shadow-inner relative cursor-pointer">
            <AiOutlineMenu className="h-4 w-4" />
            <Image
              className="rounded-full cursor-pointer"
              src={`https://lh3.googleusercontent.com/ogw/ADGmqu8N43LEmhDossVRfXffxbHyCf2Oq8AWAtHZroO6yQ=s32-c-mo`}
              width="30"
              height="30"
              layout="fixed"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center md:-mt-24 mr-10 ml-10 lg:ml-0 lg:-mt-8 lg:mr-8">
        <div className="relative flex w-full md:w-2/3 p-2 md:p-4 bg-gray-100 rounded-full">
          <input
            type="text"
            onMouseOver={() => setShowResults(true)}
            onBlur={() => setShowResults(false)}
            onFocus={() => setShowResults(true)}
            value={searchTerm}
            onChange={handleSearch}
            className="w-full outline-none bg-transparent cursor-pointer h-full rounded-l-md focus:outline-none"
            placeholder="Where are you going?"
          />
          <div className="bg-pink-600 rounded-full p-1 cursor-pointer">
            <AiOutlineSearch className="w-8 h-8" />
            {showResults && (
              <div
                onClick={() => setShowResults(true)}
                onMouseOver={() => setShowResults(true)}
                onMouseLeave={() => setShowResults(false)}
                className="absolute w-full bg-white rounded-md bottom-0 left-0 "
                style={{
                  transform: "translateY(100%)",
                  height: "auto",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                <div
                  key={Math.random()}
                  className="p-2 mt-2 border-b-2 rounded-md border-gray-100 bg-gray-50 hover:bg-gray-400 group"
                >
                  <Link href={`/location`}>
                    <h5 className="font-medium text-sm text-gray-600 group-hover:text-white ">
                      All
                    </h5>
                  </Link>
                  <Link href={`/location`}>
                    <p className="text-xs text-gray-400 group-hover:text-white uppercase">
                      all
                    </p>
                  </Link>
                </div>
                {!!searchResults.length ? (
                  searchResults.map(({ id, city, name }) => (
                    <div
                      key={Math.random()}
                      className="p-2 mt-2 border-b-2 rounded-md border-gray-100 bg-gray-50 hover:bg-gray-400 group"
                    >
                      <Link href={`/product/${id}`}>
                        <h5 className="font-medium text-sm text-gray-600 group-hover:text-white ">
                          {name}
                        </h5>
                      </Link>
                      <Link href={`/product/${id}`}>
                        <p className="text-xs text-gray-400 group-hover:text-white uppercase">
                          {city}
                        </p>
                      </Link>
                    </div>
                  ))
                ) : (
                  <>
                    {searchTerm && (
                      <p className="text-xs text-gray-400 text-center py-2">
                        No hotel found
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
