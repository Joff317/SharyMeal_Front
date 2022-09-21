import React from "react";
import { Link } from "react-router-dom";
import StartDate from "../../../icons/StartDate";
import UserBlack from "../../../icons/UserBlack";
import "./MealDetailsHost.scss";

const MealDetailsHost = ({ meal }) => {
  function dataParsed(date) {
    return new Date(date).toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
      day: "numeric",
    });
  }
  return (
    <div className="host">
      <div className="user">
        <UserBlack />
        <p className="font-light-font text-md">
          <Link to={`/users/${meal.host.id}`}>
            {" "}
            {meal.host.name ? meal.host.name : meal.host.email}{" "}
          </Link>
        </p>
      </div>
      <div className="date">
        <StartDate />
        <h5> {dataParsed(meal.starting_date)}</h5>
      </div>
    </div>
  );
};

export default MealDetailsHost;
