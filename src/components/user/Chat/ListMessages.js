import React, { useEffect } from "react";
import { list } from "postcss";
import ScrollReveal from "scrollreveal";
import { slideUpFast } from "../../animations/Animations";
import DefaultAvatar from "../../../assets/images/avatardefault.png";

function ListMessages({ listMessages, setCurrentChatterId, currentChatterId }) {
  return (
    <div className="relative ">
      {listMessages &&
        listMessages
          .filter(
            (v, i, a) => a.findIndex((t) => t.user.id === v.user.id) === i
          )
          .sort(
            (a, b) =>
              new Date(b.last_message.created_at) -
              new Date(a.last_message.created_at)
          )
          .map((listMessage, index) => (
            <div
              key={index}
              onClick={() => setCurrentChatterId(listMessage.user.id)}
              className={`slide min-w-[300px] flex gap-3 items-center cursor-pointer border-b border-grey-border hover:bg-grey-border py-2 mb-2 rounded-lg px-3 relative ${
                currentChatterId === listMessage.user.id &&
                "bg-green_light hover:bg-grey-border"
              }`}
            >
              <img
                alt="avatar"
                className="rounded-full w-10 h-10"
                src={
                  listMessage.user.avatar_url
                    ? listMessage.user.avatar_url
                    : DefaultAvatar
                }
              />
              <div>
                <p> {listMessage.user.name} </p>
                <p className="font-light-font">
                  {" "}
                  {listMessage.last_message.content}{" "}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
}

export default ListMessages;
