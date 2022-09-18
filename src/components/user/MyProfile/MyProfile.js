import React, { useEffect } from "react";
import Button from "../../actions/Button";
import SubsectionTitle from "../../titles/SubsectionTitle";
import { useForm } from "react-hook-form";
import { API } from "../../../utils/variables";
import {
  errorMessageValues,
  errorInput,
  errorMessage,
} from "../../authentication/errors";
import "./MyProfile.scss";
import { useState } from "react";
import Autocompletion from "../../geolocation/Autocompletion";
import Cookies from "js-cookie";
import { useAtom, useSetAtom } from "jotai";
import { currentuserAtom } from "../../../atoms/loggedAtom";
import AvatarForm from "../AvatarForm";

function MyProfile({ currentUser, setCurrentUser }) {
  const [saveButtonVisib, setSaveButtonVisib] = useState(false);
  const token = Cookies.get("token");
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);
  const [autocomplete, setAutocomplete] = useState(false);
  const [cityInfo, setCityInfo] = useState();
  const [editConfirmVisib, setEditConfirmVisib] = useState(false);
  const [editErrorVisib, setEditErrorVisib] = useState(false);
  const [currentUserAtom, setCurrentUserAtom] = useAtom(currentuserAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const OnSubmit = (data) => {
    console.log("data du formulaire", data);

    const dataAvatar = new FormData();
    dataAvatar.append("user[avatar]", data.avatar_url[0]);

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
          setSaveButtonVisib(false);
        } else {
          setEditErrorVisib(true);
          setTimeout(() => {
            setEditErrorVisib(false);
          }, 2000);
        }
        return response.json();
      })
      .then((fetchData) => {
        console.log("fetchData réponse du fetch => ", fetchData);
        setCurrentUserAtom({
          ...currentUserAtom,
          city: fetchData.city,
          name: fetchData.name,
          age: fetchData.age,
          email: fetchData.email,
          gender: fetchData.gender,
          description: fetchData.description,
        });
        console.log(data.avatar_url);
        data.avatar_url.length !== 0 && postAvatar(dataAvatar);
      })
      .catch((error) => console.log(error.message));
  };

  function postAvatar(dataAvatar) {
    console.log("ok");
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

  function getData(e) {
    if (e.target.value.length > 4) {
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${e.target.value}&type=city&format=json&apiKey=9aa5158850824f25b76a238e1d875cc8`
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
    setSaveButtonVisib(true);
    setEditConfirmVisib(false);
  };

  return (
    <div className="profile-container">
      <div className="perso-infos-container">
        <SubsectionTitle>Mes informations persos</SubsectionTitle>
        <div className="perso-infos-details">
          <form
            className={` w-full flex flex-col gap-10 mt-8`}
            onSubmit={handleSubmit(OnSubmit)}
          >
            <div className="flex justify-between w-full gap-14">
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
                  onChange={() => handleVisibilities()}
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
                  {...register("age", errorMessageValues.age)}
                  onChange={() => handleVisibilities()}
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
                  onChange={() => handleVisibilities()}
                />
                {errorMessage(errors.gender)}
              </div>
            </div>
            <div className="flex justify-between w-full gap-14">
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
                  onChange={() => handleVisibilities()}
                />
                {errorMessage(errors.email)}
              </div>

              <div className="flex flex-col relative w-full">
                <p className="mb-2"> Ville </p>
                <input
                  className={`border border-grey-border  h-14 pl-3 placeholder:font-light-font rounded-md  ${errorInput(
                    errors.city
                  )}`}
                  type="text"
                  id="inputCityUser"
                  onChange={getData}
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

            <div className="flex flex-col">
              <p className="mb-2"> Ma bio </p>
              <input
                placeholder="Que doit-on savoir de toi ?"
                defaultValue={
                  currentUser.description && `${currentUser.description}`
                }
                className={`border border-grey-border  h-14 pl-3 placeholder:font-light-font rounded-md  ${errorInput(
                  errors.description
                )}`}
                type="text"
                {...register("description", errorMessageValues.description)}
                onChange={() => handleVisibilities()}
              />
              {errorMessage(errors.description)}
            </div>

            <div className="flex gap-8 items-center">
              <img
                alt="useravatar"
                className="w-24 border border-black rounded-full"
                src={currentUser.avatar_url}
              />

              <div>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  {...register("avatar_url")}
                />
              </div>
            </div>
            {saveButtonVisib && (
              <button type="submit" className="my-2 flex justify-center">
                <Button showText={true}>Sauvegarder les modifications</Button>
              </button>
            )}

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
        <SubsectionTitle> Mes reviews </SubsectionTitle>
      </div>
    </div>
  );
}

export default MyProfile;
