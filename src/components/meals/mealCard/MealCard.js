import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MealImage from "./MealImage";
import MealPrice from "./MealPrice";
import MealAvatar from "./MealAvatar";
import "./MealCard.scss";
import MealTitle from "./MealTitle";
import MealStartingDate from "./MealStartingDate";
import defaultImage from "./meal-image-default.jpeg";
import { API } from "../../../utils/variables";
import Cookies from "js-cookie";
import Bin from "../../../icons/Bin";
import Eye from "../../../icons/Eye";
import LayoutBlur from "../../layout/LayoutBlur/LayoutBlur";
import Button from "../../actions/Button";
import Close from "../../../icons/Close";
import {
  errorInput,
  errorMessage,
  errorMessageValues,
} from "../../authentication/errors";
import { categories } from "../../../data/Category";
import { useForm } from "react-hook-form";
import Autocompletion from "../../geolocation/Autocompletion";
import DatePicker from "react-datepicker";
import { dietType } from "../../../data/DietType";
import { allergens } from "../../../data/Allergens";
import SectionTitle from "../../titles/SectionTitle";
import MealEditForm from "../MealEditForm";

function MealCard({ mealData, showAvatar, showAdditionalInfo, forceUpdate }) {
  const token = Cookies.get("token");
  const [showEdit, setShowEdit] = useState();

  const deleteMeal = () => {
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

  return (
    <Link to={!showAdditionalInfo && `/meals/${mealData.id}`}>
      <div
        key={mealData.id}
        className="mealcard-container flex flex-col justify-end gap-1"
      >
        {showAdditionalInfo && (
          <>
            <div className="absolute top-2 -left-2 flex flex-col gap-2 z-10">
              <div
                onClick={() => setShowEdit(true)}
                className="w-[38px] h-[38px] rounded-full bg-[#5376F1]"
              ></div>
              <div
                onClick={() => openInNewTab(`/meals/${mealData.id}`)}
                className="w-[38px] h-[38px] rounded-full bg-[#F1538C] flex justify-center items-center"
              >
                <Eye />
              </div>
              <div
                onClick={() => deleteMeal()}
                className="w-[38px] h-[38px] rounded-full bg-[#F15353] flex justify-center items-center"
              >
                <Bin />
              </div>
            </div>
            {showEdit && (
              <LayoutBlur>
                <MealEditForm mealData={mealData} setShowEdit={setShowEdit} />
              </LayoutBlur>
            )}{" "}
          </>
        )}
        <div className="flex gap-1 text-white">
          {mealData.categories &&
            mealData.categories.map((category) => <p> {category.label} </p>)}
        </div>
        <p className="text-white">{mealData.location.city}</p>
        <p className="text-white">
          Places dispo : {mealData.guest_capacity - mealData.guest_registered}
        </p>
        <div className="layer-blur"> </div>

        {mealData.images ? (
          <img src={mealData.images} alt="meal" className="mealcard-image" />
        ) : (
          <img src={defaultImage} alt="meal" className="mealcard-image" />
        )}

        <MealPrice price={mealData.price} />
        <MealTitle title={mealData.title} />
        {showAvatar && (
          <div className="flex gap-2 items-center">
            <MealAvatar host={mealData.host} />
            <p className="text-white text-base font-book-font">
              {" "}
              {mealData.host.name}{" "}
            </p>
          </div>
        )}

        <MealStartingDate date={mealData.starting_date} />
      </div>
    </Link>
  );
}

export default MealCard;
