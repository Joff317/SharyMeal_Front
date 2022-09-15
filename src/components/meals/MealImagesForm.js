import React from "react";
import { API } from "../../utils/variables";
import Cookies from "js-cookie";

function MealImagesForm({ maxId }) {
  const token = Cookies.get("token");

  const handleSubmitFile = (e) => {
    e.preventDefault();
    const data = new FormData();

    for (let i = 0; i < e.target.images.files.length; i++) {
      data.append("meal[images][]", e.target.images.files[i]);
    }

    submitToAPI(data);
  };

  const submitToAPI = (data) => {
    const requestOptions = {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    };
    fetch(API + `meals/${maxId + 1}`, requestOptions)
      .then((response) => response.json())
      .then((res) => console.log(res));
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmitFile(e)}>
        <input type="file" name="images" id="images" multiple={true} />
        <br />

        <button type="submit">UPLOAD</button>
      </form>
    </>
  );
}

export default MealImagesForm;
