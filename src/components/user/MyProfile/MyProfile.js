import React, { useEffect } from "react";
import Button from "../../actions/Button";
import SubsectionTitle from "../../titles/SubsectionTitle";
import { useForm } from "react-hook-form";
import {
  errorMessageValues,
  errorInput,
  errorMessage,
} from "../../authentication/errors";
import "./MyProfile.scss";
import { useState } from "react";
import Autocompletion from "../../geolocation/Autocompletion";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { currentuserAtom } from "../../../atoms/loggedAtom";
import DisplayReviews from "../../reviews/DisplayReviews";
import ScrollReveal from "scrollreveal";
import { slideUpFast } from "../../animations/Animations";
import APIManager from "../../../services/Api";
import env from "react-dotenv";
import { API } from "../../../utils/variables";
import avatarDefault from "../../../assets/images/avatardefault.png";

function MyProfile({ currentUser, setCurrentUser, userData }) {
  const token = Cookies.get("token");
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);
  const [autocomplete, setAutocomplete] = useState(false);
  const [cityInfo, setCityInfo] = useState();
  const [editConfirmVisib, setEditConfirmVisib] = useState(false);
  const [editErrorVisib, setEditErrorVisib] = useState(false);
  const [currentUserAtom, setCurrentUserAtom] = useAtom(currentuserAtom);
  const [reviewStatus, setReviewStatus] = useState("received");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const OnSubmit = async (data) => {
    const dataAvatar = new FormData();
    dataAvatar.append("user[avatar]", data.avatar_url[0]);

    // await APIManager.updateMe("update_me", {
    //   user: {
    //     name: data.name,
    //     age: data.age,
    //     email: data.email,
    //     gender: data.gender,
    //     description: data.description,
    //     city: cityInfo ? cityInfo.city : "",
    //   },
    // })
    //   .then((res) => {
    //     console.log("res FROM UPDATE_ME REQUEST => ", res);
    //     console.log("res.status", res.status);

    //     if (res.status === 200) {
    //       setEditConfirmVisib(true);
    //       setTimeout(() => {
    //         setEditConfirmVisib(false);
    //       }, 2000);
    //       setCurrentUser(data);
    //     } else {
    //       setEditErrorVisib(true);
    //       setTimeout(() => {
    //         setEditErrorVisib(false);
    //       }, 2000);
    //     }

    //     setCurrentUserAtom({
    //       ...currentUserAtom,
    //       city: res.data.city ? res.data.city : currentUser.city,
    //       name: res.data.name,
    //       age: res.data.age,
    //       email: res.data.email,
    //       gender: res.data.gender,
    //       description: res.data.description,
    //     });
    //     data.avatar_url.length !== 0 && postAvatar(dataAvatar);
    //   })
    //   .catch((error) =>
    //     console.error("error FROM UPDATE_ME REQUEST => ", error.message)
    //   );

    // OLD request : will be removed
    fetch(API + "update_me", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user: {
          name: data.name,
          age: data.age,
          email: data.email,
          gender: data.gender,
          description: data.description,
          city: cityInfo ? cityInfo.city : "",
        },
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          setEditConfirmVisib(true);
          setTimeout(() => {
            setEditConfirmVisib(false);
          }, 2000);
          setCurrentUser(data);
        } else {
          setEditErrorVisib(true);
          setTimeout(() => {
            setEditErrorVisib(false);
          }, 2000);
        }
        return response.json();
      })
      .then((fetchData) => {
        setCurrentUserAtom({
          ...currentUserAtom,
          city: fetchData.city,
          name: fetchData.name,
          age: fetchData.age,
          email: fetchData.email,
          gender: fetchData.gender,
          description: fetchData.description,
        });
        data.avatar_url.length !== 0 && postAvatar(dataAvatar);
      })
      .catch((error) => console.log(error.message));
  };

  async function postAvatar(dataAvatar) {
    // await APIManager.edit("update_me", dataAvatar)
    //   .then((res) => {
    //     console.log("res FROM postAvatar REQUEST ", res);
    //     setCurrentUserAtom({
    //       ...currentUserAtom,
    //       avatar_url: res.avatar_url,
    //     });
    //   })
    //   .catch((error) =>
    //     console.error("error FROM postAvatar REQUEST => ", error.message)
    //   );

    // OLD request : will bre rmeoved.
    const requestOptions = {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: dataAvatar,
    };
    fetch(API + "update_me", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        setCurrentUserAtom({
          ...currentUserAtom,
          avatar_url: res.avatar_url,
        });
      });
  }

  async function getLocationData(e) {
    if (e.target.value.length > 4) {
      // await APIManager.getLocationData(
      //   `https://api.geoapify.com/v1/geocode/autocomplete?text=${e.target.value}&format=json&apiKey=${env.REACT_APP_GEOAPIFY_KEY}`
      // )
      //   .then((res) => {
      //     console.log("res FROM getLocationData REQUEST => ", res);
      //     setAutocompleteVisible(true);
      //     setAutocomplete(res);
      //   })
      //   .catch((error) =>
      //     console.error("error FROM getLocationData => ", error.message)
      //   );

      // OLD request : will be removed
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${e.target.value}&format=json&apiKey=${env.REACT_APP_GEOAPIFY_KEY}`
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
  }

  const handleVisibilities = () => {
    setEditConfirmVisib(false);
  };

  useEffect(() => {
    ScrollReveal().reveal(".slide", slideUpFast);
  }, []);

  return (
    <div className="profile-container">
      <div className="perso-infos-container">
        <SubsectionTitle>
          {" "}
          <span className=""> Mes informations persos </span>{" "}
        </SubsectionTitle>
        <div className="perso-infos-details">
          <form
            className={` w-full flex flex-col gap-10 mt-8`}
            onSubmit={handleSubmit(OnSubmit)}
          >
            <div className="flex justify-between w-full gap-14 info-first">
              <div className="flex flex-col w-full">
                <p className="mb-2"> Nom </p>
                <input
                  placeholder="Comment t'apelles tu ?"
                  defaultValue={currentUser.name && `${currentUser.name}`}
                  className={`border border-grey-border  h-14 pl-3 placeholder:font-light-font rounded-md  ${errorInput(
                    errors.name
                  )}`}
                  type="text"
                  {...register("name", errorMessageValues.name)}
                />
                {errorMessage(errors.name)}
              </div>

              <div className="flex flex-col w-full">
                <p className="mb-2"> Age </p>
                <input
                  placeholder="Quel âge as-tu ?"
                  defaultValue={currentUser.age && `${currentUser.age}`}
                  className={`border border-grey-border  h-14 pl-3 placeholder:font-light-font rounded-md  ${errorInput(
                    errors.age
                  )}`}
                  type="number"
                  min={16}
                  onKeyDown={(e) => e.preventDefault()}
                  {...register("age", errorMessageValues.age)}
                />
                {errorMessage(errors.age)}
              </div>
              <div className="flex flex-col">
                <p className="mb-2"> Genre </p>
                <input
                  placeholder=""
                  defaultValue={currentUser.gender && `${currentUser.gender}`}
                  className={`border border-grey-border  h-14 pl-3 placeholder:font-light-font rounded-md  ${errorInput(
                    errors.gender
                  )}`}
                  type="text"
                  {...register("gender", errorMessageValues.gender)}
                />
                {errorMessage(errors.gender)}
              </div>
            </div>
            <div className="flex justify-between w-full gap-14 ">
              <div className="flex flex-col w-full">
                <p className="mb-2"> Email </p>
                <input
                  placeholder="Quel est tom mail ?"
                  defaultValue={currentUser.email && `${currentUser.email}`}
                  className={`border border-grey-border  h-14 pl-3 placeholder:font-light-font rounded-md  ${errorInput(
                    errors.email
                  )}`}
                  type="text"
                  {...register("email", errorMessageValues.email)}
                />
                {errorMessage(errors.email)}
              </div>

              <div className="flex flex-col w-full relative">
                <p className="mb-2"> Ville </p>
                <input
                  className={`border border-grey-border  h-14 pl-3 placeholder:font-light-font rounded-md  ${errorInput(
                    errors.city
                  )}`}
                  type="text"
                  id="inputCityUser"
                  onChange={getLocationData}
                  name="cityInput"
                  placeholder="Où cuisines-tu ?"
                  defaultValue={currentUser.city && `${currentUser.city}`}
                  // {...register("city", errorMessageValues.city)}
                  onInput={() => handleVisibilities()}
                />
                {autocompleteVisible && (
                  <div className="border border-slate-500 rounded-lg p-2 absolute top-16 left-16 z-10 bg-white">
                    {" "}
                    {autocomplete &&
                      autocomplete.results.map((res) => (
                        <Autocompletion
                          res={res}
                          setCityInfo={setCityInfo}
                          setAutocompleteVisible={setAutocompleteVisible}
                          origin={"userProfile"}
                        />
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col ">
              <p className="mb-2"> Ma bio </p>
              <textarea
                placeholder="Que doit-on savoir de toi ?"
                defaultValue={
                  currentUser.description && `${currentUser.description}`
                }
                className={`border border-grey-border h-14 pl-3 placeholder:font-light-font rounded-md  ${errorInput(
                  errors.description
                )}`}
                {...register("description", errorMessageValues.description)}
              />
              {errorMessage(errors.description)}
            </div>

            <div className="flex gap-8 items-center ">
              <img
                alt="useravatar"
                className="w-16 h-16 border border-black rounded-full"
                src={currentUser.avatar_url ? currentUser.avatar_url : avatarDefault}
              />

              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green file:text-violet-700 hover:file:bg-violet-100 file:cursor-pointer file:hover:bg-green_light"
                  name="avatar"
                  id="avatar"
                  {...register("avatar_url")}
                />
              </label>
            </div>

            <button type="submit" className="my-2 flex justify-center ">
              <Button showText={true}>Sauvegarder les modifications</Button>
            </button>

            {editConfirmVisib && (
              <p className="bg-success text-white text-center p-1 rounded">
                Profil correctement mis à jour.
              </p>
            )}

            {editErrorVisib && (
              <p className="bg-red text-white text-center p-1 rounded">
                Une erreur est survenue.
              </p>
            )}
          </form>
        </div>
        <br />
        <br />
        <br />
        <SubsectionTitle>
          {" "}
          <span className=""> Mes reviews </span>{" "}
        </SubsectionTitle>

        <div className="tabs-container flex gap-4 border-b border-b-grey-border my-4 w-fit  font-light-font h-[29px]">
          <button
            className={
              reviewStatus === "written"
                ? "border-b-4 pb-3 border-green font-book-font"
                : undefined
            }
            onClick={() => setReviewStatus("written")}
          >
            {" "}
            Reviews recues
          </button>

          <button
            className={
              reviewStatus === "received"
                ? "border-b-4 pb-3 font-book-font border-green"
                : undefined
            }
            onClick={() => setReviewStatus("received")}
          >
            {" "}
            Reviews écrites
          </button>
        </div>

        <DisplayReviews
          reviewStatus={reviewStatus}
          reviews={userData.reviews}
        />
      </div>
    </div>
  );
}

export default MyProfile;
