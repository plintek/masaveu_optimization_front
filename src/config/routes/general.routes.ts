import React from "react";
import { RouteElement } from "@interfaces/config/RouteElement.interface";

const Home = React.lazy(() => import("@pages/Home"));
const Login = React.lazy(() => import("@pages/Login"));
const ForgotPassword = React.lazy(() => import("@pages/ForgotPassword"));
const RecoverPassword = React.lazy(() => import("@pages/RecoverPassword"));
const Logout = React.lazy(() => import("@pages/Logout"));
const Maitenance = React.lazy(() => import("@pages/Maitenance"));

const generalRoutes: RouteElement[] = [
    {
        name: "Home",
        title: "Masaveu",
        path: "/",
        component: Home,
        private: true,
    },
    {
        name: "Login",
        title: "Log into your account",
        path: "/login",
        component: Login,
    },
    {
        name: "Forgot Password",
        title: "Forgot Password",
        path: "/forgot-password",
        component: ForgotPassword,
    },
    {
        name: "Recover Password",
        title: "Recover Password",
        path: "/recover-password/:token",
        component: RecoverPassword,
    },
    {
        name: "Logout",
        title: "Logout",
        path: "/logout",
        component: Logout,
    },
    {
        name: "Maitenance",
        title: "Maitenance",
        path: "/maitenance",
        component: Maitenance,
    },
];

export { generalRoutes };
