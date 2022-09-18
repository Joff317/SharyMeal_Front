import React from "react";
import Button from "../../actions/Button";
import SectionTitle from "../../titles/SectionTitle";
import SubsectionTitle from "../../titles/SubsectionTitle";
import "./MealHostProfile.scss";
import avatarDefault from "../../../assets/images/avatardefault.png";
import MyHostedMeals from "../../user/MyHostedMeals";

const MealHostProfile = ({ meal, hostedMeals, hostAvatar }) => {
  console.log(meal);

  return (
    <div className="meals-detail-host">
      <div className="host-container">
        <span className="host-title">
          {" "}
          <SectionTitle>
            About {meal.host.name ? meal.host.name : "your host"} ...
          </SectionTitle>{" "}
        </span>

        <div className="detail-host-container">
          <div className="left-detail-host-container">
            <div className="avatar">
              {hostAvatar ? (
                <img alt="avatar" src={hostAvatar} />
              ) : (
                <img alt="avatar" src={avatarDefault} />
              )}
            </div>
            <div className="right-detail-of-left-detail-host-container">
              <span className="host-title">
                <SectionTitle>{meal.host.name}</SectionTitle>
              </span>

              {meal.host.age && <p>{meal.host.age} ans</p>}

              {hostedMeals === 1 ? (
                "1 repas organisé"
              ) : (
                <p>{hostedMeals} repas organisés</p>
              )}
            </div>
          </div>

          <p className="vertical-border"></p>

          <div className="right-detail-host-container">
            <div className="top-container-about">
              <span className="bio-title">
                <SubsectionTitle>Bio</SubsectionTitle>
              </span>
              <p className="bio-container">
                {meal.host.description
                  ? meal.host.description
                  : "L'hôte n'a pas encore publié de description ❌"}
              </p>
            </div>

            <div className="bottom-container">
              <span>
                <Button showText={true}>Voir le profil</Button>
              </span>
              <p className="contact">Contacter l'hôte</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealHostProfile;
