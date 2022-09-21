import React, { useEffect, useState, useReducer } from "react";
import { API } from "../../../utils/variables";
import Cookies from "js-cookie";
import { useAtom, useAtomValue } from "jotai";
import { currentuserAtom } from "../../../atoms/loggedAtom";
import PostChat from "./Postchat";

function DetailMessage({ currentChatterId }) {
  const token = Cookies.get("token");
  const [currentConversation, setCurrentConversation] = useState();
  const currentUser = useAtomValue(currentuserAtom);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

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
          console.log(response);
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
    <div className="w-full border-l border-grey-border h-screen px-20 min-h-[500px] ">
      <div
        id="chatWrapper"
        className="w-full flex flex-col gap-2 max-h-[400px] min-h-[400px] overflow-y-scroll"
      >
        {currentConversation &&
          currentConversation.conversations.map((message) => (
            <>
              {message.sender_id === currentUser.id ? (
                <>
                  <p className="text-black p-3 bg-green_light  text-sm self-end rounded-lg w-max max-w-sm">
                    {" "}
                    {message.content}
                  </p>

                  <p className="self-end mt-[-2px] mb-2 text-xs text-black font-light-font text-grey">
                    {" "}
                    {dataParsed(message.created_at)}{" "}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-black p-3 bg-grey-border text-sm  w-fit rounded-lg max-w-sm">
                    {" "}
                    {message.content}
                  </p>

                  <p className="mt-[-2px] mb-2 text-xs font-light-font text-grey">
                    {" "}
                    {dataParsed(message.created_at)}{" "}
                  </p>
                </>
              )}
            </>
          ))}
      </div>
      <PostChat forceUpdate={forceUpdate} recipient_id={currentChatterId} />
    </div>
  );
}

export default DetailMessage;
