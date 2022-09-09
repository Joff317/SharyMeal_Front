import React from "react";
import { Outlet } from "react-router-dom";
import { logged } from "./atoms/logged";
import { useAtomValue } from "jotai";
import FormLogin from "./authentication/login";

function ProtectedRoutes() {
    let isLogged = useAtomValue(logged);
    return <div>{isLogged ? <Outlet /> : <FormLogin />}</div>;
}

export default ProtectedRoutes;