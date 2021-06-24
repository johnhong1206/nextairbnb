import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { navNearby } from "../features/placeSlice";

function NearbyItem({ nearby }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const navtoLocation = () => {
    dispatch(navNearby(nearby.name));
    router.push(`/location/${nearby.name}`);
  };

  return (
    <div
      onClick={navtoLocation}
      key={nearby.src}
      className=" w-64 relative flex flex-col m-5 bg-white z-30 p-4 shadow-lg cursor-pointer"
    >
      <Image src={nearby.src} width={200} height={200} />

      <div className="mt-2">
        <h3 className="font-medium">{nearby.name}</h3>
        <p className="italic">{nearby.time}</p>
      </div>
    </div>
  );
}

export default NearbyItem;
