import SectionTitle from "../../titles/SectionTitle";
import React from "react";
import Button from "../../actions/Button";
import Close from "../../../icons/Close";
import SubsectionTitle from "../../titles/SubsectionTitle";

function OrderConfirmation({ setShowOrderPopup, meal, guestRegistered }) {
  function dataParsed(date) {
    return new Date(date).toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
      day: "numeric",
    });
  }
  return (
    <div>
      <SectionTitle> Confirmation de commande </SectionTitle>
      <br />
      <SubsectionTitle> Récapitulatif du repas </SubsectionTitle>

      <ul className="flex flex-col gap-1 mt-4 ml-5">
        <li className="list-disc font-light-font">
          {" "}
          {meal.title}, by {meal.host.name}{" "}
        </li>
        {guestRegistered === 1 ? (
          <li className="list-disc font-light-font">
            {" "}
            {guestRegistered} place réservée
          </li>
        ) : (
          <li className="list-disc font-light-font">
            {" "}
            {guestRegistered} places réservées
          </li>
        )}
        <li className="list-disc font-light-font">
          {" "}
          {dataParsed(meal.starting_date)}{" "}
        </li>
        <li className="list-disc font-light-font">
          {" "}
          {meal.price}€ par unité - total : {meal.price * guestRegistered}€{" "}
        </li>
      </ul>
      <span
        className="absolute top-5 right-5"
        onClick={() => setShowOrderPopup(false)}
      >
        <Button showIcon={true} icon={<Close />}></Button>
      </span>
      <button type="submit" className="mt-10 flex justify-center">
        <Button showText={true}>Confirmer la réservation</Button>
      </button>
    </div>
  );
}

export default OrderConfirmation;
