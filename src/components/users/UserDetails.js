import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loggedAtom } from "../../atoms/loggedAtom";
import APIManager from "../../services/Api";
import { API } from "../../utils/variables";
import Button from "../actions/Button";
import MealCard from "../meals/mealCard/MealCard";
import SectionTitle from "../titles/SectionTitle";
import avatarDefault from "../../assets/images/avatardefault.png";
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
  }, [setUser]);

  return (
    <>
      {user && (
        <div className="user-container">
         <span className="title-container"> <SectionTitle>Bienvenue sur le profil de {user.name}</SectionTitle> </span>
          <div className="card-container">
            <span className="pro">Host</span>
            <div className="avatar">
              {user.avatar_url ? (
                <img alt="avatar" src={user.avatar_url} />
              ) : (
                <img alt="avatar" src={avatarDefault} />
              )}
            </div>

            <div className="avatar-bottom">
              <span className="user-name">Prénom: {user.name}</span>
              <span className="user-city">Ville: {user.city}</span>
            </div>
            <p>{user.description}</p>
            <div className="skills">
              <h6>Info</h6>
              <ul>
                <li>Genre : {user.gender ? user.gender : "non spécifié"}</li>
                <li>Email : {user.email}</li>
                <li>{user.hosted_meals.length} repas organisés</li>
              </ul>
            </div>
          </div>
          <div className="hosted-meals-container">
            <span className="title-container">
              <SectionTitle>Les repas organisés de {user.name}</SectionTitle>
            </span>

            <div className="hosted-container flex flex-wrap mt-4">
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
