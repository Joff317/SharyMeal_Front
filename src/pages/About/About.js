import React, { useState } from "react";
import useFetch from "../../hooks/useGet";
import InputGeoloc from "../../components/geolocation/InputGeoloc";
import HeroTitle from "../../components/titles/HeroTitle";
import Button from "../../components/actions/Button";
import image3 from "../../assets/images/imagehome3.jpeg";
import image1 from "../../assets/images/imagehome1.jpeg";
import "./About.scss";

function About(props) {
  return (
    <div className="about-container">
      <div className="top-container">
        <div className="top-container-left">
          <HeroTitle>Pourquoi devenir hôte ?</HeroTitle>
          <p className="text-white">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequatur corporis rerum aut porro, exercitationem accusamus
            magnam perferendis at, adipisci debitis quasi reprehenderit. Rerum
            et officia commodi, eveniet nesciunt totam exercitationem.
            Provident, natus ea. Optio vero quas provident mollitia est alias
            minus qui amet dolore? Aliquid odio suscipit enim iste, labore
            corrupti consequuntur cupiditate aspernatur aliquam eius expedita
            modi, repellat ipsam.
          </p>
          <button>
            <Button showText={true}>Commencer</Button>
          </button>
        </div>
        <div className="top-container-right">
          <div className="img-container">
            <img src={image3} alt="" className="image-3" />
            <img src={image1} alt="" className="image-1"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
