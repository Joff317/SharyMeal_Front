import React, { useState } from "react";
import "./MealDetailsFooter.scss";
import Button from "../../../components/actions/Button";
import LayoutBlur from "../../layout/LayoutBlur/LayoutBlur";
import OrderConfirmation from "../order/OrderConfirmation";
import Book from "../../../icons/Book";
import { bookingQtyAtom } from '../../../atoms/bookingQtyAtom';
import { useSetAtom } from 'jotai';
import { useAtomValue } from "jotai";


const MealDetailsFooter = ({ meal, setBookingQuantity, bookingQuantity, forceUpdate }) => {
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const setAtomBooking = useSetAtom(bookingQtyAtom);
  const atomBooking = useAtomValue(bookingQtyAtom);

  const incrementCounter = () => {
    // setBookingQuantity(bookingQuantity + 1);
    setAtomBooking(atomBooking + 1)
    // forceUpdate();
  };

  let decrementCounter = () => {
    // setBookingQuantity(bookingQuantity - 1);
    setAtomBooking(atomBooking - 1)
    // forceUpdate();

  };

  return (
    <div className="meal-details-footer-top">
      <div className="left-footer items-center">
        <p className="meal-title">{meal.title},</p>
        <p className="host-name"> by {meal.host.name}</p>
      </div>

      <div className="right-footer">
        <p className="fork">Couvert : </p>
        <div className="button-wrapper">
          {atomBooking > 1 ? (
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
            {atomBooking}
          </div>

          {atomBooking !== meal.guest_capacity - meal.guest_registered ? (
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
          <Button showText={true} showIcon={true} icon={<Book />}>
            Réserver
          </Button>
        </button>
        {showOrderPopup && (
          <LayoutBlur>
            <OrderConfirmation
              guestRegistered={atomBooking}
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
