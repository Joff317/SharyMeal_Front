import DefaultAvatar from "../../assets/images/avatardefault.png";
import { Link } from "react-router-dom";
import Chat from "../../icons/Chat";
import React from "react";

function AvatarPopup({
  guestData,
  setGetGuestId,
  setShowMessage,
  hideMessageBtn,
}) {
  function setShowMessageFunc(id) {
    setGetGuestId(id);
    setShowMessage(true);
  }

  return (
    <div className="flex flex-col  bg-white absolute z-50 drop-shadow-lg min-w-[330px] top-7 rounded-xl">
      {guestData.map((guestAvatar) => (
        <div className=" flex items-center justify-between py-3 px-6  hover:bg-green_light">
          <div className="flex items-center gap-2">
            <img
              className="w-10 h-10 border-grey ml-[-9px] rounded-full cursor-pointer"
              src={
                guestAvatar.avatar_url ? guestAvatar.avatar_url : DefaultAvatar
              }
              alt="avatar"
            />

            <div className="flex flex-col justify-center">
              <Link to={`/users/${guestAvatar.id}`}>
                <p className="text-lg font-bold-font hover:underline">
                  {" "}
                  {guestAvatar.name ? guestAvatar.name : "No-name"}{" "}
                </p>
              </Link>
              <p className="font-light-font text-sm"> {guestAvatar.email} </p>
            </div>
          </div>

          {!hideMessageBtn && (
            <p
              onClick={() => setShowMessageFunc(guestAvatar)}
              className="text-sm my-2 mb-3 font-light-font bg-pink rounded-full p-2 w-fit cursor-pointer"
            >
              <Chat />
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default AvatarPopup;
