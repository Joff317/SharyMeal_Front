import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { API } from "../../utils/variables";
import {
  errorMessage,
  errorInput,
  errorMessageValues,
} from "../../components/authentication/errors";
import Autocompletion from "../../components/geolocation/Autocompletion";
import Button from "../../components/actions/Button";
import DatePicker from "react-datepicker";
import { categories } from "../../data/Category";
import HeroTitle from "../../components/titles/HeroTitle";
import SectionTitle from "../../components/titles/SectionTitle";
import { dietType } from "../../data/DietType";
import { allergens } from "../../data/Allergens";

const CreateMeal = () => {
  const token = Cookies.get("token");
  const [autocomplete, setAutocomplete] = useState();
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);
  const [cityInfo, setCityInfo] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [nextStep, setNextStep] = useState("firstStep");
  const [count, setCount] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    fetch(API + "meals", {
      method: "POST",
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
            city: cityInfo.city,
            lat: cityInfo.lat,
            lon: cityInfo.lon,
            address: cityInfo.formatted,
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
        postCategoriesInfo(data.categories, res.id);
      });
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

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const gotoNextStep = (value) => {
    setNextStep(value);
    increment();
  };

  const gotoPreviousStep = (value) => {
    setNextStep(value);
    decrement();
  };

  return (
    <div className="flex">
      <div className="w-2/6 h-screen bg-green sticky top-0"></div>
      <div className="p-32 pb-0 w-4/6">
        <HeroTitle>
          <span className="text-black"> {count}/3 </span>
        </HeroTitle>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[600px] flex flex-col gap-3 mt-4 mb-6"
        >
          {nextStep === "firstStep" && (
            <>
              <SectionTitle> Parlez nous de votre recette ... </SectionTitle>
              <div className="flex flex-col mt-8">
                <p> Titre </p>
                <input
                  className={`border border-grey-border  h-14 pl-3 placeholder:font-light-font placeholder:text-sm rounded-md  ${errorInput(
                    errors.title
                  )}`}
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
                  placeholder="Décrivez un peu plus ... ?"
                  type="text"
                  {...register("description", errorMessageValues.description)}
                />
                {errorMessage(errors.description)}
              </div>
              <div className="mb-2">
                <p className="my-3">
                  {" "}
                  Sélectionnez une ou plusieurs catégories{" "}
                </p>

                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={category.id}
                        value={category.id}
                        className={`hidden peer`}
                        {...register(`categories`)}
                      />
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
              </div>
              <span onClick={() => gotoNextStep("secondStep")}>
                <Button showText={true}> Suivant </Button>
              </span>
            </>
          )}

          {nextStep === "secondStep" && (
            <>
              <SectionTitle> Mais encore ... </SectionTitle>
              <div className="flex gap-8 mt-8">
                <div className="flex flex-col  w-full">
                  <p> A quel prix ? </p>
                  <input
                    className={`border border-grey-border w-full  h-14 pl-3 placeholder:font-light-font placeholder:text-sm rounded-md  ${errorInput(
                      errors.price
                    )}`}
                    placeholder="Ex : 12€"
                    type="number"
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
                    placeholder="Ex : 4 invités"
                    type="number"
                    {...register(
                      "guest_capacity",
                      errorMessageValues.guest_capacity
                    )}
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
                  onChange={getData}
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
                {errorMessage(errors.location)}
              </div>
              <div className="flex items-center gap-2 my-5">
                <label className="text-md min-w-[80px]"> A quelle date ?</label>

                <span className="text-sm font-light-font">
                  {" "}
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />{" "}
                </span>
              </div>

              <div className="flex mt-6 gap-4">
                <span onClick={() => gotoPreviousStep("firstStep")}>
                  <Button showText={true}> Précedent </Button>
                </span>
                <span onClick={() => gotoNextStep("thirdStep")}>
                  <Button showText={true}> Suivant </Button>
                </span>
              </div>
            </>
          )}

          {nextStep === "thirdStep" && (
            <>
              <SectionTitle> Des infos supplémentaires ? </SectionTitle>
              <p className="mt-3"> Des spécificités ? </p>
              <div className="flex gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
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
              <p className="mt-3"> Un régime alimentaire particulier ? </p>
              <div className="flex gap-3">
                {dietType.map((dietT) => (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
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
              <p className="mt-3"> Des allergies ? </p>
              <div className="flex gap-3">
                {allergens.map((allergen) => (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
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
              <div className="flex items-center gap-4 mt-8">
                <span onClick={() => gotoPreviousStep("secondStep")}>
                  <Button showText={true}> Précedent </Button>
                </span>
                <button type="submit" className="my-2 flex justify-center">
                  <Button showText={true}>Créer un repas</Button>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateMeal;
