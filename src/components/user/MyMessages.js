import React, { useState } from "react";
import ListMessages from "./Chat/ListMessages";
import DetailMessage from "./Chat/DetailMessage";
import SubsectionTitle from "../titles/SubsectionTitle";

function MyMessages({ userData }) {
  const [currentChatterId, setCurrentChatterId] = useState(userData[0].id);

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
        <div className="flex w-full mt-6">
          <ListMessages
            listMessages={userData}
            setCurrentChatterId={setCurrentChatterId}
            currentChatterId={currentChatterId}
          />
          <div className="min-h-[500px] w-4/6 pl-12">
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
