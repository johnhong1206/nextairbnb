import petalingimg from "../images/petaling.jpg";
import johorimg from "../images/johor.jpg";
import portdicksonimg from "../images/portdickson.jpg";
import georgetownimg from "../images/georgetown.jpg";
import ipohimg from "../images/ipoh.jpg";
import shahslamimg from "../images/shahalam.jpg";
import putrajayaimg from "../images/putrayaja.jpg";
import kuantanimg from "../images/kuantan.jpg";
import NearbyItem from "./NearbyItem";
import { useRouter } from "next/router";

function Nearby() {
  const router = useRouter();

  const nearbyData = [
    {
      name: "Petaling Jaya",
      src: `${petalingimg}`,
      time: `30 minute drive`,
    },
    {
      name: "Johor Bahru",
      title: "Petaling Jaya",
      src: `${johorimg}`,
      time: `4.5 Hour drive`,
    },
    {
      name: "Port Dickson",
      src: `${portdicksonimg}`,
      time: `1.5 Hour drive`,
    },
    {
      name: "George Town",
      src: `${georgetownimg}`,
      time: `4.5 Hour drive`,
    },
    {
      name: "Ipoh",
      src: `${ipohimg}`,
      time: `3 Hour drive`,
    },
    {
      name: "Shah Alam",
      src: `${shahslamimg}`,
      time: `15 minute drive`,
    },
    {
      name: "Putrajaya",
      src: `${putrajayaimg}`,
      time: `45 minute drive`,
    },
    {
      name: "Cameron Highlands",
      src: `${kuantanimg}`,
      time: `3.5 hour drive`,
    },
  ];

  return (
    <div className=" relative flex flex-col m-5 z-30 p-10 -mt-12 md:-mt-56 lg:-mt-96 group">
      <div
        onClick={() => router.push("/hotel")}
        className="relative p-4 w-1/3 mx-auto md:bg-gradient-to-t md:from-[black] group-hover:from-[lightgray]"
      >
        <h1 className=" font-medium text-black md:text-gray-100 text-center text-lg md:text-xl lg:text-2xl cursor-pointer group-hover:underline">
          Explore Nearby
        </h1>
      </div>

      <div className="p-10 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto -mt-16 lg:-mt-0 ">
        {nearbyData.map((nearby) => (
          <NearbyItem nearby={nearby} />
        ))}
      </div>
    </div>
  );
}

export default Nearby;
