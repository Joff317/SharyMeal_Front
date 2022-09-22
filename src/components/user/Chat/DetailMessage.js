import React, { useEffect, useState, useReducer } from "react";
import { API } from "../../../utils/variables";
import Cookies from "js-cookie";
import { useAtom, useAtomValue } from "jotai";
import { currentuserAtom } from "../../../atoms/loggedAtom";
import PostChat from "./Postchat";
import "../my-message.scss";

function DetailMessage({ currentChatterId, forceUpdate, reducerValue }) {
  const token = Cookies.get("token");
  const [currentConversation, setCurrentConversation] = useState();
  const currentUser = useAtomValue(currentuserAtom);

  useEffect(() => {
    currentChatterId &&
      fetch(API + `conversation/${currentChatterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setCurrentConversation(response);
        });
  }, [currentChatterId, reducerValue]);

  function dataParsed(date) {
    return new Date(date).toLocaleDateString("fr-FR", {
      month: "short",
      year: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  setTimeout(() => {
    const elem = document.getElementById("chatWrapper");
    elem.scrollTop = elem.scrollHeight;
  }, "10");

  return (
    <div className="detail-message-container w-full border-l border-grey-border h-screen px-20 min-h-[500px] ">
      <div
        id="chatWrapper"
        className="w-full flex flex-col gap-2 max-h-[400px] min-h-[400px] overflow-y-scroll"
      >
        {currentConversation &&
          currentConversation.conversations.map((message, index) => (
            <div key={index} className="flex flex-col justify-end">
              {message.sender_id === currentUser.id ? (
                <>
                  <p className="text-black py-2 px-4 bg-green_light font-book-font  text-md self-end rounded-full w-max max-w-sm">
                    {" "}
                    {message.content}
                  </p>

                  <p className="self-end mt-[3px] mb-2 text-xs text-black font-light-font text-grey">
                    {" "}
                    {dataParsed(message.created_at)}{" "}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-black py-2 px-4 bg-grey-border text-md font-book-font  w-fit rounded-full max-w-sm">
                    {" "}
                    {message.content}
                  </p>

                  <p className="mt-[3px] mb-2 text-xs font-light-font text-grey">
                    {" "}
                    {dataParsed(message.created_at)}{" "}
                  </p>
                </>
              )}
            </div>
          ))}
      </div>
      <PostChat forceUpdate={forceUpdate} recipient_id={currentChatterId} />
    </div>
  );
}

export default DetailMessage;
