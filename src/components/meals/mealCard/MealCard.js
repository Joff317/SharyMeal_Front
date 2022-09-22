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
import APIManager from "../../../services/Api";
import { API } from "../../../utils/variables";

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

  const deleteMeal = () => {
    // APIManager.delete(`meals/${mealData.id}`)
    //   .then((res) => {
    //     console.log("res FROM DELETE MEAL REQUEST => ", res);
    //     forceUpdate();
    //   })
    //   .catch((error) =>
    //     console.error("error from DELETE MEAL REQUEST => ", error.message)
    //   );

    //OLD request : will be removed from code.
    fetch(`${API}/meals/${mealData.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      forceUpdate();
    });
  };

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

  console.log(new Date(Date.now()));
  console.log(new Date(mealData.starting_date));

  return (
    <div
      key={mealData.id}
      className={`mealcard-container flex flex-col opacity-100 justify-end  gap-1 ${
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
