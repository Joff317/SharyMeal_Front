import React from "react";
import { Link } from "react-router-dom";
import Button from "../../actions/Button";
import SectionTitle from "../../titles/SectionTitle";

const Guest = ({ guestMeal }) => {

  return (
    <div className="flex flex-col items-start mx-32 justify-between gap-4">
      <SectionTitle>
        Participants{" "}
      </SectionTitle>
      {guestMeal &&
        guestMeal.users.map((guest) => (
          <ul>
            <li>
              {" "}
              <p>Name : {guest.name}</p> 
              <p>Email : {guest.email}</p>
              <Link to={`/users/${guest.id}`}>
              <Button showText={true}> Voir le profil </Button>
              </Link>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default Guest;
