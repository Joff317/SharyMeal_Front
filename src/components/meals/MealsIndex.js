import React, { useEffect, useState } from "react";
import { API } from "../../utils/variables";
import MealCard from "./mealCard/MealCard";
import "./MealsIndex.scss";
import SectionTitle from "../titles/SectionTitle";
import CategoryItem from "../actions/CategoryItem";
import { categories } from "../../data/Category";
import { useAtomValue } from "jotai";
import { inputDataAtom } from "../../atoms/inputData";

function MealIndex() {
  const [mealsIndex, setMealsIndex] = useState(null);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const inputData = useAtomValue(inputDataAtom);
  const [meals, setMeals] = useState([
    {
      name: "sushi",
      description: "super plat",
      category: ["Sushi", "Marocain", "Poisson"],
      categories: [
        {
          label: "Sushi",
        },
        { label: "Marocain" },
      ],
    },
    {
      name: "Pizza",
      description: "super plat",
      category: ["Pizza", "Sea Food", "Vegetables"],
    },
  ]);

  useEffect(() => {
    console.log("API", API);

    fetch(API + "meals")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMealsIndex(data);
      });
  }, []);

  return (
    <div className="flex flex-col  items-center">
      <SectionTitle textCenter={true}>
        {" "}
        Discover food experiences around you{" "}
      </SectionTitle>
      <div className={`flex gap-10 my-10 border-b border-grey-border pb-3`}>
        {categories.map((category) => (
          <CategoryItem
            setCategoriesArray={setCategoriesArray}
            categoriesArray={categoriesArray}
            label={category.label}
            icon={category.icon}
          />
        ))}
      </div>

      <div id="meals-index-container">

{mealsIndex &&
  mealsIndex
    .filter((meal) =>
      categoriesArray.length >= 1
        ? (meal.categories.some((cat) =>
            categoriesArray.includes(cat.label)
        ))
        : mealsIndex
    )
    .filter((meal) => 
      inputData.city !== "" ?
      meal.location.city === inputData.city :
      mealsIndex
    )
    .map((meal) => <MealCard mealData={meal} />)}

      </div>
    </div>
  );
}

export default MealIndex;


