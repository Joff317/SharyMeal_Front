import { useSetAtom, useAtomValue } from "jotai";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { currentuserAtom, loggedAtom } from "../../../atoms/loggedAtom";
import { errorMessageValues, errorInput, errorMessage } from "../errors";
import usePostForm from "../usePostForm";
import { API } from "../../../utils/variables";
import SectionTitle from "../../titles/SectionTitle";
import Button from "../../actions/Button";
import Close from "../../../icons/Close";
import Arrow from "../../../icons/Arrow";

function FormLogin({
  setLoginPopup,
  setRegisterPopup,
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
  const current_user_value = useAtomValue(currentuserAtom);
  const [loginResult, setLoginResult] = useState(true);

  const OnSubmit = (data) => {
    usePostForm(
      API + "users/sign_in",
      data,
      setLogged,
      current_user,
      setLoginResult,
      current_user_value
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
      <SectionTitle> Connectez-vous </SectionTitle>
      <form
        className={` min-w-[480px] flex flex-col gap-5 mt-8`}
        onSubmit={handleSubmit(OnSubmit)}
      >
        <div className="flex flex-col">
          <p className="mb-2"> Email </p>
          <input
            placeholder="Votre email"
            className={`border border-grey-border  h-14 pl-3 placeholder:font-light-font placeholder:text-sm rounded-md  ${errorInput(
              errors.email
            )}`}
            type="text"
            {...register("email", errorMessageValues.email)}
          />
          {errorMessage(errors.email)}
        </div>
        <div className="flex flex-col">
          <p className="mb-2"> Mot de passe </p>
          <input
            placeholder="??????????????"
            className={`border border-grey-border placeholder:font-light-font placeholder:text-sm h-14 pl-3 rounded-md ${errorInput(
              errors.password
            )}`}
            type="Password"
            {...register("password", errorMessageValues.password)}
          />
          {errorMessage(errors.password)}
        </div>
        <Link
          to="/sendemail"
          onClick={() => setLoginPopup(false)}
          className="hover:underline"
        >
          {" "}
          Mot de passe oubli?? ?{" "}
        </Link>
        <button type="submit" className="my-2 flex justify-center">
          <Button showText={true} showIcon={true} icon={<Arrow />}>
            Se connecter
          </Button>
        </button>
        {!loginResult && (
          <p className="bg-red text-white text-center p-2">
            Erreur d'identifiant ou de mot de passe
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
        Vous n'avez pas de compte ? cr??ez en un !{" "}
      </p>
    </div>
  );
}

export default FormLogin;
