import SectionTitle from "../titles/SectionTitle";
import {
  errorInput,
  errorMessage,
  errorMessageValues,
} from "../authentication/errors";
import { categories } from "../../data/Category";
import Autocompletion from "../geolocation/Autocompletion";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
import { dietType } from "../../data/DietType";
import { allergens } from "../../data/Allergens";
import Button from "../actions/Button";
import Close from "../../icons/Close";
import React, { useState, useEffect } from "react";
import { API } from "../../utils/variables";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

function MealEditForm({ mealData, setShowEdit, forceUpdate }) {
  const [autocomplete, setAutocomplete] = useState();
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date(mealData.starting_date));
  const [cityInfo, setCityInfo] = useState();
  const [joinCategoryArray, setJoinCategoryArray] = useState();
  const token = Cookies.get("token");
  const [formErrors, setFormErrors] = useState();
  const [formData, setFormData] = useState();
  const [inputEmpty, setInputempty] = useState();
  registerLocale("fr", fr);

  useEffect(() => {
    fetch(API + `meals/${mealData.id}`).then((res) => {
      res
        .json()
        .then((response) => setJoinCategoryArray(response.joinCategoryMealIds));
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isDataValid = (data) => {
    return data.categories.length > 0 && inputEmpty !== "" && startDate
      ? true
      : false;
  };

  const submitData = (data) => {
    setFormData(data);
    setFormErrors({
      categories:
        data.categories.length === 0 && "Veuillez saisir au moins 1 catégorie",

      location: inputEmpty === "" && "L'adresse est requise.",
      starting_date: startDate === undefined && "La date du repas est requise.",
    });
    if (isDataValid(data)) {
      fetch(API + `meals/${mealData.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          meal: {
            title: data.title,
            description: data.description,
            price: data.price,
            location: {
              city: cityInfo ? cityInfo.city : mealData.location.city,
              lat: cityInfo ? cityInfo.lat : mealData.location.lat,
              lon: cityInfo ? cityInfo.lon : mealData.location.lon,
              address: cityInfo
                ? cityInfo.formatted
                : mealData.location.address,
            },
            guest_capacity: data.guest_capacity,
            starting_date: startDate,
            animals: data.animals,
            alcool: data.alcool,
            doggybag: data.doggybag,
            diet_type: data.dietType,
            allergens: data.allergens,
          },
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          console.log(res);
          deleteCategoryInfo(joinCategoryArray, data.categories, res.id);
          setShowEdit(false);
          forceUpdate();
        });
    }
  };

  const deleteCategoryInfo = async (arrayToDelete, dataCategory, mealId) => {
    arrayToDelete.map((categoryId) => {
      fetch(API + `join_categories/${categoryId}`, {
        method: "DELETE",
      });
    });

    await postCategoriesInfo(dataCategory, mealId);
  };

  const postCategoriesInfo = (categoriesArray, mealId) => {
    categoriesArray.map((category) => {
      fetch(API + "join_categories", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          join_category_meal: {
            meal_id: mealId,
            category_id: parseInt(category),
          },
        }),
      });
    });
  };

  const getData = (e) => {
    if (e.target.value.length > 4) {
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${e.target.value}&format=json&apiKey=9aa5158850824f25b76a238e1d875cc8`
      )
        .then((response) => response.json())
        .then((data) => {
          setAutocompleteVisible(true);
          setAutocomplete(data);
        })
        .catch((err) => console.error(err));
    } else {
      setAutocompleteVisible(false);
    }
  };

  const getCategoryChecked = (categoryId) => {
    return !!mealData.categories.find((c) => c.id === categoryId);
  };

  const getDataChecked = (data, dataToCheck) => {
    return !!data.includes(dataToCheck);
  };

  return (
    <>
      <SectionTitle>Modifier votre repas</SectionTitle>
      <form
        className="max-h-[500px] pb-14 mt-3 overflow-scroll"
        onSubmit={handleSubmit(submitData)}
      >
        <div className="flex flex-col mt-8">
          <p> Titre </p>
          <input
            className={`border border-grey-border  h-14 pl-3 placeholder:font-light-font placeholder:text-sm rounded-md  ${errorInput(
              errors.title
            )}`}
            defaultValue={mealData.title}
            placeholder="Quel est le titre de la recette ?"
            type="text"
            {...register("title", errorMessageValues.title)}
          />
          {errorMessage(errors.title)}
        </div>
        <div className="flex flex-col">
          <p className="mt-3"> Description </p>
          <input
            className={`border border-grey-border  h-14 pl-3 placeholder:font-light-font placeholder:text-sm rounded-md  ${errorInput(
              errors.description
            )}`}
            defaultValue={mealData.description}
            placeholder="Décrivez un peu plus ... ?"
            type="text"
            {...register("description", errorMessageValues.description)}
          />
          {errorMessage(errors.description)}
        </div>
        <div className="mb-2">
          <p className="my-3"> Sélectionnez une ou plusieurs catégories </p>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <div className="flex items-center gap-2">
                <input
                  defaultChecked={getCategoryChecked(category.id)}
                  type="checkbox"
                  id={category.id}
                  value={category.id}
                  className={`hidden peer`}
                  {...register(`categories`, errorMessageValues.categories)}
                />
                {errorMessage(errors.categories)}
                <label
                  htmlFor={category.id}
                  className="inline-flex justify-between items-center px-3 py-1 rounded-full w-full text-grey bg-white text-sm font-book-font  border  cursor-pointer  peer-checked:bg-green hover:text-black  peer-checked:text-black hover:bg-green_light"
                >
                  {" "}
                  {category.label}{" "}
                </label>
              </div>
            ))}
          </div>
          {formData && !isDataValid(formData) && (
            <p className="text-sm text-red font-book-font">
              {" "}
              {formErrors.categories}{" "}
            </p>
          )}
        </div>
        <div className="flex gap-8 mt-8">
          <div className="flex flex-col  w-full">
            <p> A quel prix ? </p>
            <input
              className={`border border-grey-border w-full  h-14 pl-3 placeholder:font-light-font placeholder:text-sm rounded-md  ${errorInput(
                errors.price
              )}`}
              defaultValue={mealData.price}
              placeholder="Ex : 12€"
              type="number"
              max={24}
              min={0}
              onKeyDown={(e) => e.preventDefault()}
              {...register("price", errorMessageValues.price)}
            />
            {errorMessage(errors.price)}
          </div>
          <div className="flex flex-col  w-full">
            <p> Combien de convives maximum ? </p>
            <input
              className={`border border-grey-border  w-full  h-14 pl-3 placeholder:font-light-font placeholder:text-sm rounded-md  ${errorInput(
                errors.guest_capacity
              )}`}
              max={12}
              min={1}
              defaultValue={mealData.guest_capacity}
              placeholder="Ex : 4 invités"
              type="number"
              onKeyDown={(e) => e.preventDefault()}
              {...register("guest_capacity", errorMessageValues.guest_capacity)}
            />
            {errorMessage(errors.guest_capacity)}
          </div>
        </div>
        <div className="flex flex-col relative mt-3">
          <p> A quelle adresse ?</p>
          <input
            className={`border border-grey-border  h-14 pl-3 placeholder:font-light-font placeholder:text-sm rounded-md  ${errorInput(
              errors.location
            )}`}
            placeholder="Votre adresse"
            defaultValue={mealData.location.address}
            onChange={getData}
            onInput={(e) => setInputempty(e.target.value)}
            type="text"
            id="inputAddress"
            // {...register("location", errorMessageValues.location)}
          />
          {autocompleteVisible && (
            <div className="border border-slate-500 rounded-xl p-3 absolute top-20 z-10 bg-white">
              {" "}
              {autocomplete &&
                autocomplete.results.map((res) => (
                  <Autocompletion
                    res={res}
                    setCityInfo={setCityInfo}
                    setAutocompleteVisible={setAutocompleteVisible}
                    origin="createMeal"
                  />
                ))}{" "}
            </div>
          )}
        </div>
        {formData && !isDataValid(formData) && (
          <p className="text-sm text-red font-book-font">
            {" "}
            {formErrors.location}{" "}
          </p>
        )}
        <div className="flex items-center gap-2 my-5">
          <label className="text-md min-w-[80px]"> A quelle date ?</label>
          <span className="text-sm font-light-font">
            {" "}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="d MMMM yyyy"
              locale="fr"
            />{" "}
          </span>
        </div>
        {formData && !isDataValid(formData) && (
          <p className="text-sm text-red font-book-font">
            {" "}
            {formErrors.starting_date}{" "}
          </p>
        )}
        <p className="my-3"> Des spécificités ? </p>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={mealData.animals}
              id="animals"
              className="hidden peer"
              {...register("animals")}
            />
            <label
              htmlFor="animals"
              className="inline-flex justify-between items-center px-3 py-1 rounded-full w-full text-grey bg-white text-sm font-book-font  border  cursor-pointer  peer-checked:bg-green hover:text-black  peer-checked:text-black hover:bg-green_light"
            >
              Animaux
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={mealData.alcool}
              id="alcool"
              className="hidden peer"
              {...register("alcool")}
            />
            <label
              htmlFor="alcool"
              className="inline-flex justify-between items-center px-3 py-1 rounded-full w-full text-grey bg-white text-sm font-book-font  border  cursor-pointer  peer-checked:bg-green hover:text-black  peer-checked:text-black hover:bg-green_light"
            >
              Alcool
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={mealData.doggybag}
              id="doggybag"
              className="hidden peer"
              {...register("doggybag")}
            />
            <label
              htmlFor="doggybag"
              className="inline-flex justify-between items-center px-3 py-1 rounded-full w-full text-grey bg-white text-sm font-book-font  border  cursor-pointer  peer-checked:bg-green hover:text-black  peer-checked:text-black hover:bg-green_light"
            >
              DoggyBag
            </label>
          </div>
        </div>
        <p className="my-3"> Un régime alimentaire particulier ? </p>
        <div className="flex gap-3">
          {dietType.map((dietT) => (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={getDataChecked(mealData.diet_type, dietT.label)}
                id={dietT.label}
                value={dietT.label}
                className={`hidden peer`}
                {...register(`dietType`)}
              />
              <label
                htmlFor={dietT.label}
                className="inline-flex justify-between items-center px-3 py-1 rounded-full w-full text-grey bg-white text-sm font-book-font  border  cursor-pointer  peer-checked:bg-green hover:text-black  peer-checked:text-black hover:bg-green_light"
              >
                {" "}
                {dietT.label}{" "}
              </label>
            </div>
          ))}
        </div>
        <p className="my-3"> Des allergies ? </p>
        <div className="flex gap-3">
          {allergens.map((allergen) => (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={getDataChecked(
                  mealData.allergens,
                  allergen.label
                )}
                id={allergen.label}
                value={allergen.label}
                className={`hidden peer`}
                {...register(`allergens`)}
              />
              <label
                htmlFor={allergen.label}
                className="inline-flex justify-between items-center px-3 py-1 rounded-full w-full text-grey bg-white text-sm font-book-font  border  cursor-pointer  peer-checked:bg-green hover:text-black  peer-checked:text-black hover:bg-green_light"
              >
                {" "}
                {allergen.label}{" "}
              </label>
            </div>
          ))}
        </div>
        <span
          className="absolute top-5 right-5"
          onClick={() => setShowEdit(false)}
        >
          <Button showIcon={true} icon={<Close />}></Button>
        </span>
        <button
          type="submit"
          className="my-2 flex justify-center fixed bottom-4 left-[40%]"
        >
          <Button showText> Modifier mon repas </Button>
        </button>
      </form>
    </>
  );
}

export default MealEditForm;
