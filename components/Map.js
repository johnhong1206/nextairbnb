import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import { useRouter } from "next/router";

function Map({ hotels }) {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = hotels.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 12,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/zonghong/cks1a85to4kqf18p6zuj5zdx6"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {hotels.map((result, idx) => (
        <div key={idx}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              className="cursor-pointer text-2xl animate-bounce relative"
              aria-label="push-pin"
              onClick={() => setSelectedLocation(result)}
            >
              📌
            </p>
            <div
              onClick={() => setSelectedLocation(result)}
              style={{
                "background-image":
                  "linear-gradient(rgb(0,0,0,0.5),rgb(0,0,0,0.5))",
              }}
              className="absolute -top-4 ml-5 w-16 text-center  text-white rounded-full cursor-pointer hover:bg-red-400"
            >
              RM{result.price}
            </div>
          </Marker>
          {selectedLocation.long === result.long ? (
            <div>
              <Popup
                onClick={() => router.push(`/hotel/${result.id}`)}
                closeOnClick={false}
                onClose={() => setSelectedLocation({})}
                latitude={result.lat}
                longitude={result.long}
              >
                <div onClick={() => router.push(`/hotel/${result.id}`)}>
                  <p
                    onClick={() => router.push(`/hotel/${result.id}`)}
                    className="font-bold hover:underline"
                  >
                    {result.name}
                  </p>
                </div>
              </Popup>
            </div>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
