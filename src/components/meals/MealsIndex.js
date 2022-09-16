import React, { useEffect, useState } from "react";
import { API } from "../../utils/variables";
import MealCard from "./mealCard/MealCard";
import "./MealsIndex.scss";
import SectionTitle from "../titles/SectionTitle";
import CategoryItem from "../actions/CategoryItem";
import { categories } from "../../data/Category";
import { useAtomValue, useSetAtom } from "jotai";
import { inputDataAtom } from "../../atoms/inputData";
import FilterButton from "../filters/FilterButton";
import PriceFilter from "../filters/priceFilter/PriceFilter";
import PlacesFilter from "../filters/placesFilter/PlacesFilter";
import Loader from "../Loader";

function MealIndex() {
  const [mealsIndex, setMealsIndex] = useState(null);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const inputData = useAtomValue(inputDataAtom);
  const setInputData = useSetAtom(inputDataAtom);
  const [price, setPrice] = useState([0, 30]);
  const [places, setPlaces] = useState(0);
  const [visibleFilter, setVisibleFilter] = useState(false);

  useEffect(() => {
    fetch(API + "meals")
      .then((res) => res.json())
      .then((data) => {
        setMealsIndex(data);
      });

      setInputData({
        city: "",
        date: "",
      })
  }, []);

  return (
    <div className="flex flex-col  items-center">
      <span id="titleScroll" className=""></span>
      <SectionTitle textCenter={true}>
        {" "}
        Discover food experiences around{" "}
        <span className="bg-green"> {inputData ? inputData.city : "you"} </span>
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
          {visibleFilter && (
            <>
              <PriceFilter setPrice={setPrice} price={price} />
              <PlacesFilter places={places} setPlaces={setPlaces} />
            </>
          )}
        </div>
      </div>

      
        {
          mealsIndex ? <div id="meals-index-container">
                        {mealsIndex
                          .filter((meal) =>
                                      categoriesArray.length >= 1
                                        ? meal.categories.some((cat) =>
                                            categoriesArray.includes(cat.label)
                                          )
                                        : mealsIndex
                                    )
                        .filter((meal) =>
                                      inputData && inputData.city !== ""
                                        ? meal.location.city === inputData.city
                                        : mealsIndex
                                    )
                        .filter((meal) =>
                                      inputData && inputData.date !== ""
                                        ? new Date(meal.starting_date) >= new Date(inputData.date)
                                        : mealsIndex
                                    )
                        .filter((meal) => meal.price >= price[0] && meal.price <= price[1])
                        .filter((meal) => places <= meal.guest_capacity - meal.guest_registered)
                        .map((meal) =><MealCard mealData={meal} />)}
                        </div>
                      :
                      <Loader type="spinningBubbles" color="#292929"/>
          }
    </div>
  );
}

export default MealIndex;
