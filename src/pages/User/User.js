import { useAtomValue, useSetAtom } from "jotai";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { loggedAtom } from "../../atoms/loggedAtom";
import { currentuserAtom } from "../../atoms/loggedAtom";
import SectionTitle from "../../components/titles/SectionTitle";
import { API } from "../../utils/variables";
import { NavLink } from "react-router-dom";
import './User.scss';
import MyProfile from "../../components/user/MyProfile/MyProfile";
import MyMessages from "../../components/user/MyMessages";
import MyAttendances from "../../components/user/MyAttendances";
import MyHostedMeals from "../../components/user/MyHostedMeals";


function User() {
  const token = Cookies.get("token");
  const [data, setData] = useState();
  const loggedd = useAtomValue(loggedAtom);
  const currentUser = useAtomValue(currentuserAtom);
  const setCurrentUser = useSetAtom(currentuserAtom);
  const [ profileVisib, setProfileVisib] = useState(true);
  const [ messagesVisib, setMessagesVisib] = useState(false);
  const [ attendancesVisib, setAttendancesVisib ] = useState(false);
  const [ hostedMealsVisib, setHostedMealsVisib ] = useState (false);

  useEffect(() => {
    loggedd &&
      fetch(API + "me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          console.log(res);
          setData(res);
        });
  }, [setData]);

  const displayProfile = () => {
    setMessagesVisib(false);
    setAttendancesVisib(false);
    setHostedMealsVisib(false);
    setProfileVisib(true);
  }

  const displayMessages = () => {
    setMessagesVisib(true);
    setAttendancesVisib(false);
    setHostedMealsVisib(false);
    setProfileVisib(false);
  }

  const displayAttendances = () => {
    setMessagesVisib(false);
    setAttendancesVisib(true);
    setHostedMealsVisib(false);
    setProfileVisib(false);
  }

  const displayHostedMeals = () => {
    setMessagesVisib(false);
    setAttendancesVisib(false);
    setHostedMealsVisib(true);
    setProfileVisib(false);
  }

  return (
    <div className="w-full">
      <div className="top-container max-h-[200px] relative ">

        <div className="text-container text-white">
          <SectionTitle> Welcome back, {currentUser.name} </SectionTitle>
        </div>

      </div>

      <div className="user-main-container h-min-[600px]">

            <div className="user-features-navigation ">
              <span onClick = { () => displayProfile() }>Mon profil</span><br/>
              <span onClick = { () => displayMessages() }>Mes messages</span><br/>
              <span onClick = { () => displayAttendances() }>Mes réservations</span><br/>
              <span onClick = { () => displayHostedMeals() }>Mes repas organisés</span>
            </div>

            <div className="user-feature-container ">
              { profileVisib && <MyProfile currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
              { messagesVisib && <MyMessages/>}
              { attendancesVisib && <MyAttendances/>}
              { hostedMealsVisib && <MyHostedMeals/>}
            </div>

      </div>
    </div>
  );
}

export default User;

