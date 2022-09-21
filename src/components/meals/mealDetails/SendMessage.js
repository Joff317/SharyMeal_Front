import Button from "../../actions/Button";
import Close from "../../../icons/Close";
import React, { useState } from "react";
import SectionTitle from "../../titles/SectionTitle";
import {
  errorInput,
  errorMessage,
  errorMessageValues,
} from "../../authentication/errors";
import Arrow from "../../../icons/Arrow";
import { API } from "../../../utils/variables";
import Cookies from "js-cookie";
import { useAtomValue } from "jotai";
import { currentuserAtom } from "../../../atoms/loggedAtom";

function SendMessage({ setShowMessage, host }) {
  const token = Cookies.get("token");
  const currentUser = useAtomValue(currentuserAtom);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(API + "messages", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          sender_id: currentUser.id,
          recipient_id: host.id,
          content: e.target.content.value,
        },
      }),
    }).then(() => {
      setShowConfirmation(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 1500);
    });
  };

  return (
    <div>
      <SectionTitle>
        {" "}
        Envoyer un message {host.name && `à ${host.name}`}{" "}
      </SectionTitle>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex flex-col">
          <input
            className={`border border-grey-border  h-14 pl-3 placeholder:font-light-font placeholder:text-sm rounded-md `}
            placeholder="Votre message"
            name="content"
            type="text"
          />
        </div>
        {showConfirmation && (
          <p className="text-green font-bold-font"> Message envoyé </p>
        )}
        <button type="submit" className="mt-6 flex justify-center">
          <Button showText={true} showIcon={true} icon={<Arrow />}>
            Envoyer le message
          </Button>
        </button>
      </form>

      <span
        className="absolute top-5 right-5 w-fit"
        onClick={() => setShowMessage(false)}
      >
        <Button showIcon={true} icon={<Close />}></Button>
      </span>
    </div>
  );
}

export default SendMessage;
