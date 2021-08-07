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
import { FiUsers } from "react-icons/fi";
import {
  clearFilters,
  clearNearby,
  selectPlaces,
} from "../features/placeSlice";
import { useDispatch, useSelector } from "react-redux";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

function Header({ hotels }) {
  const dispatch = useDispatch();
  const all_hotel = useSelector(selectPlaces);
  const dataList = all_hotel;

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const excludeColumns = ["id", "color"];
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [pickDate, setPickDate] = useState(false);
  const [pickLocation, setPickLocation] = useState(true);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const resetInput = () => {
    setSearchTerm("");
    setPickDate(false);
    setPickLocation(true);
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const handleChange = (value) => {
    setSearchTerm(value);
    filterData(value);
  };
  const search = () => {
    if (!searchTerm) return false;
    router.push(`/location/${searchTerm}`);
  };

  const filterData = (value) => {
    const Value = value.toLocaleUpperCase().trim();
    if (Value === "") setSearchResults(dataList);
    else {
      const filteredData = dataList.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLocaleUpperCase().includes(Value)
        );
      });
      setSearchResults(filteredData);
    }
  };

  console.log(searchResults);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults(hotels.filter((hotel) => hotel.city.includes(searchTerm)));
  };

  const navtoHome = () => {
    router.replace("/");
    dispatch(clearFilters());
    dispatch(clearNearby());
  };

  const toggleLocation = () => {
    setPickDate(false);
    setPickLocation(true);
  };
  const toggleDate = () => {
    setPickDate(true);
    setPickLocation(false);
  };

  return (
    <header className="bg-white p-2 sticky top-0 z-50 shadow-md">
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
            <div onClick={toggleLocation} className="hover:underline">
              <h3 className={`font-medium ${pickLocation && "text-red-400"}`}>
                Place to Stay
              </h3>
            </div>
            <div onClick={toggleDate} className="hover:underline">
              <h3 className={`font-medium ${pickDate && "text-red-400"}`}>
                Pick a Date
              </h3>
            </div>
            <div className="hover:underline">
              <h3 className="font-medium">Experience</h3>
            </div>
            <div className="hover:underline">
              <h3 className="font-medium">Online Experience</h3>
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
            onChange={(e) => handleChange(e.target.value)}
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
                className="absolute w-full bg-white rounded-md bottom-0 left-0 z-50"
                style={{
                  transform: "translateY(100%)",
                  height: "auto",
                  maxHeight: "450px",
                  overflowY: "auto",
                }}
              >
                {pickDate && (
                  <div className=" flex flex-col col-span-3 mx-auto">
                    <DateRangePicker
                      ranges={[selectionRange]}
                      minDate={new Date()}
                      rangeColors={["#FD5861"]}
                      onChange={handleSelect}
                    />
                    <div className="flex items-center border-b mb-4">
                      <h2 className="text-2xl flex-grow font-semibold">
                        Number of Guest
                      </h2>
                      <FiUsers className="w-5 h-5" />
                      <input
                        value={noOfGuests}
                        onChange={(e) => setNoOfGuests(e.target.value)}
                        type="number"
                        min={1}
                        className="w-12 pl-2 text-lg outline-none text-red-400"
                      />
                    </div>
                    <div className="flex">
                      <button
                        onClick={resetInput}
                        className="flex-grow text-gray-400 outline-none"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={search}
                        className="flex-grow text-red-400 outline-none"
                      >
                        Search
                      </button>
                    </div>
                    <div className="pb-8" />
                  </div>
                )}

                {pickLocation && !!searchResults.length ? (
                  searchResults.map(({ id, city, name }) => (
                    <div
                      key={Math.random()}
                      className="p-2 mt-2 border-b-2 rounded-md border-gray-100 bg-gray-50 hover:bg-gray-400 group"
                    >
                      <Link href={`/hotel/${id}`}>
                        <h5 className="font-medium text-sm text-gray-600 group-hover:text-white ">
                          {name}
                        </h5>
                      </Link>
                      <Link href={`/hotel/${id}`}>
                        <p className="text-xs text-gray-400 group-hover:text-white uppercase">
                          {city}
                        </p>
                      </Link>
                    </div>
                  ))
                ) : (
                  <>
                    {searchTerm && (
                      <>
                        {pickLocation ? (
                          <p className="text-xs text-gray-400 text-center py-2">
                            No hotel found
                          </p>
                        ) : (
                          <div className="pb-10" />
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
