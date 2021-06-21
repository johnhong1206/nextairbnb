import HotelList from "./HotelList";

function Place({ hotels }) {
  return (
    <div className="mx-auto max-w-screen p-4 mt-16">
      <h1>Explore Nearby</h1>
      <div className="mt-4 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto ">
        {hotels.map((hotel) => (
          <HotelList
            id={hotel.id}
            name={hotel.name}
            image={hotel.image}
            city={hotel.city}
            category={hotel.category}
            rating={hotel.rating}
            state={hotel.state}
          />
        ))}
      </div>
    </div>
  );
}

export default Place;
