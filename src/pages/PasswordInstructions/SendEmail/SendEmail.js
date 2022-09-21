import React, { useState } from "react";
import { API } from "../../../utils/variables";
import SectionTitle from "../../../components/titles/SectionTitle";
import Button from "../../../components/actions/Button";
import Close from "../../../icons/Close";
import Arrow from "../../../icons/Arrow";

function SendEmail() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const API_URL_RESET = `${API}users/password`;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(API_URL_RESET, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user: { email: e.target.email.value } }),
    })
      .then((response) => {
        // console.log(response);
        throw "erreur";
        return response.json();
      })
      .then((res) => {
        setShow(true);
        // console.log(res);
      })
      .catch((error) => setError(true));
  };

  return (
    <div className="pt-[150px] h-[80vh] flex justify-start items-center flex-col">
      <SectionTitle> Saisissez votre mail </SectionTitle>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-xs gap-3 mt-4 "
      >
        <input
          className="border border-grey-border  h-14 pl-3 placeholder:font-light-font placeholder:text-sm rounded-md"
          placeholder="Noter votre mail"
          name="email"
        />

        <button type="submit" className="my-2 flex justify-center">
          <Button showText={true} showIcon={true} icon={<Arrow />}>
            Envoyer{" "}
          </Button>
        </button>
      </form>
      {show && <h1 className="font-bold text-xl text-green-500"> Envoyé ! </h1>}
      {error && <h1 className="font-bold text-xl text-green-500"> Raté </h1>}
    </div>
  );
}

export default SendEmail;
