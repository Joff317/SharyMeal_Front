import React, { useEffect, useState } from "react";
import { API } from "../../utils/variables";
import MealCard from "./mealCard/MealCard";
import "./MealsIndex.scss";
import SectionTitle from "../titles/SectionTitle";
import CategoryItem from "../actions/CategoryItem";
import { categories } from "../../data/Category";
import { useAtomValue } from "jotai";
import { inputDataAtom } from "../../atoms/inputData";
import FilterButton from "../filters/FilterButton";
import PriceFilter from "../priceFilter/PriceFilter";

function MealIndex() {
  const [mealsIndex, setMealsIndex] = useState(null);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const inputData = useAtomValue(inputDataAtom);
  const [price, setPrice] = useState([0, 30]);
  const [visibleFilter, setVisibleFilter] = useState(false);

  useEffect(() => {
    // console.log("API", API);

    fetch(API + "meals")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMealsIndex(data);
      });
  }, []);

  // console.log(mealsIndex);

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

    <div className="relative w-full px-52">


      <FilterButton
        setVisibleFilter={setVisibleFilter}
        visibleFilter={visibleFilter}
      />


      <div
        className={` filter-container bg-white absolute top-8 z-10 w-[500px] h-[0px] transition-all ${
          visibleFilter && "h-[150px]"
        }`}
      >
        {visibleFilter && <PriceFilter setPrice={setPrice} price={price} />}
      </div>
    </div> 

      <div id="meals-index-container">
        {mealsIndex &&
          mealsIndex
            .filter((meal) =>
              categoriesArray.length >= 1
                ? meal.categories.some((cat) =>
                    categoriesArray.includes(cat.label)
                  )
                : mealsIndex
            )
            .filter((meal) =>
              inputData.city !== ""
                ? meal.location.city === inputData.city
                : mealsIndex
            )
            .filter((meal) =>
              inputData.date !== ""
                ? new Date(meal.starting_date) >= new Date(inputData.date)
                : mealsIndex
            )
            .filter((meal) => meal.price > price[0] && meal.price < price[1])
            .map((meal) => <MealCard mealData={meal} />)}
      </div>
    </div>
  );
}

export default MealIndex;
