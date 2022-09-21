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
import APIManager from '../../services/Api';

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

      APIManager.get("me")
      .then(res => {
        setData(res);
        console.log('res FROM GET ME REQUEST => ', res)
      })
      .catch(error => console.error('error FROM GET ME REQUEST => ', error))

// OLD request : will be removed.
      // fetch(API + "me", {
      //   headers: { Authorization: `Bearer ${token}` },
      // })
      //   .then((response) => {
      //     console.log("response DE User.js", response);
      //     return response.json();
      //   })
      //   .then((res) => {
      //     console.log("data DE User.js ", res);
      //     setData(res);
      //   });


  }, [setData, reducerValue]);

  const displayProfile = () => {
    setMessagesVisib(false);
    setAttendancesVisib(false);
    setHostedMealsVisib(false);
    setProfileVisib(true);
    console.log("USE REF", radioButton);
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
      <div className="top-container max-h-[170px] sticky top-0 z-20">
        <div className="text-container text-white">
          <SectionTitle>
            {" "}
            {currentUser.name
              ? `Welcome back, ${currentUser.name}`
              : "Welcome back"}
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

        <div className="user-feature-container ">
          {(profileVisib && data) && (
            <MyProfile
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              userData={data}
            />
          )}
          {messagesVisib && <MyMessages userData={data.list_chatters} />}
          {attendancesVisib && <MyAttendances userData={data} />}
          {hostedMealsVisib && (
            <MyHostedMeals userData={data} forceUpdate={forceUpdate} />
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
