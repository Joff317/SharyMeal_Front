import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { loggedAtom } from "../../atoms/loggedAtom";
import "./Home.css";
import Button from "../../components/actions/Button";
import Arrow from "../../icons/Arrow";
import HeroTitle from "../../components/titles/HeroTitle";
import CategoryItem from "../../components/actions/CategoryItem";
import Sushi from "../../icons/Sushi";
import MealsIndex from "../../components/meals/MealsIndex";
import image1 from "../../assets/images/imagehome1.jpeg";
import image2 from "../../assets/images/imagehome2.jpeg";
import image3 from "../../assets/images/imagehome3.jpeg";
import InputGeoloc from "../../components/geolocation/InputGeoloc";


function Home(props) {
  const loggedd = useAtomValue(loggedAtom);

  const [categoriesArray, setCategoriesArray] = useState([]);

  // console.log(categoriesArray);

  return (
    <div className="home-container ">
      <div className="top-container relative">
        <div className="text-container pt-3">
          <HeroTitle> Meet. Share. Eat. </HeroTitle>
          <div className="under-title mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            semper nisl nec sociis.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Praesent semper nisl
          </div>
          <InputGeoloc />
        </div>

        <div className="flex gap-4 w-full flex-wrap pt-24 justify-evenly absolute top-[320px]">
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

      <MealsIndex />
   
   
    </div>
  );
}

export default Home;
