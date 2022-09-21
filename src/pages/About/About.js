import React, { useState } from "react";
import useFetch from "../../hooks/useGet";
import InputGeoloc from "../../components/geolocation/InputGeoloc";
import HeroTitle from "../../components/titles/HeroTitle";
import Button from "../../components/actions/Button";
import image3 from "../../assets/images/imagehome3.jpeg";
import image1 from "../../assets/images/imagehome1.jpeg";
import aboutImage from "../../assets/images/about-image.jpeg";
import "./About.scss";
import SectionTitle from "../../components/titles/SectionTitle";
import SubsectionTitle from "../../components/titles/SubsectionTitle";
import { useNavigate } from "react-router-dom";
import Arrow from "../../icons/Arrow";

function About() {
  const navigate = useNavigate();

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
          <button onClick={() => navigate("/create-meal")}>
            <Button showText={true} showIcon={true} icon={<Arrow />}>
              Commencer
            </Button>
          </button>
        </div>
        <div className="top-container-right">
          <div className="img-container">
            <img src={image3} alt="about-us" className="image-3" />
            <img src={image1} alt="about-us" className="image-1" />
          </div>
        </div>
      </div>

      <div className="middle-container">
        <span className="middle-title">
          <SectionTitle>Comment ça fonctionne ?</SectionTitle>
        </span>
        <div className="middle-left-container">
          <div className="first-double-circle">
            <div className="circle-1">
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
            </div>
            <div className="circle-2">
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
            </div>
          </div>
          <div className="double-circle">
            <div className="circle-3">
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
            </div>
            <div className="circle-4">
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
            </div>
          </div>
          <div className="square"></div>
          <img src={aboutImage} alt="about-us" className="about-image" />
        </div>
        <div className="middle-container-right">
          <div className="text-1">
            <SubsectionTitle>Créer votre annonce</SubsectionTitle>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              repudiandae animi asperiores magni. Animi, perferendis ipsa vel
              reprehenderit ullam voluptatibus harum. Ratione iste quibusdam
              labore quae, asperiores alias dicta id! Soluta aliquid quas
              quaerat voluptates modi quod, aspernatur deserunt, expedita eaque
              nesciunt sit exercitationem ut assumenda excepturi explicabo nam
              ab cupiditate rem nihil in doloribus nostrum. Corporis voluptatum
              harum quibusdam?
            </p>
          </div>
          <div className="text-2">
            <SubsectionTitle>
              Gérer les demande de participations{" "}
            </SubsectionTitle>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              repudiandae animi asperiores magni. Animi, perferendis ipsa vel
              reprehenderit ullam voluptatibus harum. Ratione iste quibusdam
              labore quae, asperiores alias dicta id! Soluta aliquid quas
              quaerat voluptates modi quod, aspernatur deserunt, expedita eaque
              nesciunt sit exercitationem ut assumenda excepturi explicabo nam
              ab cupiditate rem nihil in doloribus nostrum. Corporis voluptatum
              harum quibusdam?
            </p>
          </div>
          <div className="text-3">
            <SubsectionTitle>Mangez et profitez !</SubsectionTitle>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              repudiandae animi asperiores magni. Animi, perferendis ipsa vel
              reprehenderit ullam voluptatibus harum. Ratione iste quibusdam
              labore quae, asperiores alias dicta id! Soluta aliquid quas
              quaerat voluptates modi quod, aspernatur deserunt, expedita eaque
              nesciunt sit exercitationem ut assumenda excepturi explicabo nam
              ab cupiditate rem nihil in doloribus nostrum. Corporis voluptatum
              harum quibusdam?
            </p>
          </div>
        </div>

        <span
          className="bottom-button"
          onClick={() => navigate("/create-meal")}
        >
          <Button showText={true} showIcon={true} icon={<Arrow />}>
            Lancez-vous !
          </Button>
        </span>
      </div>
    </div>
  );
}

export default About;
