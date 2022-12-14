import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/actions/Button";
import {
  errorMessageValues,
  errorInput,
  errorMessage,
} from "../../../components/authentication/errors";
import Check from "../../../icons/Check";
import { API } from "../../../utils/variables";
import "./ReinitPassword.scss";

function ReinitPassword() {
  const token = useParams().tokenId;
  // console.log(token, typeof token);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const OnSubmit = (data) => {
    fetch(API + `users/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          reset_password_token: token,
          password: data.password,
          password_confirmation: data.password_confirmation,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setShow(true);
        setTimeout(() => {
          navigate("/");
        }, "2000");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="password-container">
      <div>Change your password</div>
      <form
        className={`max-w-[400px] flex flex-col gap-3 mt-2`}
        onSubmit={handleSubmit(OnSubmit)}
      >
        <div className="flex flex-col">
          <p> Password </p>
          <input
            className={`border h-10 pl-3 rounded-md  ${errorInput(
              errors.password
            )}`}
            type="password"
            {...register("password", errorMessageValues.password)}
          />
          {errorMessage(errors.password)}
        </div>
        <div className="flex flex-col">
          <p> Confirm password </p>
          <input
            className={`border h-10 pl-3 rounded-md ${errorInput(
              errors.password
            )}`}
            type="Password"
            {...register("password_confirmation", errorMessageValues.password)}
          />
          {errorMessage(errors.password)}
        </div>

        <button type="submit">
          <Button showText={true} showIcon={true} icon={<Check />}>
            submit
          </Button>
        </button>
      </form>
      {show && (
        <h1 className="font-bold text-xl text-green-500">
          {" "}
          Mot de passe modifi?? avec succ??s !{" "}
        </h1>
      )}
    </div>
  );
}

export default ReinitPassword;
