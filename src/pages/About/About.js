import React, { useState } from "react";
import useFetch from "../../hooks/useGet";
import InputGeoloc from "../../components/geolocation/InputGeoloc";

function About(props) {
  return (
    <div className={``}>
      {" "}
      <h1 className="text-3xl font-bold underline">Hello About!</h1>
    </div>
  );
}

export default About;
