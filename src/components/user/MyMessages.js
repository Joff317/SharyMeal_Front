import React, { useEffect, useState } from "react";
import ListMessages from "./Chat/ListMessages";
import DetailMessage from "./Chat/DetailMessage";

function MyMessages({ userData }) {
  const [currentChatterId, setCurrentChatterId] = useState();

  return (
    <div className="flex w-full">
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
  );
}

export default MyMessages;
