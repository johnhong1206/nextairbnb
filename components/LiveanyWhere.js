import outdoor from "../images/outdoor.webp";
import homes from "../images/homes.jpg";
import unique from "../images/unique.jpg";
import pets from "../images/pets.jpg";

import LiveanyWhereItem from "./LiveanyWhereItem";

function LiveanyWhere() {
  const anywhereData = [
    {
      name: "Outdoor getaways",
      src: `${outdoor}`,
    },
    {
      name: "Unique stays",
      src: `${unique}`,
    },
    {
      name: "Entire homes",
      src: `${homes}`,
    },
    {
      name: "Pets Allowed",
      src: `${pets}`,
    },
  ];

  return (
    <div className="flex flex-col m-5 z-30 p-10 -mt-24 md:-mt-16">
      <div className="p-4 w-1/3 mx-auto ">
        <h1 className="font-medium text-black  text-center text-lg md:text-xl lg:text-5xl">
          Live Any where
        </h1>
      </div>

      <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {anywhereData.map((anywhere) => (
          <LiveanyWhereItem anywhere={anywhere} />
        ))}
      </div>
    </div>
  );
}

export default LiveanyWhere;
