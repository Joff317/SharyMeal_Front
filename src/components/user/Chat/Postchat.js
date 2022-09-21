import React from "react";
import {
  errorMessageValues,
  errorInput,
  errorMessage,
} from "../../../components/authentication/errors";
import { useForm } from "react-hook-form";
import { API } from "../../../utils/variables";
import Cookies from "js-cookie";
import { useAtomValue } from "jotai";
import { currentuserAtom } from "../../../atoms/loggedAtom";
import APIManager from "../../../services/Api";

const PostChat = ({ forceUpdate, recipient_id }) => {
  const token = Cookies.get("token");
  const currentUser = useAtomValue(currentuserAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    await APIManager.create("messages", {
      message: {
        sender_id: currentUser.id,
        recipient_id,
        content: data.content,
      },
    })
    .then(res => {
      console.log('res FROM PostChat REQUEST => ', res)
      forceUpdate();
      emptyInput();
    })
    .catch(error => console.error('error FROM FROM PostChat REQUEST => ', error.message))

// OLD request : will be removed.
    // fetch(API + "messages", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({
    //     message: {
    //       sender_id: currentUser.id,
    //       recipient_id,
    //       content: data.content,
    //     },
    //   }),
    // })
    //   .then((response) => {
    //     forceUpdate();

    //     return response.json();
    //   })
    //   .then((res) => {
    //     emptyInput();
    //   });
  };

  const emptyInput = () => {
    const input = document.getElementById("toDelete");
    return (input.value = "");
  };

  return (
    <div className="w-full flex border-t border-slate-200 mt-4  justify-end">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex gap-3 mt-4 mb-6 items-center w-full justify-between"
      >
        <input
          className={`border border-grey h-10 pl-6 rounded-full w-full  ${errorInput(
            errors.content
          )}`}
          autoFocus="true"
          id="toDelete"
          type="text"
          size={10}
          {...register("content", errorMessageValues.content)}
        />
        {errorMessage(errors.content)}
        <button
          className="py-2 px-4 h-fit text-black text-sm rounded-full text-white bg-pink"
          type="submit"
        >
          {" "}
          Envoyer{" "}
        </button>
      </form>
    </div>
  );
};

export default PostChat;
