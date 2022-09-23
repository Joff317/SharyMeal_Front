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
            Vous avez toujours rêvé de préparer de délicieux repas à la maison
            et de partager cette expérience ? Alors, inscrivez-vous et créez
            votre premier repas !
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
        <div className="middle-middle">
          <div className="middle-left-container">
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
            <span className="square"></span>
            <img src={aboutImage} alt="about-us" className="about-image" />
          </div>
          <div className="middle-container-right">
            <div className="text-1">
              <SubsectionTitle>Créer votre annonce</SubsectionTitle>
              <p className="text">
                Créer votre événement gastronomique n'a jamais été aussi facile.
                Proposez un repas, publiez une annonce et recevez des
                réservations.
              </p>
            </div>
            <div className="text-1">
              <SubsectionTitle>
                Gérer vos événement depuis votre profil{" "}
              </SubsectionTitle>
              <p className="text">
                Gérez vos événements à partir de votre profil. Vous pouvez voir
                et modifier les détails comme la date, le lieux etc. Indiquez à
                vos convives s'il s'agit d'un repas pour omnivore, végétarien
                etc.
              </p>
            </div>
            <div className="text-1">
              <SubsectionTitle>Mangez et profitez !</SubsectionTitle>
              <p className="text">
                Laissez des commentaires en ligne à la fin de chaque repas pour
                dire ce que vous avez pensé de votre soirée. Évaluez votre hôte
                en lui donnant une note !
              </p>
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
      </div>
    </div>
  );
}

export default About;
