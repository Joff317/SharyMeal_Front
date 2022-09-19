import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./Map.css";
// import RecenterAutomatically from "./RecenterAutomatically";
import { API } from '../../utils/variables';
import SubsectionTitle from '../titles/SubsectionTitle';
import MealPrice from "../meals/mealCard/MealPrice";
import RecenterAutomatically from "./RecenterAutomatically";

function Map({ mapCenter, meals }) {

    console.log('meals DES PROPS DE MAP :', meals)

    return (
        <MapContainer center={[mapCenter.lat, mapCenter.lon]} zoom={12} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />


            {
                meals.map(meal => (
                    <>
                    <Marker position={[meal.location.lat, meal.location.lon]}>
                        <Popup>
                            <br/>
                            <SubsectionTitle>{meal.title}</SubsectionTitle>
                            <MealPrice price={meal.price}></MealPrice>
                            <p>{meal.host.name}</p>
                        </Popup>
                    </Marker>
                    </>
                ))  
            }
            <RecenterAutomatically lat={mapCenter.lat} lng={mapCenter.lon} />
        </MapContainer>
    );
}

export default Map;