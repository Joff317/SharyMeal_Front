import React, { useEffect } from "react";
import { list } from "postcss";
import ScrollReveal from "scrollreveal";
import { slideUpFast } from "../../animations/Animations";

function ListMessages({ listMessages, setCurrentChatterId, currentChatterId }) {
  useEffect(() => {
    ScrollReveal().reveal(".slide", slideUpFast);
  }, []);

  let reversed = [...listMessages].reverse();
  useEffect(() => {
    setCurrentChatterId(reversed[0].id);
  }, []);

  return (
    <div className="relative ">
      {listMessages &&
        reversed.map((listMessage, index) => (
          <p
            key={index}
            className={`slide cursor-pointer border-b border-grey-border hover:bg-grey-border py-4 mb-2 rounded-lg px-4 relative ${
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
