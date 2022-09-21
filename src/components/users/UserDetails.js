import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../utils/variables";
import Button from "../actions/Button";
import "./UserDetails.scss";

const UserDetails = () => {
  const [user, setUser] = useState();
  const userId = useParams().userId;
  // console.log(userId);

  useEffect(() => {
    fetch(API + `user_detail/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        // console.log(data);
      });
  }, []);

  return (
    <>
      {user && (
        <div className="user-container">
          <div className="card-container">
            <span className="pro">Host</span>
            <img
              className="round"
              src="https://randomuser.me/api/portraits/women/79.jpg"
              alt="user"
            />

            <div className="avatar-bottom">
              <span className="user-name">Prénom: {user.name}</span>
              <span className="user-city">Ville: {user.city}</span>
            </div>
            <p>{user.description}</p>
            <div className="buttons">
              <button>
                <Button showText={true}>Message</Button>
              </button>
              <button>
                <Button showText={true}>Voir les repas</Button>
              </button>
            </div>
            <div className="skills">
              <h6>Info</h6>
              <ul>
                <li>{user.gender}</li>
                <li>{user.email}</li>
                <li>HTML</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
