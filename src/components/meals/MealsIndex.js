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
import Lottie from "react-lottie";
import * as noResult from "../../lotties/noresult.json";
import Map from "../map/Map";
import Toggle from "../map/Toggle";

function MealIndex() {
  const [mealsIndex, setMealsIndex] = useState(null);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const inputData = useAtomValue(inputDataAtom);
  const setInputData = useSetAtom(inputDataAtom);
  const [price, setPrice] = useState([0, 30]);
  const [places, setPlaces] = useState(0);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [mapVisib, setMapVisib] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: noResult,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    fetch(API + "meals")
      .then((res) => res.json())
      .then((data) => {
        setMealsIndex(data);
      });

    setInputData({ ...inputData, date: "" });
  }, []);

  const filteringRender = (data) => {
    const results = data

      .filter((meal) =>
        categoriesArray.length >= 1
          ? meal.categories.some((cat) => categoriesArray.includes(cat.label))
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
      .filter((meal) => places <= meal.guest_capacity - meal.guest_registered);

    if (results.length > 0) {
      return !mapVisib ? (
        <div id="meals-index-container">
          {results
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((meal, index) => (
              <MealCard key={index} mealData={meal} showAvatar={true} />
            ))}
        </div>
      ) : (
        <Map mapCenter={inputData} meals={results} />
      );
    } else {
      return (
        <div>
          <Lottie options={defaultOptions} height={400} width={500} />
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col  items-center">
      <span id="titleScroll" className=""></span>
      <SectionTitle textCenter={true}>
        {" "}
        Découvrez de nouvelle expériences culinaires autour de{" "}
        <span className="bg-green">
          {" "}
          {inputData.city !== "" ? inputData.city : "chez vous"}{" "}
        </span>
      </SectionTitle>
      <div
        className={`category-slider flex gap-10 my-10 border-b border-grey-border pb-3`}
      >
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            setCategoriesArray={setCategoriesArray}
            categoriesArray={categoriesArray}
            label={category.label}
            icon={category.icon}
          />
        ))}
      </div>

      <div className="items-filter relative w-full flex justify-around items-center mb-5">
        <div className="relative">
          <FilterButton
            setVisibleFilter={setVisibleFilter}
            visibleFilter={visibleFilter}
          />

          <div
            className={` filter-container bg-white absolute rounded-xl left-0 top-14 z-10 w-[380px] h-[0px] transition-all ${
              visibleFilter && "h-[160px]"
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
        <div className="flex  ">
          <Toggle setBoolean={setMapVisib} boolean={mapVisib} name="map" />
          <span className="ml-3 text-sm font-medium text-grey dark:text-grey">
            Map view
          </span>
        </div>
      </div>

      {mealsIndex ? (
        filteringRender(mealsIndex)
      ) : (
        <Loader type="spinningBubbles" color="#292929" />
      )}
    </div>
  );
}

export default MealIndex;
