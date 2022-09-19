import SectionTitle from "../../titles/SectionTitle";
import React, { useEffect, useState } from "react";
import Button from "../../actions/Button";
import Close from "../../../icons/Close";
import SubsectionTitle from "../../titles/SubsectionTitle";
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "./PaymentForm"
import { API } from "../../../utils/variables";

const PUBLIC_KEY = process.env.REACT_APP_PUBLISHABLE_KEY
const stripeTestPromise = loadStripe(PUBLIC_KEY)


function OrderConfirmation({ setShowOrderPopup, meal, guestRegistered }) {

	const [clientSecret, setClientSecret] = useState("")
  

	useEffect(() => {
		fetch(API + "charges", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				amount: parseInt(`${meal.price * guestRegistered}00`),
				currency: "eur",
			}),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret))
	}, [])

  function dataParsed(date) {
    return new Date(date).toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
      day: "numeric",
    });
  }

  const appearance = {
		theme: "stripe",
	}
	const options = {
		clientSecret,
		appearance,
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
      {clientSecret && (
					<Elements options={options} stripe={stripeTestPromise}>
						<PaymentForm />
					</Elements>
				)}
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
