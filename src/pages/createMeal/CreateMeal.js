import React, { useEffect, useState } from "react";
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
import imgCreateMeal from "../../assets/images/imgCreateMeal.png";
import { useNavigate } from "react-router-dom";
import LayoutBlur from "../../components/layout/LayoutBlur/LayoutBlur";
import JSConfetti from "js-confetti";
import ScrollReveal from "scrollreveal";
import { slideUp } from "../../components/animations/Animations";
import "./createmeal.css";
import APIManager from "../../services/Api";
import Arrow from "../../icons/Arrow";
import ArrowLeft from "../../icons/ArrowLeft";
import Check from "../../icons/Check";
import env from "react-dotenv";

const CreateMeal = () => {
  const token = Cookies.get("token");
  const [autocomplete, setAutocomplete] = useState();
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);
  const [cityInfo, setCityInfo] = useState();
  const [startDate, setStartDate] = useState();
  const [nextStep, setNextStep] = useState("firstStep");
  const [count, setCount] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [mealId, setMealId] = useState(0);
  const [formData, setFormData] = useState();
  const [formErrors, setFormErrors] = useState();

  document.documentElement.scrollTop = 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const jsConfetti = new JSConfetti();

  const isDataValid = (data) => {
    return !!(
      data.title.length >= 3 &&
      data.description.length >= 10 &&
      data.categories &&
      cityInfo &&
      startDate
    );
  };

  const onSubmit = async (data) => {
    console.log("data onSubmit", data, cityInfo, startDate);
    setFormErrors({
      title: data.title.length < 3 && "Titre trop court.",
      description: data.description.length < 10 && "Description trop courte.",
      categories: !data.categories && "Sélectionner 1 catégorie minimum.",
      location: cityInfo === undefined && "L'adresse est requise.",
      starting_date: startDate === undefined && "La date du repas est requise.",
    });

    setFormData(data);

    if (isDataValid(data)) {
      const imagesUrl = new FormData();
      for (let i = 0; i < data.image_urls.length; i++) {
        imagesUrl.append("meal[images][]", data.image_urls[i]);
      }

      await APIManager.create("meals", {
        title: data.title,
        description: data.description,
        price: data.price,
        location: {
          city: cityInfo ? cityInfo.city : data.location.city,
          lat: cityInfo ? cityInfo.lat : data.location.lat,
          lon: cityInfo ? cityInfo.lon : data.location.lon,
          address: cityInfo ? cityInfo.formatted : data.location.address,
        },
        guest_capacity: data.guest_capacity,
        starting_date: startDate,
        animals: data.animals,
        alcool: data.alcool,
        doggybag: data.doggybag,
        diet_type: data.dietType,
        allergens: data.allergens,
      })
        .then((res) => {
          console.log("res FROM CREATE MEAL REQUEST => ", res);
          postCategoriesInfo(data.categories, res.id);
          data.image_urls.length !== 0 && postImages(res.id, imagesUrl);
          setMealId(res.id);
          jsConfetti.addConfetti();
          setShowConfirmation(true);
        })
        .catch((error) =>
          console.error("error FROM CREATE MEAL REQUEST =>", error.message)
        );
    } else {
      return <p> Données invalides.</p>;
    }
  };

  const postCategoriesInfo = async (categoriesArray, mealId) => {
    await categoriesArray.map((category) => {
      APIManager.create("join_categories", {
        join_category_meal: {
          meal_id: mealId,
          category_id: parseInt(category),
        },
      })
        .then((res) =>
          console.log("res FROM postCategoriesInfo REQUEST => ", res)
        )
        .catch((error) =>
          console.error("error from postCategoriesInfo REQUEST => ", error)
        );

      //OLD request : will be removed
      // fetch(API + "join_categories", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     join_category_meal: {
      //       meal_id: mealId,
      //       category_id: parseInt(category),
      //     }
      //   })
      // })
    });
  };

  const postImages = async (mealId, data) => {
    console.log("data from postImages", data);

    // APIManager.postImages(mealId, data)
    // .then(res => console.log('res FROM postImages REQUEST => ', res))
    // .catch(error => console.log('error FROM postImages REQUEST => ', error.message))

    // The following request is not using axios like others requests (because of content-type probably).
    const requestOptions = {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    };
    fetch(API + `meals/${mealId}`, requestOptions)
      .then((response) => response.json())
      .then((res) => console.log(res));
  };

  const getLocationData = async (e) => {
    if (e.target.value.length > 4) {
      await APIManager.getLocationData(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${e.target.value}&format=json&apiKey=${env.REACT_APP_GEOAPIFY_KEY}`
      )
        .then((res) => {
          console.log("res FROM getCityData REQUEST => ", res);
          setAutocompleteVisible(true);
          setAutocomplete(res);
        })
        .catch((error) =>
          console.error("error FROM getCityData REQUEST => ", error.message)
        );
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

  useEffect(() => {
    ScrollReveal().reveal(".slide", slideUp);
  }, []);

  return (
    <div className="flex">
      {showConfirmation && (
        <LayoutBlur>
          <div className="flex flex-col items-center">
            <SectionTitle> Bravo ! 🎉 </SectionTitle>
            <p className="text-center font-book-font mt-6 mb-8">
              {" "}
              Tu peux désormais voir, supprimer et <br /> modifier ton repas
              dans ton <span className="bg-pink"> compte client </span>{" "}
            </p>
            <span onClick={() => navigate("/")}>
              <Button showText={true}> Continuer ma navigation </Button>
            </span>
            <p
              className="underline hover:cursor-pointer mt-3 text-sm font-book-font"
              onClick={() => navigate(`/meals/${mealId}`)}
            >
              {" "}
              Voir l'aperçu de mon repas
            </p>
          </div>
        </LayoutBlur>
      )}
      <div className="w-2/6 h-screen bg-green flex justify-center items-center -z-10 top-0 show-image">
        <img className="w-96" alt="createmeal" src={imgCreateMeal} />{" "}
      </div>

      <div className="p-32 pb-0 w-4/6">
        <HeroTitle>
          <span className="text-black slide"> Étape 0{count}/04 </span>
        </HeroTitle>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[600px] flex flex-col gap-3 mt-4 mb-6 slide"
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
                  {...register("title", { required: true })}
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
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center gap-2">
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
              <span onClick={() => gotoNextStep("secondStep", "title")}>
                <Button showText={true} showIcon={true} icon={<Arrow />}>
                  {" "}
                  Suivant{" "}
                </Button>
              </span>
            </>
          )}

          {nextStep === "secondStep" && (
            <div
              className={`${nextStep === "secondStep" && "slide-in-bottom"}`}
            >
              <SectionTitle> Mais encore ... </SectionTitle>
              <div className="flex gap-8 mt-8 ">
                <div className="flex flex-col  w-full">
                  <p> A quel prix ? (24€ max)</p>
                  <input
                    className={`border border-grey-border w-full  h-14 pl-3 placeholder:font-light-font placeholder:text-sm rounded-md  ${errorInput(
                      errors.price
                    )}`}
                    placeholder="Ex : 12€"
                    type="number"
                    min={0}
                    max={24}
                    onKeyDown={(e) => e.preventDefault()}
                    {...register("price", errorMessageValues.price)}
                  />
                  {errorMessage(errors.price)}
                </div>
                <div className="flex flex-col  w-full">
                  <p> Combien de convives ? (11 max)</p>
                  <input
                    className={`border border-grey-border  w-full  h-14 pl-3 placeholder:font-light-font placeholder:text-sm rounded-md  ${errorInput(
                      errors.guest_capacity
                    )}`}
                    placeholder="Ex : 4 invités"
                    type="number"
                    min={1}
                    max={11}
                    onKeyDown={(e) => e.preventDefault()}
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
                  onChange={getLocationData}
                  type="text"
                  id="inputAddress"
                  autoComplete="off"
                  // {...register("location", errorMessageValues.location)}
                />
                {autocompleteVisible && (
                  <div className="border border-slate-500 rounded-xl p-3 absolute top-20 z-10 bg-white">
                    {" "}
                    {autocomplete &&
                      autocomplete.results.map((res, index) => (
                        <Autocompletion
                          key={index}
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
                  <Button
                    showText={true}
                    showIconLeft={true}
                    icon={<ArrowLeft />}
                  >
                    {" "}
                    Précedent{" "}
                  </Button>
                </span>
                <span onClick={() => gotoNextStep("thirdStep")}>
                  <Button showText={true} showIcon={true} icon={<Arrow />}>
                    {" "}
                    Suivant{" "}
                  </Button>
                </span>
              </div>
            </div>
          )}

          {nextStep === "thirdStep" && (
            <div className={`${nextStep === "thirdStep" && "slide-in-bottom"}`}>
              <SectionTitle> Des infos supplémentaires ? </SectionTitle>
              <p className="mt-5"> Des spécificités ? </p>
              <div className="flex gap-3 mt-2">
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
              <p className="mt-5"> Un régime alimentaire particulier ? </p>
              <div className="flex gap-3 mt-2">
                {dietType.map((dietT, index) => (
                  <div key={index} className="flex items-center gap-2">
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
              <p className="mt-5"> Des allergies ? </p>
              <div className="flex gap-3 mt-2">
                {allergens.map((allergen, index) => (
                  <div key={index} className="flex items-center gap-2">
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
                  <Button
                    showText={true}
                    showIconLeft={true}
                    icon={<ArrowLeft />}
                  >
                    {" "}
                    Précedent{" "}
                  </Button>
                </span>
                <span onClick={() => gotoNextStep("fourthStep")}>
                  <Button showText={true} showIcon={true} icon={<Arrow />}>
                    {" "}
                    Suivant{" "}
                  </Button>
                </span>
              </div>
            </div>
          )}

          {nextStep === "fourthStep" && (
            <div
              className={`${nextStep === "fourthStep" && "slide-in-bottom"}`}
            >
              <SectionTitle> Ajouter des images </SectionTitle>
              <input
                type="file"
                className="mt-3 block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green file:text-violet-700 hover:file:bg-violet-100 file:cursor-pointer file:hover:bg-green_light"
                name="images"
                id="images"
                required
                multiple={true}
                {...register("image_urls")}
              />

              <div className="flex items-center gap-4 mt-8">
                <span onClick={() => gotoPreviousStep("thirdStep")}>
                  <Button
                    showText={true}
                    showIconLeft={true}
                    icon={<ArrowLeft />}
                  >
                    {" "}
                    Précedent{" "}
                  </Button>
                </span>

                <button type="submit" className="my-2 flex justify-center">
                  <Button showText={true} showIcon={true} icon={<Check />}>
                    Créer un repas
                  </Button>
                </button>
              </div>

              {formData && !isDataValid(formData) && (
                <div>
                  <p className="text-sm text-black font-book-font">
                    Veuillez vérifier les informations suivantes :
                  </p>
                  {Object.values(formErrors).map((error, index) => {
                    return (
                      <p
                        key={index}
                        className="text-sm text-red font-book-font"
                      >
                        {error}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateMeal;
