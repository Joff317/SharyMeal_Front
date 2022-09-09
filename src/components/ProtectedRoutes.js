import React from "react";
import { Outlet } from "react-router-dom";
import { loggedAtom } from "../atoms/loggedAtom";
import { useAtomValue } from "jotai";
import FormLogin from "./authentication/FormLogin/FormLogin";

function ProtectedRoutes() {
    let isLogged = useAtomValue(loggedAtom);
    return <div>{isLogged ? <Outlet /> : <FormLogin />}</div>;
}

export default ProtectedRoutes;