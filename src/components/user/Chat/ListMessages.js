import React from "react";
import { list } from "postcss";

function ListMessages({ listMessages, setCurrentChatterId, currentChatterId }) {
  // console.log(listMessages);
  return (
    <div className="relative ">
      {listMessages &&
        listMessages.map((listMessage, index) => (
          <p
            key={index}
            className={` cursor-pointer border-b border-grey-border hover:bg-green_light py-4 mb-2 rounded-lg px-4 relative ${
              currentChatterId === listMessage.id &&
              "bg-green_light hover:bg-grey-border"
            }`}
            onClick={() => setCurrentChatterId(listMessage.id)}
          >
            {" "}
            {listMessage.email}{" "}
          </p>
        ))}
    </div>
  );
}

export default ListMessages;
