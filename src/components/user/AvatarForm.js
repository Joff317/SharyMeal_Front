import React from "react";
import { API } from "../../utils/variables";
import Cookies from "js-cookie";

function AvatarForm(props) {
  const token = Cookies.get("token");

  const handleSubmitFile = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("user[avatar]", e.target.avatar.files[0]);
    submitToAPI(data);
  };

  const submitToAPI = (data) => {
    const requestOptions = {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    };
    fetch(API + "update_me", requestOptions)
      .then((response) => response.json())
      .then((res) => console.log(res));
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmitFile(e)}>
        <p className="mb-2"> Choisissez un avatar </p>
        <input type="file" name="avatar" id="avatar" />
        <br />
        <button type="submit">UPLOAD</button>
      </form>
    </>
  );
}

export default AvatarForm;
