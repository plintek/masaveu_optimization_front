import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    AuthState,
    useAuthDispatch,
    useAuthState,
} from "@context/Auth/Context";
import LoginView from "./components/LoginView";
import { loginUser } from "@context/Auth/Actions";

export interface LoginFormValues {
    username: string;
    password: string;
    showPassword: boolean;
}

function Login(): ReactElement {
    const [values, setValues] = useState<LoginFormValues>({
        username: "",
        password: "",
        showPassword: false,
    });

    const authDispatch = useAuthDispatch();
    const authState: AuthState = useAuthState();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const form = useRef<HTMLFormElement>(null);

    const handleLogin = () => {
        return loginUser(authDispatch, {
            username: values.username,
            password: values.password,
        });
    };

    useEffect(() => {
        if (success && !authState.loading && authState.isLogged) {
            navigate("/");
        }
    }, [success]);

    const checkFormValues = () =>
        values.username.length > 0 && values.password.length > 0;

    const setFormValues = (formValues: Partial<LoginFormValues>) => {
        setValues({ ...values, ...formValues });
    };

    return (
        <LoginView
            authState={authState}
            form={form}
            handleLogin={handleLogin}
            setIsLoading={setIsLoading}
            setSuccess={setSuccess}
            isLoading={isLoading}
            formValues={values}
            setFormValues={setFormValues}
            checkFormValues={checkFormValues}
        />
    );
}
export default Login;
