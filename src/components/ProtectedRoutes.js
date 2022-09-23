import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { loggedAtom } from "../atoms/loggedAtom";
import { useAtomValue } from "jotai";
import FormLogin from "./authentication/FormLogin/FormLogin";
import Home from "../pages/Home/Home";

function ProtectedRoutes() {
  let isLogged = useAtomValue(loggedAtom);
  const navigate = useNavigate();
  return <div>{isLogged ? <Outlet /> : navigate("/")}</div>;
}

export default ProtectedRoutes;
