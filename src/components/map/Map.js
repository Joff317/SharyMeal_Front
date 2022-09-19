import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./Map.css";
// import RecenterAutomatically from "./RecenterAutomatically";
import { API } from '../../utils/variables';
import SubsectionTitle from '../titles/SubsectionTitle';
import MealPrice from "../meals/mealCard/MealPrice";
import RecenterAutomatically from "./RecenterAutomatically";
import SectionTitle from "../titles/SectionTitle";
import Button from "../actions/Button";

function Map({ mapCenter, meals }) {

    console.log('meals DES PROPS DE MAP :', meals)

    return (


        <>
        {
            mapCenter.city === "" ?
                <div className="my-10">
                    <SectionTitle>Renseigne une ville</SectionTitle>
                    <br/>
                    <span onClick={() => window.scrollTo({ top:0, behavior:"smooth"})} className="mt-4">
                        <Button showText={true}>D'accord !</Button>
                    </span>
                </div> :
       
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
        }   
        </>
        
    );
}

export default Map;