import { useAtom } from "jotai";
import Cookies from "js-cookie";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loggedAtom } from "../../../atoms/loggedAtom";
import User from "../../../icons/User";
import { API } from "../../../utils/variables";
import Button from "../../actions/Button";

function Navigation() {
  let activeStyle = {
    textDecoration: "underline",
  };
  const [loggedd, setLogged] = useAtom(loggedAtom);
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const reset = () => {
    setLogged(false);
    Cookies.remove("token");
    navigate("/login");

    fetch(API + "users/sign_out", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="flex items-center justify-between gap-20 py-8 bg-slate-100 mx-24">
      <NavLink
        to="/"
      >
        <span className="font-bold-font">Shary</span> Meal
      </NavLink>

    <div className="flex gap-12">
      <NavLink to="/about">
       About us
      </NavLink>

      <NavLink to="/">
        Proposer un repas
      </NavLink>
    </div>  

    <div className="flex justify-end gap-8 items-center">
      {!loggedd ? (
        <>
          {" "}
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/register"
          >
            Register
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/login"
          >
            Login
          </NavLink>{" "}
        </>
    
      ) : (
        <>
          <NavLink
            to="/user"
          >
           <span className="flex items-center gap-2"><User/> Profil</span>
          </NavLink>{" "}
          <button onClick={reset}>
            <Button showText={true}>Déconnexion</Button>
          </button>
        </>
      )}
     </div>     
    </div>
  );
}

export default Navigation;
