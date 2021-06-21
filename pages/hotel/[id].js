import Header from "../../components/Header";
import HotelDetails from "../../components/HotelDetails";
import db from "../../config/firebase";

function Hotel({ hotels, hotelDetails }) {
  return (
    <div>
      <Header hotels={hotels} />
      <main className="mx-auto max-w-screen-2xl">
        <HotelDetails
          hotelid={hotelDetails.id}
          name={hotelDetails.name}
          rating={hotelDetails.rating}
          city={hotelDetails.city}
          state={hotelDetails.state}
          image={hotelDetails.image}
          description={hotelDetails.description}
          category={hotelDetails.category}
          guests={hotelDetails.guests}
          type={hotelDetails.type}
          bed={hotelDetails.bed}
          bath={hotelDetails.bath}
          price={hotelDetails.price}
          amenities={hotelDetails.amenities}
        />
      </main>
    </div>
  );
}

export default Hotel;

export async function getServerSideProps(context) {
  const ref = db.collection("hotel").where("city", "==", context.query.id);
  const hotelRes = await ref.get();
  const hotels = hotelRes.docs.map((hotel) => ({
    id: hotel.id,
    ...hotel.data(),
  }));

  const hotelDetailsRef = db.collection("hotel").doc(context.query.id);
  const hotelDetailsRes = await hotelDetailsRef.get();

  const hotelDetails = {
    id: hotelDetailsRes.id,
    ...hotelDetailsRes.data(),
  };

  return {
    props: {
      hotels: hotels,
      hotelDetails: hotelDetails,
    },
  };
}
