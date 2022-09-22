import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loggedAtom } from "../../atoms/loggedAtom";
import APIManager from "../../services/Api";
import { API } from "../../utils/variables";
import Button from "../actions/Button";
import MealCard from "../meals/mealCard/MealCard";
import SectionTitle from "../titles/SectionTitle";
import "./UserDetails.scss";

const UserDetails = () => {
  const [user, setUser] = useState();
  const userId = useParams().userId;

  useEffect(() => {
    APIManager.get(`user_detail/${userId}`)
      .then((res) => {
        setUser(res);
        console.log("res FROM GET DETAILS USER REQUEST => ", res);
      })
      .catch((error) => 
        console.error("error FROM GET DETAILS USER REQUEST => ", error)
      );
  }, [setUser])

  // useEffect(() => {
  //   fetch(API + `user_detail/${userId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUser(data);
  //       console.log(data);
  //     });
  // }, []);

  return (
    <>
      {user && (
        <div className="user-container">
          <div className="card-container">
            <span className="pro">Host</span>
            <img
              className="round"
              src={user.avatar_url}
              alt="user"
            />

            <div className="avatar-bottom">
              <span className="user-name">Prénom: {user.name}</span>
              <span className="user-city">Ville: {user.city}</span>
            </div>
            <p>{user.description}</p>
            <div className="skills">
              <h6>Info</h6>
              <ul>
                <li>Genre : {user.gender}</li>
                <li>Email : {user.email}</li>
                <li>{user.hosted_meals.length} repas organisés</li>
              </ul>
            </div>
          </div>
          <div className="hosted-meals-container">
            <SectionTitle>Les repas organisés de {user.name}</SectionTitle>
            <div className="flex flex-wrap mt-4">
              {user &&
                user.hosted_meals.map((hosted_meal) => (
                  <MealCard
                    key={hosted_meal.id}
                    mealData={hosted_meal}
                    launchAnimation
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
