import React from "react";
import Review from "./Review";

function DisplayReviews({ reviewStatus, reviews }) {
  // console.log(reviews);
  return (
    <div className="mb-8">
      {reviewStatus === "received" && reviews.received.length === 0 && (
        <p className=" mt-2 font-book-font">
          {" "}
          Vous n'avez pas encore écrit d'avis.
          <br />
          Pour écrire un avis sur un hôte, vous devez avoir participé à son
          repas et que ce dernier sois passé. <br /> Vous retrouverez vos repas
          passés dans "Mes réservations", onglet "Réservations passées"
        </p>
      )}

      {reviewStatus === "written" && reviews.written.length === 0 && (
        <p className=" mt-2 font-book-font">
          {" "}
          Vous n'avez pas encore recues d'avis.
        </p>
      )}

      {reviewStatus === "received"
        ? reviews.received.map((review, index) => (
            <Review key={index} review={review} showHost />
          ))
        : reviews.written.map((review, index) => (
            <Review key={index} review={review} />
          ))}
    </div>
  );
}

export default DisplayReviews;
