import Loader from "@components/Loader";
import { logout } from "@context/Auth/Actions";
import { useAuthDispatch, useAuthState } from "@context/Auth/Context";
import React, { useEffect } from "react";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

function Logout(): ReactElement {
    const state = useAuthState();
    const authDispatch = useAuthDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (state.isLogged) {
                await logout(authDispatch);
            }
            navigate("/login");
        })();
    }, []);

    return (
        <>
            <Loader isLoading />
        </>
    );
}

export default Logout;
