import { useAtomValue, useSetAtom } from "jotai";
import Cookies from "js-cookie";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { loggedAtom } from "../../atoms/loggedAtom";
import { currentuserAtom } from "../../atoms/loggedAtom";
import SectionTitle from "../../components/titles/SectionTitle";
import { API } from "../../utils/variables";
import { NavLink } from "react-router-dom";
import "./User.scss";
import MyProfile from "../../components/user/MyProfile/MyProfile";
import MyMessages from "../../components/user/MyMessages";
import MyAttendances from "../../components/user/MyAttendances/MyAttendances";
import MyHostedMeals from "../../components/user/MyHostedMeals";
import Button from "../../components/actions/Button";

function User() {
  const token = Cookies.get("token");
  const [data, setData] = useState();
  const loggedd = useAtomValue(loggedAtom);
  const currentUser = useAtomValue(currentuserAtom);
  const setCurrentUser = useSetAtom(currentuserAtom);
  const [profileVisib, setProfileVisib] = useState(true);
  const [messagesVisib, setMessagesVisib] = useState(false);
  const [attendancesVisib, setAttendancesVisib] = useState(false);
  const [hostedMealsVisib, setHostedMealsVisib] = useState(false);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const radioButton = useRef();

  useEffect(() => {
    loggedd &&
      fetch(API + "me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          setData(res);
        });
  }, [setData, reducerValue]);

  const displayProfile = () => {
    setMessagesVisib(false);
    setAttendancesVisib(false);
    setHostedMealsVisib(false);
    setProfileVisib(true);
  };

  const displayMessages = () => {
    setMessagesVisib(true);
    setAttendancesVisib(false);
    setHostedMealsVisib(false);
    setProfileVisib(false);
  };

  const displayAttendances = () => {
    setMessagesVisib(false);
    setAttendancesVisib(true);
    setHostedMealsVisib(false);
    setProfileVisib(false);
  };

  const displayHostedMeals = () => {
    setMessagesVisib(false);
    setAttendancesVisib(false);
    setHostedMealsVisib(true);
    setProfileVisib(false);
  };

  return (
    <div className="w-full">
      <div className="top-container max-h-[170px] sticky w-full top-0 z-50">
        <div className="text-container text-white">
          <SectionTitle>
            {" "}
            {currentUser.name
              ? `Heureux de vous revoir, ${currentUser.name}`
              : "Heureux de vous revoir"}
          </SectionTitle>
        </div>
      </div>

      <div className="user-main-container ">
        <div className="user-features-navigation">
          <div>
            <input
              type="radio"
              name="choice"
              id="radio1"
              value="radio1"
              defaultChecked
              ref={radioButton}
              className={`hidden peer`}
            />
            <label
              htmlFor="radio1"
              onClick={() => displayProfile()}
              className="text-grey font-medium-font text-md peer-checked:text-black cursor-pointer"
            >
              Mon profil
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="choice"
              id="radio2"
              value="radio2"
              className={`hidden peer`}
            />
            <label
              htmlFor="radio2"
              onClick={() => displayMessages()}
              className="text-grey font-medium-font text-md peer-checked:text-black cursor-pointer"
            >
              Mes messages
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="choice"
              id="radio3"
              value="radio3"
              className={`hidden peer`}
            />
            <label
              htmlFor="radio3"
              onClick={() => displayAttendances()}
              className="text-grey font-medium-font text-md peer-checked:text-black cursor-pointer"
            >
              Mes réservations
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="choice"
              id="radio4"
              value="radio4"
              className={`hidden peer`}
            />
            <label
              htmlFor="radio4"
              onClick={() => displayHostedMeals()}
              className="text-grey text-md font-medium-font peer-checked:text-black cursor-pointer"
            >
              Mes repas organisés
            </label>
          </div>

          <NavLink to="/create-meal" className="mt-8">
            <Button showText={true}>&#10024; Proposer un repas &#10024;</Button>
          </NavLink>
        </div>

        <div className="user-features-navigation-screen">
          <div>
            <input
              type="radio"
              name="choice1"
              id="radio1-screen"
              value="radio1-screen"
              defaultChecked
              ref={radioButton}
              className={`hidden peer`}
            />
            <label
              htmlFor="radio1-screen"
              onClick={() => displayProfile()}
              className="text-grey font-medium-font text-md peer-checked:text-black cursor-pointer"
            >
              Profil
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="choice1"
              id="radio2-screen"
              value="radio2-screen"
              className="hidden peer"
            />
            <label
              htmlFor="radio2-screen"
              onClick={() => displayMessages()}
              className="text-grey font-medium-font text-md peer-checked:text-black cursor-pointer"
            >
              Messages
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="choice1"
              id="radio3-screen"
              value="radio3-screen"
              className={`hidden peer`}
            />
            <label
              htmlFor="radio3-screen"
              onClick={() => displayAttendances()}
              className="text-grey font-medium-font text-md peer-checked:text-black cursor-pointer"
            >
              Réservations
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="choice1"
              id="radio4-screen"
              value="radio4-screen"
              className={`hidden peer`}
            />
            <label
              htmlFor="radio4-screen"
              onClick={() => displayHostedMeals()}
              className="text-grey text-md font-medium-font peer-checked:text-black cursor-pointer"
            >
              Repas organisés
            </label>
          </div>
        </div>

        <div className="user-feature-container ">
          {profileVisib && data && (
            <MyProfile
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              userData={data}
            />
          )}
          {messagesVisib && <MyMessages userData={data.list_chatters} />}
          {attendancesVisib && (
            <MyAttendances userData={data} forceUpdate={forceUpdate} />
          )}
          {hostedMealsVisib && (
            <MyHostedMeals userData={data} forceUpdate={forceUpdate} />
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
