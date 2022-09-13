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
    <div className="card">
      <HeroTitle> Hero Title </HeroTitle>
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
    </div>
  );
}

export default Home;
