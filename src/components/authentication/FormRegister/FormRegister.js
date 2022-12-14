import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { errorMessageValues, errorInput, errorMessage } from "../errors";
import usePostForm from "../usePostForm";
import { currentuserAtom, loggedAtom } from "../../../atoms/loggedAtom";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../../utils/variables";
import Button from "../../actions/Button";
import Close from "../../../icons/Close";
import React, { useState } from "react";
import SectionTitle from "../../titles/SectionTitle";
import "./FormRegister.scss";
import Arrow from "../../../icons/Arrow";

function FormRegister({
  setRegisterPopup,
  setLoginPopup,
  setSwitchPopup,
  switchPopup,
  setPopupBurgerVisible,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setLogged = useSetAtom(loggedAtom);
  const current_user = useSetAtom(currentuserAtom);
  const navigate = useNavigate();
  const [registerResult, setRegisterResult] = useState(true);

  const OnSubmit = (data) => {
    usePostForm(
      API + "users",
      data,
      setLogged,
      current_user,
      setRegisterResult
    );
    setPopupBurgerVisible(false);
  };

  function resetPopup() {
    setRegisterPopup(false);
    setLoginPopup(false);
    setSwitchPopup(false);
    setPopupBurgerVisible(false);
  }

  return (
    <div className="text-black flex flex-col items-center">
      <SectionTitle> Inscrivez vous ! </SectionTitle>
      <form
        className={` min-w-[480px] flex flex-col gap-5 mt-8`}
        onSubmit={handleSubmit(OnSubmit)}
      >
        <div className="flex flex-col">
          <p className="mb-2"> Email </p>
          <input
            className={`border border-grey-border  h-14 pl-3 placeholder:font-light-font placeholder:text-sm rounded-md ${errorInput(
              errors.email
            )} `}
            placeholder="Votre email"
            type="text"
            {...register("email", errorMessageValues.email)}
          />
          {errorMessage(errors.email)}
        </div>
        <div className="flex flex-col">
          <p> Mot de passe </p>
          <p className="mb-2 text-xs font-light-font">(8 caract??res dont 1 lettre, 1 chiffre et 1 caract??re sp??cial )</p>
          <input
            className={`border border-grey-border  h-14 pl-3 placeholder:font-light-font placeholder:text-sm rounded-md ${errorInput(
              errors.password
            )}`}
            placeholder="??????????????"
            type="Password"
            {...register("password", errorMessageValues.password)}
          />
          {errorMessage(errors.password)}
        </div>
        <div className="flex flex-col">
          <a href="/condition_d_utilisation" className="use-conditions">
            condition d'utilisation
          </a>
          <div className="check-conditions">
            <p className="items-center">
              {" "}
              J'ai lu et j'accepte les conditions d'utilisation et l'utilisation
              des cookies{" "}
            </p>
            <input type="checkbox" required />
          </div>
        </div>
        <button type="submit" className="my-2 flex justify-center">
          <Button showText={true} showIcon={true} icon={<Arrow />}>
            Cr??er mon compte
          </Button>
        </button>

        {!registerResult && (
          <p className="bg-red text-white text-center p-2">
            Erreur. Vous avez peut-??tre d??j?? un compte chez nous ?
          </p>
        )}
      </form>
      <span className="absolute top-5 right-5" onClick={() => resetPopup()}>
        <Button showIcon={true} icon={<Close />}></Button>
      </span>
      <p
        onClick={() => setSwitchPopup(!switchPopup)}
        className="cursor-pointer mt-4 hover:underline"
      >
        {" "}
        Vous avez un compte ? Connectez-vous !
      </p>
    </div>
  );
}

export default FormRegister;
