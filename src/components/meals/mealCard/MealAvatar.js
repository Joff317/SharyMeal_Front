import React, { useState, useEffect } from "react";
import { API } from "../../../utils/variables";
import avatarDefault from "./avatar-default.png";

function MealAvatar({ host }) {
  const [hostDetails, setHostDetails] = useState(null);

  useEffect(() => {
    fetch(API + `/user_detail/${host.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data MealAvatar => ", data);
        setHostDetails(data);
      });
  }, []);

  return (
    <>
      {hostDetails && hostDetails.avatar_url ? (
        <img src={hostDetails.avatar_url} alt="host" className="w-6" />
      ) : (
        <img src={avatarDefault} alt="host" className="w-6" />
      )}
    </>
  );
}

export default MealAvatar;
