import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { navNearby } from "../features/placeSlice";

function LiveanyWhereItem({ anywhere }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const navtoLocation = () => {
    dispatch(navNearby(anywhere.name));
    router.push(`/live/${anywhere.name}`);
  };

  return (
    <div
      onClick={navtoLocation}
      key={anywhere.src}
      className="p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50"
    >
      <Image
        src={anywhere.src}
        height={1920}
        width={1920}
        layout="responsive"
        className=" rounded-2xl"
      />

      <div className="mt-2">
        <h3 className="font-medium text-xl ml-2">{anywhere.name}</h3>
      </div>
    </div>
  );
}

export default LiveanyWhereItem;
