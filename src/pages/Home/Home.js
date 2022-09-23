import React, { useEffect, useRef, useState } from "react";
import "./Home.scss";
import HeroTitle from "../../components/titles/HeroTitle";
import MealsIndex from "../../components/meals/MealsIndex";
import image1 from "../../assets/images/imagehome1.jpeg";
import image2 from "../../assets/images/imagehome2.jpeg";
import image3 from "../../assets/images/imagehome3.jpeg";
import InputGeoloc from "../../components/geolocation/InputGeoloc";
import ScrollReveal from "scrollreveal";
import { AnimeJs, slideUp } from "../../components/animations/Animations";
import "../../components/animations/transition.css";
import { Link } from "react-router-dom";
import Toggle from "../../components/map/Toggle";
import { useAtomValue, useSetAtom } from "jotai";
import { CheckedAtom } from "../../atoms/Checked";
import { inputDataAtom } from "../../atoms/inputData";

function Home(props) {
  const animation = useRef(null);
  const [saveSearchData, setSaveSearchData] = useState(false);
  const checkedAtomValue = useAtomValue(CheckedAtom);
  const setInputDataAtom = useSetAtom(inputDataAtom);

  useEffect(() => {
    animation.current.innerHTML = animation.current.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
    AnimeJs();
  }, [animation]);

  useEffect(() => {
    ScrollReveal().reveal(".slide", slideUp);
  }, []);

  useEffect(() => {
    if (!checkedAtomValue) {
      setInputDataAtom({
        city: "",
        lat: "",
        lon: "",
        date: "",
      });
    }
  }, []);

  return (
    <div className="home-container ">
      <div className="top-container relative">
        <div className="text-container pt-3">
          <HeroTitle>
            {" "}
            <span ref={animation} className="ml12">
              Meet. Share. Eat.
            </span>{" "}
          </HeroTitle>

          <div className="under-title mt-3 slide">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            semper nisl nec sociis.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Praesent semper nisl
          </div>
          <span className="slide">
            <InputGeoloc saveSearchData={saveSearchData} />
            <div className="flex  gap-2 mt-3 ml-4">
              {" "}
              <Toggle
                setBoolean={setSaveSearchData}
                boolean={saveSearchData}
                name="save"
              />
              <p className="text-white font-light-font text-sm mt-1">
                {" "}
                Memoriser votre ville ?
              </p>{" "}
            </div>
          </span>
        </div>

        <div className="images-home flex gap-4 w-full flex-wrap pt-24 -z-10 justify-evenly absolute slide  top-[320px]">
          <Link to="/about">
            <img
              src={image1}
              alt="first-img-home"
              className="max-w-[300px] max-h-[350px] min-h-[350px] object-cover -rotate-12 image-cursor"
            />
          </Link>
          <Link to="/about">
            <img
              src={image2}
              alt="second-img-home"
              className="max-w-[350px] min-w-[320px] max-h-[350px] object-cover image-cursor"
            />
          </Link>
          <Link to="/about">
            <img
              src={image3}
              alt="third-img-home"
              className="max-w-[300px] min-w-[300px] max-h-[350px] object-cover rotate-6 image-cursor"
            />
          </Link>
        </div>
      </div>

      <div className="w-full h-5 mt-[250px]" id="titleScroll"></div>

      <span className="slide">
        <MealsIndex />
      </span>
    </div>
  );
}

export default Home;
