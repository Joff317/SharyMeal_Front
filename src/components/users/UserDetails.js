import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../utils/variables";
import Button from "../actions/Button";
import "./UserDetails.scss";

const UserDetails = () => {
  const [user, setUser] = useState();
  const userId = useParams().userId;
  console.log(userId);

  useEffect(() => {
    fetch(API + `user_detail/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      {user && (
        <div className="user-container">
          <div class="card-container">
            <span class="pro">Host</span>
            <img
              class="round"
              src='https://randomuser.me/api/portraits/women/79.jpg'
              alt="user"
            />
            <h3 className="text-center">{user.name}</h3>
            <h6>{user.city}</h6>
            <p>
              {user.description}
            </p>
            <div class="buttons">
              <button>
                 <Button showText={true}>
                 Message
                 </Button>
                </button>
            </div>
            <div class="skills">
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
