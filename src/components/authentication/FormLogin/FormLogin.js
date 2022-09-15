import { useSetAtom } from "jotai";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { currentuserAtom, loggedAtom } from "../../../atoms/loggedAtom";
import { errorMessageValues, errorInput, errorMessage } from "../errors";
import usePostForm from "../usePostForm";
import { API } from "../../../utils/variables";
import SectionTitle from "../../titles/SectionTitle";
import Button from "../../actions/Button";
import Close from "../../../icons/Close";

function FormLogin({
  setLoginPopup,
  setRegisterPopup,
  setSwitchPopup,
  switchPopup,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setLogged = useSetAtom(loggedAtom);
  const current_user = useSetAtom(currentuserAtom);

  const OnSubmit = (data) => {
    usePostForm(API + "/users/sign_in", data, setLogged, current_user);
  };

  function resetPopup() {
    setRegisterPopup(false);
    setLoginPopup(false);
    setSwitchPopup(false);
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
            placeholder="°°°°°°°"
            className={`border border-grey-border placeholder:font-light-font placeholder:text-sm h-14 pl-3 rounded-md ${errorInput(
              errors.password
            )}`}
            type="Password"
            {...register("password", errorMessageValues.password)}
          />
          {errorMessage(errors.password)}
        </div>
        <Link to="/sendemail" className="hover:underline">
          {" "}
          Mot de passe oublié ?{" "}
        </Link>
        <button type="submit" className="my-2 flex justify-center">
          <Button showText={true}>Se connecter</Button>
        </button>
      </form>
      <span className="absolute top-5 right-5" onClick={() => resetPopup()}>
        <Button showIcon={true} icon={<Close />}></Button>
      </span>
      <p
        onClick={() => setSwitchPopup(!switchPopup)}
        className="cursor-pointer mt-4 hover:underline"
      >
        {" "}
        Vous n'avez pas de compte ? créez en un !{" "}
      </p>
    </div>
  );
}

export default FormLogin;
