import { useAtom } from "jotai";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { loggedAtom } from "../../../atoms/loggedAtom";
import User from "../../../icons/User";
import { API } from "../../../utils/variables";
import Button from "../../actions/Button";
import FormLogin from "../../authentication/FormLogin/FormLogin";
import LayoutBlur from "../LayoutBlur/LayoutBlur";
import FormRegister from "../../authentication/FormRegister/FormRegister";

function Navigation() {
  let activeStyle = {
    textDecoration: "underline",
  };
  const [loggedd, setLogged] = useAtom(loggedAtom);
  const token = Cookies.get("token");
  const [registerPopup, setRegisterPopup] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [switchPopup, setSwitchPopup] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/user") {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  }, [location]);

  const reset = () => {
    setLogged(false);
    Cookies.remove("token");
    setLoginPopup(false);
    setRegisterPopup(false);
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

    navigate("/");
  };

  return (
    <div
      className={`flex w-full items-center z-50 justify-between gap-20 py-5 fixed px-24  ${
        changeColor
          ? "text-white bg-black_opacity backdrop-blur-sm "
          : "text-black bg-white_opacity backdrop-blur-sm"
      } `}
    >
      <NavLink to="/">
        <span className="font-bold-font">Shary</span> Meal
      </NavLink>

      <div className="flex gap-12">
        <NavLink to="/about">About us</NavLink>

        <NavLink to="/create-meal">&#10024; Proposer un repas &#10024;</NavLink>
      </div>

      <div className="flex justify-end gap-8 items-center">
        {!loggedd ? (
          <>
            <p
              className="cursor-pointer text-sm "
              onClick={() => setLoginPopup(true)}
            >
              Login
            </p>
            {loginPopup && (
              <LayoutBlur>
                {!switchPopup ? (
                  <FormLogin
                    setLoginPopup={setLoginPopup}
                    setSwitchPopup={setSwitchPopup}
                    setRegisterPopup={setRegisterPopup}
                    switchPopup={switchPopup}
                  />
                ) : (
                  <FormRegister
                    setRegisterPopup={setRegisterPopup}
                    setSwitchPopup={setSwitchPopup}
                    setLoginPopup={setLoginPopup}
                    switchPopup={switchPopup}
                  />
                )}
              </LayoutBlur>
            )}

            <p
              className="cursor-pointer text-sm"
              onClick={() => setRegisterPopup(true)}
            >
              Register
            </p>
            {registerPopup && (
              <LayoutBlur>
                {!switchPopup ? (
                  <FormRegister
                    setRegisterPopup={setRegisterPopup}
                    setSwitchPopup={setSwitchPopup}
                    setLoginPopup={setLoginPopup}
                    switchPopup={switchPopup}
                  />
                ) : (
                  <FormLogin
                    setLoginPopup={setLoginPopup}
                    setSwitchPopup={setSwitchPopup}
                    setRegisterPopup={setRegisterPopup}
                    switchPopup={switchPopup}
                  />
                )}
              </LayoutBlur>
            )}
          </>
        ) : (
          <>
            <NavLink to="/user">
              <span className="flex items-center gap-2">
                <User /> Profil
              </span>
            </NavLink>
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
