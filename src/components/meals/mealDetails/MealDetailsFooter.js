import React, { useState } from "react";
import "./MealDetailsFooter.scss";
import Button from "../../../components/actions/Button";
import Check from "../../../icons/Check";
import LayoutBlur from "../../layout/LayoutBlur/LayoutBlur";
import OrderConfirmation from "../order/OrderConfirmation";

const MealDetailsFooter = ({ meal, setBookingQuantity, bookingQuantity }) => {
  const [showOrderPopup, setShowOrderPopup] = useState(false);

  const incrementCounter = () => {
    setBookingQuantity(bookingQuantity + 1);
  };

  let decrementCounter = () => {
    setBookingQuantity(bookingQuantity - 1);
  };

  return (
    <div className="meal-details-footer-top">
      <div className="left-footer">
        <p className="meal-title">{meal.title},</p>
        <p className="host-name"> by {meal.host.name}</p>
      </div>

      <div className="right-footer">
        <p className="fork">Couvert : </p>
        <div className="button-wrapper">
          {bookingQuantity > 1 ? (
            <span
              className="minus flex justify-center items-center bg-black w-6 h-6 rounded-full text-white"
              onClick={decrementCounter}
            >
              -
            </span>
          ) : (
            <span className="cursor-not-allowed	 flex justify-center items-center bg-grey w-6 h-6 rounded-full text-white">
              -
            </span>
          )}

          <div className="num flex items-center justify-center">
            {bookingQuantity}
          </div>

          {bookingQuantity !== meal.guest_capacity - meal.guest_registered ? (
            <span
              className="plus flex justify-center items-center bg-black w-6 h-6 rounded-full text-white"
              onClick={incrementCounter}
            >
              +
            </span>
          ) : (
            <span className="cursor-not-allowed	 flex justify-center items-center bg-grey w-6 h-6 rounded-full text-white">
              +
            </span>
          )}
        </div>
        <button className="ml-[50px]" onClick={() => setShowOrderPopup(true)}>
          <Button showText={true}>Réserver</Button>
        </button>
        {showOrderPopup && (
          <LayoutBlur>
            <OrderConfirmation
              guestRegistered={bookingQuantity}
              meal={meal}
              showOrderPopup={showOrderPopup}
              setShowOrderPopup={setShowOrderPopup}
            />
          </LayoutBlur>
        )}
      </div>
    </div>
  );
};

export default MealDetailsFooter;
