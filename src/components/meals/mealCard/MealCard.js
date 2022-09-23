import React, { useState, useEffect } from "react";
import MealPrice from "./MealPrice";
import MealAvatar from "./MealAvatar";
import "./MealCard.scss";
import MealTitle from "./MealTitle";
import MealStartingDate from "./MealStartingDate";
import defaultImage from "./meal-image-default.jpeg";
import Cookies from "js-cookie";
import Bin from "../../../icons/Bin";
import Eye from "../../../icons/Eye";
import LayoutBlur from "../../layout/LayoutBlur/LayoutBlur";
import MealEditForm from "../MealEditForm";
import Edit from "../../../icons/Edit";
import { Link } from "react-router-dom";
import CreateReview from "../../reviews/CreateReview";
import ScrollReveal from "scrollreveal";
import { slideUpFast } from "../../animations/Animations";
import { API } from "../../../utils/variables";
import DefaultAvatar from "../../../assets/images/avatardefault.png";
import SendMessage from "../mealDetails/SendMessage";
import AvatarPopup from "../../users/AvatarPopup";

function MealCard({
  mealData,
  showAvatar,
  showAdditionalInfo,
  showAdditionalInfoReview,
  launchAnimation,
  forceUpdate,
}) {
  const token = Cookies.get("token");
  const [showEdit, setShowEdit] = useState();
  const [showReview, setShowReview] = useState();
  const [guestsAvatarUrl, setGuestsAvatarUrl] = useState();
  const [showDetailGuest, setShowDetailGuest] = useState(false);
  const [getGuestId, setGetGuestId] = useState();
  const [showMessage, setShowMessage] = useState(false);

  const deleteMeal = () => {
    fetch(`${API}/meals/${mealData.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      forceUpdate();
    });
  };

  useEffect(() => {
    showAdditionalInfo &&
      fetch(`${API}/guests_avatar/${mealData.id}`)
        .then((res) => res.json())
        .then((response) => {
          setGuestsAvatarUrl(response);
        });
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  function dataParsed(date) {
    return new Date(date).toLocaleDateString("fr-FR", {
      month: "short",
      year: "numeric",
      day: "numeric",
    });
  }

  useEffect(() => {
    launchAnimation && ScrollReveal().reveal(".slide", slideUpFast);
  }, [launchAnimation]);

  return (
    <div
      key={mealData.id}
      className={`mealcard-container flex flex-col opacity-100 justify-end   ${
        launchAnimation && !showAdditionalInfo && "slide"
      } `}
    >
      {showAdditionalInfo && (
        <>
          <div className="absolute top-2 -left-2 flex flex-col gap-2 z-0">
            <div
              onClick={() =>
                setShowEdit(
                  new Date(mealData.starting_date) > new Date(Date.now())
                )
              }
              className={`w - [38px] h-[38px] rounded-full  ${
                new Date(mealData.starting_date) < new Date(Date.now())
                  ? "bg-grey cursor-not-allowed"
                  : "bg-[#5376F1] cursor-pointer"
              } flex justify-center items-center `}
            >
              <Edit />
            </div>
            <div
              onClick={() => openInNewTab(`/meals/${mealData.id}`)}
              className="w-[38px] h-[38px] rounded-full bg-[#F1538C] flex justify-center items-center cursor-pointer"
            >
              <Eye />
            </div>
            <div
              onClick={() => deleteMeal()}
              className="w-[38px] h-[38px] rounded-full bg-[#F15353] flex justify-center items-center cursor-pointer"
            >
              <Bin />
            </div>
          </div>
          {showEdit && (
            <LayoutBlur>
              <MealEditForm
                mealData={mealData}
                setShowEdit={setShowEdit}
                forceUpdate={forceUpdate}
              />
            </LayoutBlur>
          )}{" "}
        </>
      )}
      {showAdditionalInfoReview && (
        <>
          <div className="absolute top-2 flex flex-col gap-2 z-10">
            <div
              onClick={() => setShowReview(true)}
              className="w-[38px] h-[38px] rounded-full bg-[#5376F1] flex justify-center items-center cursor-pointer"
            >
              <Edit />
            </div>
          </div>
          {showReview && (
            <LayoutBlur>
              <CreateReview
                mealData={mealData}
                setShowReview={setShowReview}
                forceUpdate={forceUpdate}
              />
            </LayoutBlur>
          )}{" "}
        </>
      )}
      <div className="absolute min-w-[35px] top-14 right-2">
        <div
          onMouseEnter={() => setShowDetailGuest(true)}
          onMouseLeave={() => setShowDetailGuest(false)}
          className="flex flex-col relative"
        >
          {showAdditionalInfo &&
            guestsAvatarUrl &&
            guestsAvatarUrl.guests_avatar.map((guestAvatar) => (
              <>
                <img
                  className="w-7 h-7 border-grey mt-[-9px] rounded full cursor-pointer"
                  src={
                    guestAvatar.avatar_url
                      ? guestAvatar.avatar_url
                      : DefaultAvatar
                  }
                  alt="avatar"
                />
              </>
            ))}

          {showDetailGuest && (
            <AvatarPopup
              guestData={guestsAvatarUrl.guests_avatar}
              setGetGuestId={setGetGuestId}
              setShowMessage={setShowMessage}
              hideMessageBtn={false}
            />
          )}
        </div>
      </div>

      {showMessage && (
        <LayoutBlur>
          <SendMessage setShowMessage={setShowMessage} host={getGuestId} />
        </LayoutBlur>
      )}
      <p className="text-white">{mealData.location.city}</p>
      <div className="layer-blur"> </div>
      {mealData.image_urls ? (
        <img
          src={mealData.image_urls[0]}
          alt="meal"
          className="mealcard-image"
        />
      ) : (
        <img src={defaultImage} alt="meal" className="mealcard-image" />
      )}
      <MealPrice price={mealData.price} />
      <MealTitle title={mealData.title} mealId={mealData.id} />
      {showAvatar && (
        <div className="flex gap-2 items-center">
          <MealAvatar host={mealData.host} />
          <p className="text-white text-base font-book-font">
            {" "}
            <Link to={`/users/${mealData.host.id}`}>{mealData.host.name} </Link>
          </p>
        </div>
      )}
      <MealStartingDate date={dataParsed(mealData.starting_date)} />
    </div>
  );
}

export default MealCard;
