import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import * as L from "leaflet";
import "./Map.css";
import marker from "../../assets/images/marker.png";
// import RecenterAutomatically from "./RecenterAutomatically";
import { API } from "../../utils/variables";
import SubsectionTitle from "../titles/SubsectionTitle";
import MealPrice from "../meals/mealCard/MealPrice";
import RecenterAutomatically from "./RecenterAutomatically";
import SectionTitle from "../titles/SectionTitle";
import Button from "../actions/Button";
import { Link } from "react-router-dom";

function Map({ mapCenter, meals }) {
  const LeafIcon = L.Icon.extend({
    options: {},
  });

  const icon = new LeafIcon({
    iconUrl: marker,
    popupAnchor: [-20, -20],
    iconAnchor: [38, 27],
  });

  return (
    <>
      {mapCenter.city === "" ? (
        <div className="my-10">
          <SectionTitle>Renseigne une ville</SectionTitle>
          <br />
          <span
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4"
          >
            <Button showText={true}>D'accord !</Button>
          </span>
        </div>
      ) : (
        <MapContainer
          center={[mapCenter.lat, mapCenter.lon]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {meals.map((meal, index) => (
            <div key={index}>
              <Marker
                position={[meal.location.lat, meal.location.lon]}
                icon={icon}
              >
                <Popup>
                  <Link
                    to={`meals/${meal.id}`}
                    className="flex items-center gap-4"
                  >
                    {meal.image_urls && (
                      <img
                        className="w-24 rounded-lg"
                        src={meal.image_urls[0]}

                        alt="meal"

                      />
                    )}

                    <div className="my-2 text-black">
                      <SubsectionTitle>{meal.title}</SubsectionTitle>
                      <p> {meal.description} </p>
                      <p>
                        {" "}
                        by,{" "}
                        {meal.host.name !== ""
                          ? meal.host.name
                          : meal.host.email}
                      </p>
                    </div>
                  </Link>
                  <MealPrice price={meal.price}></MealPrice>
                </Popup>
              </Marker>
            </div>
          ))}
          <RecenterAutomatically lat={mapCenter.lat} lng={mapCenter.lon} />
        </MapContainer>
      )}
    </>
  );
}

export default Map;
