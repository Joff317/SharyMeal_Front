import React, { useEffect, useState } from "react";
import ListMessages from "./Chat/ListMessages";
import DetailMessage from "./Chat/DetailMessage";
import SubsectionTitle from "../titles/SubsectionTitle";
import "./my-message.scss";

function MyMessages({ userData }) {
  const [currentChatterId, setCurrentChatterId] = useState(
    userData && userData[userData.length - 1].id
  );

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [document]);

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
          <ListMessages
            listMessages={userData}
            setCurrentChatterId={setCurrentChatterId}
            currentChatterId={currentChatterId}
          />
          <div className="min-h-[500px] w-4/6 pl-12 detail-message">
            {currentChatterId && (
              <DetailMessage currentChatterId={currentChatterId} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MyMessages;
