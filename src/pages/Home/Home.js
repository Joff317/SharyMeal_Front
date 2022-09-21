import React, { useEffect, useRef } from "react";
import "./Home.css";
import HeroTitle from "../../components/titles/HeroTitle";
import MealsIndex from "../../components/meals/MealsIndex";
import image1 from "../../assets/images/imagehome1.jpeg";
import image2 from "../../assets/images/imagehome2.jpeg";
import image3 from "../../assets/images/imagehome3.jpeg";
import InputGeoloc from "../../components/geolocation/InputGeoloc";
import ScrollReveal from "scrollreveal";
import { AnimeJs, slideUp } from "../../components/animations/Animations";
import "../../components/animations/transition.css";

function Home(props) {
  const animation = useRef(null);

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
            <InputGeoloc />
          </span>
        </div>

        <div className="flex gap-4 w-full flex-wrap pt-24 -z-10 justify-evenly absolute slide  top-[320px]">
          <img
            src={image1}
            alt="first-img-home"
            className="max-w-[300px] max-h-[350px] object-cover -rotate-12"
          />
          <img
            src={image2}
            alt="second-img-home"
            className="max-w-[350px] min-w-[320px] max-h-[350px] object-cover"
          />
          <img
            src={image3}
            alt="third-img-home"
            className="max-w-[300px] min-w-[300px] max-h-[350px] object-cover rotate-6"
          />
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
