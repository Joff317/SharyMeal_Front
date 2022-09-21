import React, { useState } from "react";
import Button from "../../actions/Button";
import SectionTitle from "../../titles/SectionTitle";
import SubsectionTitle from "../../titles/SubsectionTitle";
import "./MealHostProfile.scss";
import avatarDefault from "../../../assets/images/avatardefault.png";
import MyHostedMeals from "../../user/MyHostedMeals";
import { useNavigate } from "react-router-dom";
import Arrow from "../../../icons/Arrow";
import LayoutBlur from "../../layout/LayoutBlur/LayoutBlur";
import SendMessage from "./SendMessage";
import { useAtomValue } from "jotai";
import { currentuserAtom } from "../../../atoms/loggedAtom";

const MealHostProfile = ({ meal, hostedMeals, hostAvatar }) => {
  const [showMessage, setShowMessage] = useState(false);
  const currentUser = useAtomValue(currentuserAtom);

  const navigate = useNavigate();
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
                <p> 1 repas organisé </p>
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
              <span onClick={() => navigate(`/users/${meal.host.id}`)}>
                <Button showText={true} showIcon={true} icon={<Arrow />}>
                  Voir le profil
                </Button>
              </span>

              {currentUser.id !== meal.host.id && (
                <p
                  onClick={() => setShowMessage(true)}
                  className="contact cursor-pointer hover:underline"
                >
                  Contacter l'hôte
                </p>
              )}

              {showMessage && (
                <LayoutBlur>
                  <SendMessage
                    setShowMessage={setShowMessage}
                    host={meal.host}
                  />
                </LayoutBlur>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealHostProfile;
