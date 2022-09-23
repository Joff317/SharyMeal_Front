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
import "../../animations/transition.css";
import "./navigation.scss";
import "../LayoutBlur/layout-blur.css";

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
  const [popupBurgerVisible, setPopupBurgerVisible] = useState(false);
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
    setPopupBurgerVisible(false);
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
        //console.log(res);
      });

    navigate("/");
  };

  return (
    <div
      className={`navigation  flex w-full items-center z-30 justify-between gap-20 py-5 fixed px-24  ${
        changeColor
          ? "text-white bg-black_opacity backdrop-blur-sm "
          : "text-black bg-white_opacity backdrop-blur-sm"
      } `}
    >
      <NavLink
        className="text-xl"
        onClick={() => setPopupBurgerVisible(false)}
        to="/"
      >
        <span className="text-green font-bold-font">Shary</span>Meal
      </NavLink>

      <div className="navigation-center flex gap-12">
        <NavLink to="/about">About us</NavLink>
        <NavLink to="/create-meal">&#10024; Proposer un repas &#10024;</NavLink>
      </div>

      <div className="navigation-right flex justify-end gap-8 items-center">
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

      <div
        onClick={() => setPopupBurgerVisible(!popupBurgerVisible)}
        className="burger-menu hidden"
      >
        <span
          className={`tick hidden ${changeColor ? "set-white " : "set-black"}`}
        >
          {" "}
        </span>
        <span
          className={`tick hidden ${changeColor ? "set-white " : "set-black"}`}
        >
          {" "}
        </span>
        <span
          className={`tick hidden ${changeColor ? "set-white " : "set-black"}`}
        >
          {" "}
        </span>
      </div>

      {popupBurgerVisible && (
        <div className="open-popup popup-burger bg-white text-black flex flex-col rounded-lg p-5 gap-3 items-center absolute top-16 right-6 ">
          <div className="navigation-center-burger text-black flex flex-col ">
            <NavLink
              className="text-center hover:bg-green_light py-3 rounded-sm"
              onClick={() => setPopupBurgerVisible(false)}
              to="/about"
            >
              About us
            </NavLink>
            <NavLink
              className="hover:bg-green_light py-3 rounded-sm"
              onClick={() => setPopupBurgerVisible(false)}
              to="/create-meal"
            >
              &#10024; Proposer un repas &#10024;
            </NavLink>
          </div>
          <div className="navigation-right-burger  flex flex-col border-t border-grey-border pt-1 gap-2 w-full">
            {!loggedd ? (
              <>
                <p
                  className="cursor-pointer text-sm hover:bg-green_light py-3 rounded-sm text-center"
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
                        setPopupBurgerVisible={setPopupBurgerVisible}
                      />
                    ) : (
                      <FormRegister
                        setRegisterPopup={setRegisterPopup}
                        setSwitchPopup={setSwitchPopup}
                        setLoginPopup={setLoginPopup}
                        switchPopup={switchPopup}
                        setPopupBurgerVisible={setPopupBurgerVisible}
                      />
                    )}
                  </LayoutBlur>
                )}

                <p
                  className="cursor-pointer text-sm hover:bg-green_light py-3 text-center rounded-sm"
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
                        setPopupBurgerVisible={setPopupBurgerVisible}
                      />
                    ) : (
                      <FormLogin
                        setLoginPopup={setLoginPopup}
                        setSwitchPopup={setSwitchPopup}
                        setRegisterPopup={setRegisterPopup}
                        switchPopup={switchPopup}
                        setPopupBurgerVisible={setPopupBurgerVisible}
                      />
                    )}
                  </LayoutBlur>
                )}
              </>
            ) : (
              <div>
                <NavLink to="/user">
                  <span
                    onClick={() => setPopupBurgerVisible(false)}
                    className="flex items-center justify-center text-center gap-2 hover:bg-green_light py-3 rounded-sm"
                  >
                    Profil
                  </span>
                </NavLink>
                <button className="mt-2 pl-7" onClick={reset}>
                  <Button showText={true}>Déconnexion</Button>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;
