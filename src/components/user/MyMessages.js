import React, { useEffect, useReducer, useState } from "react";
import ListMessages from "./Chat/ListMessages";
import DetailMessage from "./Chat/DetailMessage";
import SubsectionTitle from "../titles/SubsectionTitle";
import "./my-message.scss";
import { API } from "../../utils/variables";
import Cookies from "js-cookie";

function MyMessages({ userData }) {
  const [currentChatterId, setCurrentChatterId] = useState(
    userData && userData[userData.length - 4].id
  );
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const token = Cookies.get("token");
  const [lastMessages, setLastMessages] = useState([]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [document]);

  useEffect(() => {
    userData &&
      userData.map((user) => {
        return fetch(API + `last_message/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setLastMessages((lastMessages) => [...lastMessages, response]);
          });
      });
  }, [reducerValue, token, userData]);

  return (
    <>
      <SubsectionTitle> Vos messages </SubsectionTitle>
      {userData.length === 0 ? (
        <p className="mt-4 font-book-font">
          {" "}
          Vous n'avez pas encore de message ! <br />
          Pour envoyer ou recevoir des messages privés, vous pouvez participer à
          un repas. Une conversation avec l'hôte se créera.
        </p>
      ) : (
        <div className="flex w-full -z-50 mt-6 message-container">
          {lastMessages && (
            <ListMessages
              listMessages={lastMessages}
              setCurrentChatterId={setCurrentChatterId}
              currentChatterId={currentChatterId}
            />
          )}
          <div className="min-h-[500px] w-4/6 pl-12 detail-message">
            {currentChatterId && (
              <DetailMessage
                currentChatterId={currentChatterId}
                reducerValue={reducerValue}
                forceUpdate={forceUpdate}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MyMessages;
