import React from "react";
import Button from "../../actions/Button";
import SectionTitle from "../../titles/SectionTitle";
import SubsectionTitle from "../../titles/SubsectionTitle";
import "./MealHostProfile.scss";
import MyHostedMeals from '../../user/MyHostedMeals';

const MealHostProfile = ({ meal, hostedMeals }) => {
  console.log(hostedMeals);
  console.log(meal);
  return (
    <div className="meals-detail-host">
      <div className="host-container">
        <span className="host-title">
          {" "}
          <SectionTitle>About {meal.host.name} ...</SectionTitle>{" "}
        </span>

        <div className="detail-host-container">
          <div className="left-detail-host-container">
            <div className="avatar"></div>
            <div className="right-detail-of-left-detail-host-container">
              <span className="host-title">
                <SectionTitle>{meal.host.name}</SectionTitle>
              </span>

              {meal.host.age && <p>{meal.host.age} ans</p>}

             
                
                {  hostedMeals === 1 ? "1 repas organisé" : (
                  <p>{hostedMeals} repas organisés</p>
                )}
                
              
            </div>
          </div>

          <p className="vertical-border"></p>

          <div className="right-detail-host-container">
            <div className="top-container">
              <span className="bio-title">
                <SubsectionTitle>Bio</SubsectionTitle>
              </span>
              <p className="bio-container">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis
                risus lectus nec, nunc. Elementum, tortor, facilisis sem in vel
                porttitor ultrices in facilisi. Sit blandit imperdiet egestas
                duis amet. Nulla dignissim nec nullam sed orci purus.
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
