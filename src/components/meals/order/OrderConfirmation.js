import SectionTitle from "../../titles/SectionTitle";
import React, { useEffect, useState } from "react";
import Button from "../../actions/Button";
import Close from "../../../icons/Close";
import SubsectionTitle from "../../titles/SubsectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { API } from "../../../utils/variables";
import "./OrderElement.scss";
import Cookies from "js-cookie";
import { useAtomValue } from "jotai";
import { currentuserAtom } from "../../../atoms/loggedAtom";

const PUBLIC_KEY = process.env.REACT_APP_PUBLISHABLE_KEY;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function OrderConfirmation({ setShowOrderPopup, meal, guestRegistered }) {
  const [clientSecret, setClientSecret] = useState("");
  const token = Cookies.get("token");
  const [signIn, setSignIn] = useState(false);
  const [wrongUser, setWrongUser] = useState(false);
  const currentUser = useAtomValue(currentuserAtom);

  useEffect(() => {
    fetch(API + "charges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: parseInt(`${meal.price * guestRegistered}00`),
        currency: "eur",
        requester: currentUser,
      }),
    })
      .then((res) => {
        if (res.status === 500) {
          setSignIn(true);
          setTimeout(() => setSignIn(false), 5000);
        }
        return res.json();
      })
      .then((data) => {
        if (data.account_owner === false) {
          setWrongUser(true);
          setTimeout(() => setWrongUser(false), 5000);
        }
        setClientSecret(data.clientSecret);
      })
      .catch((error) => console.error("error FROM CHARGES REQUEST => ", error));
  }, []);

  function dataParsed(date) {
    return new Date(date).toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
      day: "numeric",
    });
  }

  const appearance = {
    theme: "flat",
    labels: "floating",

    variables: {
      colorPrimary: "#51DFAD",
      colorBackground: "#F1F1F1",
      colorText: "#30313d",
      colorDanger: "#df1b41",
      fontFamily: "Ideal Sans, system-ui, sans-serif",
      spacingUnit: "3px",
      borderRadius: "4px",
      fontSizeSm: "0.2rem",
      fontLineHeight: "10px",
    },

    rules: {
      ".Tab": {
        border: "1px solid #E0E6EB",
        display: "none",
        visibility: "hidden",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)",
      },
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="z-50">
      <SectionTitle> Confirmation de commande </SectionTitle>
      <br />
      {signIn && (
        <p className="bg-red text-white rounded-md text-center">
          Connectez-vous pour procéder au règlement
        </p>
      )}
      {wrongUser && (
        <p className="bg-red text-white rounded-md text-center">
          Vous n'êtes pas le propriétaire de compte. Opération interdite.
        </p>
      )}
      <SubsectionTitle> Récapitulatif du repas </SubsectionTitle>

      <ul className="flex flex-col gap-1 mt-4 ml-5">
        <li className="list-disc font-light-font">
          {meal.title}, by {meal.host.name}
        </li>
        {guestRegistered === 1 ? (
          <li className="list-disc font-light-font">
            {guestRegistered} place réservée
          </li>
        ) : (
          <li className="list-disc font-light-font">
            {guestRegistered} places réservées
          </li>
        )}
        <li className="list-disc font-light-font">
          {dataParsed(meal.starting_date)}
        </li>
        <li className="list-disc font-light-font">
          {meal.price}€ par unité - total : {meal.price * guestRegistered}€
        </li>
      </ul>

      {clientSecret && (
        <Elements options={options} stripe={stripeTestPromise}>
          <PaymentForm setShowOrderPopup={setShowOrderPopup} mealId={meal.id} />
        </Elements>
      )}
      <span
        className="absolute top-5 right-5"
        onClick={() => setShowOrderPopup(false)}
      >
        <Button showIcon={true} icon={<Close />}></Button>
      </span>
    </div>
  );
}

export default OrderConfirmation;
