import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { loggedAtom } from "../../atoms/loggedAtom";
import "./Home.css";
import Button from "../../components/actions/Button";
import Arrow from "../../icons/Arrow";
import HeroTitle from "../../components/titles/HeroTitle";
import SectionTitle from "../../components/titles/SectionTitle";
import SubsectionTitle from "../../components/titles/SubsectionTitle";
import CategoryItem from "../../components/actions/CategoryItem";
import Sushi from "../../icons/Sushi";
import AvatarForm from "../../components/user/AvatarForm";
import MealImagesForm from "../../components/meals/MealImagesForm";
import Navigation from "../../components/layout/Navigation/Navigation";
import image1 from "../../assets/images/imagehome1.jpeg";
import image2 from "../../assets/images/imagehome2.jpeg";
import image3 from "../../assets/images/imagehome3.jpeg";

function Home(props) {
  const loggedd = useAtomValue(loggedAtom);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [meals, setMeals] = useState([
    {
      name: "sushi",
      description: "super plat",
      category: ["Sushi", "Marocain", "Poisson"],
    },
    {
      name: "Pizza",
      description: "super plat",
      category: ["Pizza", "Sea Food", "Vegetables"],
    },
  ]);

  const categories = [
    {
      label: "Sushi",
      icon: <Sushi />,
    },
    {
      label: "Pizza",
      icon: <Sushi />,
    },
    {
      label: "Vegetables",
      icon: <Sushi />,
    },
  ];

  console.log(categoriesArray);

  return (
    <div className="home-container">
      <div className="top-container">
        <div className="text-container">
          <HeroTitle> Meet. Share. Eat. </HeroTitle>
          <div className="under-title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            semper nisl nec sociis.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Praesent semper nisl
          </div>
        </div>
      </div>
      <div className="image-container">
        <img src={image1} alt="" className="image_1" />
        <img src={image2} alt="" className="image_2" />
        <div className="image-button">
          <img src={image3} alt="" className="image_3" />
          <button className="absolute">
            <Button showText={true} showIcon={true}>
              About us <Arrow />
            </Button>
          </button>
        </div>
      </div>
      <SectionTitle> Section Title </SectionTitle>
      <SubsectionTitle> Sub Section Title </SubsectionTitle>
      //
      <Button icon={<Arrow />} />
      <Button icon={<Arrow />} showText={true}>
        Mon text
      </Button>
      //
      <div className={`flex gap-2`}>
        {categories.map((category) => (
          <CategoryItem
            setCategoriesArray={setCategoriesArray}
            categoriesArray={categoriesArray}
            label={category.label}
            icon={category.icon}
          />
        ))}
      </div>
      <div>
        {meals &&
          meals
            .filter((meal) =>
              meal.category.some((cat) => categoriesArray.includes(cat))
            )
            .map((meal) => <p> {meal.name} </p>)}
      </div>
      {loggedd && <h1 className="title">Hello</h1>}
      <AvatarForm />
      <MealImagesForm />
    </div>
  );
}

export default Home;
