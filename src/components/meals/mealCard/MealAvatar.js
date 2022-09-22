import React, { useState, useEffect } from "react";
import { API } from "../../../utils/variables";
import avatarDefault from "../../../assets/images/avatardefault.png";
import APIManager from "../../../services/Api";

function MealAvatar({ host }) {
  const [hostDetails, setHostDetails] = useState(null);

  useEffect(() => {

    // APIManager.get(`/user_detail/${host.id}`)
    // .then(res => {
    //   // console.log('res FROM MealAvatar GET REQUEST => ', res);
    //   setHostDetails(res);
    // })
    // .catch(error => console.log('error FROM MealAvatar GET REQUEST => ', error.message));

  // OLD request : will be removed
    fetch(API + `/user_detail/${host.id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("data MealAvatar => ", data);
        setHostDetails(data);
      });
  }, []);

  return (
    <>
      {hostDetails && hostDetails.avatar_url ? (
        <img
          src={hostDetails.avatar_url}
          alt="host"
          className="w-6 h-6 rounded-full"
        />
      ) : (
        <img src={avatarDefault} alt="host" className="w-6 h-6 rounded-full" />
      )}
    </>
  );
}

export default MealAvatar;
