import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUniqueValues } from "../../utils/helpers";

import Header from "../../components/Header";
import LocationList from "../../components/LocationList";
import db from "../../config/firebase";
import {
  addPlace,
  clearFilters,
  selectFiltered,
  selectNearby,
  selectPlaces,
  updateFilters,
} from "../../features/placeSlice";

import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { useRouter } from "next/router";
import Map from "../../components/Map";

function LocationHotel({ hotels, allhotels }) {
  const router = useRouter();

  const dispatch = useDispatch();
  const nearby = useSelector(selectNearby);
  const all_hotel = useSelector(selectPlaces);
  const filterHotel = useSelector(selectFiltered);
  const [activeAmenities, setActiveAmenities] = useState("all");
  const [lastChange, setLastChange] = useState(null);
  const [showClear, setShowClear] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [price, setPrice] = useState(0);
  const [priceMax, setPriceMax] = useState(1);
  const [showResults, setShowResults] = useState(true);

  useEffect(() => {
    dispatch(addPlace(hotels));
  }, [hotels]);

  const amenities = all_hotel ? getUniqueValues(all_hotel, "amenities") : null;

  const filter = (value, item) => {
    setShowClear(true);
    setShowResults(false);
    if (item === "amenities") {
      setActiveAmenities(value);
      //setLastChange("amenities");
      const filtered =
        value !== "all"
          ? all_hotel.filter((hotel) => hotel[item].includes(value))
          : all_hotel;
      dispatch(updateFilters(filtered));
    }
  };

  useEffect(() => {
    const items = ["amenities"];
    const hello = {
      amenities: activeAmenities,
    };

    if (all_hotel) {
      let filtered = all_hotel;

      if (hello[lastChange] !== "all") {
        filtered = all_hotel.filter(
          (hotel) => hotel[lastChange] === hello[lastChange]
        );
      } else {
        items.forEach((x) => {
          filtered =
            x == lastChange && hello[x] !== "all"
              ? filtered.filter((hotel) => hotel[x] === hello[x])
              : filtered;
        });
      }
      items.forEach((x) => {
        if (hello[x] !== "all") {
          filtered =
            x !== lastChange
              ? filtered.filter((hotel) => hotel[x] === hello[x])
              : filtered;
        }
      });
      dispatch(updateFilters(filtered));
    }
  }, [lastChange]);

  useEffect(() => {
    if (!all_hotel) return false;
    const max = all_hotel
      ?.map((hotel) => hotel.price)
      .reduce((a, b) => Math.max(a, b));
    setPriceMax(max);
    setPrice(max);
  }, [all_hotel]);

  const priceFilter = (value) => {
    setShowResults(false);
    setPrice(value);
    const filtered = all_hotel.filter((hotel) => hotel.price <= value);
    dispatch(updateFilters(filtered));
    setShowClear(true);
  };

  const clearAllFilters = () => {
    setShowResults(true);
    dispatch(clearFilters());
    dispatch(addPlace(hotels));
    setShowClear(false);
    setPrice(priceMax);
    setActiveAmenities("all");
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Zong Hong Airbnb || {nearby} </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header hotels={hotels} />
      <main className="flex flex-row px-5">
        <div>
          <div className="p-4">
            <p className=" font-light ml-1">{filterHotel?.length} stays</p>

            <div className="flex items-baseline space-x-4">
              <h1 className="text-3xl font-medium">Stays in {nearby}</h1>
              {showFilter ? (
                <AiOutlineUp
                  onClick={() => setShowFilter(false)}
                  className=" cursor-pointer"
                />
              ) : (
                <AiOutlineDown
                  onClick={() => setShowFilter(true)}
                  className=" cursor-pointer"
                />
              )}
            </div>
            <div className=" mt-6 grid grid-flow-row-dense grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-4">
              {showFilter ? (
                <>
                  {amenities &&
                    amenities.map((value) => (
                      <div
                        key={value}
                        onClick={() => filter(value, "amenities")}
                        className={`flex justify-center p-1 lg:p-2 items-center bg-transparent cursor-pointer hover:shadow-lg bg-gray-200 rounded-full transition transform duration-100 ease-out ${
                          value == activeAmenities &&
                          "  text-black font-bold shadow-inner scale-95 transform translate duration-150"
                        }
                  `}
                      >
                        <p className="text-center">{value}</p>
                      </div>
                    ))}
                </>
              ) : (
                <>
                  {amenities &&
                    amenities.slice(0, 4).map((value) => (
                      <div
                        key={value}
                        onClick={() => filter(value, "amenities")}
                        className={`flex justify-center p-1 lg:p-2 hover:shadow-lg items-center bg-transparent cursor-pointer bg-gray-200 rounded-full transition transform duration-100 ease-out ${
                          value == activeAmenities &&
                          "  text-black font-bold shadow-inner scale-95 transform translate duration-150"
                        }
                    `}
                      >
                        <div>
                          <p className="text-center">{value}</p>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
            <div className=" h-28 p-4 ">
              <h2 className="font-bold text-base text-gray-600 mb-6">Price</h2>
              <div className="mr-10  transition transform duration-100 ease-out">
                <InputRange
                  maxValue={priceMax}
                  minValue={0}
                  value={price}
                  formatLabel={(value) => `RM ${value}`}
                  onChange={priceFilter}
                />
              </div>
            </div>
            {showClear && (
              <div className="p-4">
                <button
                  onClick={clearAllFilters}
                  className="bg-red-400 hover:text-white w-full p-3 rounded-2xl ring-gray-200 text-sm text-gray-800 font-medium scale-95 hover:shadow-lg transition transform duration-100 ease-out
  hover:ring-1 focus:outline-none active:ring-gray-300 "
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>
          <div className="mt-1 p-1">
            {showResults && hotels ? (
              <>
                {hotels.map((hotel) => (
                  <LocationList
                    id={hotel.id}
                    name={hotel.name}
                    city={hotel.city}
                    price={hotel.price}
                    category={hotel.category}
                    image={hotel.image}
                    rating={hotel.rating}
                    state={hotel.state}
                    type={hotel.type}
                    roomSize={hotel.roomSize}
                    guests={hotel.guests}
                    bed={hotel.bed}
                    bath={hotel.bath}
                    amenities={hotel.amenities}
                  />
                ))}
              </>
            ) : (
              <>
                {!showResults && !!filterHotel?.length ? (
                  filterHotel.map((hotel) => (
                    <LocationList
                      id={hotel.id}
                      name={hotel.name}
                      city={hotel.city}
                      price={hotel.price}
                      category={hotel.category}
                      image={hotel.image}
                      rating={hotel.rating}
                      state={hotel.state}
                      type={hotel.type}
                      roomSize={hotel.roomSize}
                      guests={hotel.guests}
                      bed={hotel.bed}
                      bath={hotel.bath}
                      amenities={hotel.amenities}
                    />
                  ))
                ) : (
                  <>Dont Have Result</>
                )}
              </>
            )}

            <div className="pb-10" />
          </div>
        </div>
        <div className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map hotels={hotels} />
        </div>
      </main>
    </div>
  );
}

export default LocationHotel;

export async function getServerSideProps(context) {
  const ref = db.collection("hotel").where("city", "==", context.query.id);
  const all = db.collection("hotel");

  const hotelRes = await ref.get();
  const hotels = hotelRes.docs.map((hotel) => ({
    id: hotel.id,
    ...hotel.data(),
  }));

  const allhotelRes = await all.get();
  const allhotels = allhotelRes.docs.map((hotel) => ({
    id: hotel.id,
    ...hotel.data(),
  }));

  return {
    props: {
      hotels: hotels,
      allhotels: allhotels,
    },
  };
}
