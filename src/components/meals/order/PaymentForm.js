import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "../../actions/Button";
import OrderLoader from "./OrderLoader";
import { useSetAtom } from "jotai";
import { OrderConfirmationAtom } from "../../../atoms/OrderConfirmation";

export default function PaymentForm({ setShowOrderPopup, mealId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      // confirmParams: {
      //   // Make sure to change this to your payment completion page
      //   return_url: `http://localhost:3001/meals/${mealId}`,
      // },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
    setShowOrderPopup(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="my-6  ">
      <PaymentElement id="payment-element" />
      <button
        className="mt-3"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text" className="flex justify-center items-center">
          {isLoading ? (
            <OrderLoader type="spin" color="#51DFAD" />
          ) : (
            <Button showText={true}>Confirmer la réservation</Button>
          )}
        </span>
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
