import React, { ReactElement } from "react";
import { useAuthState } from "@context/Auth/Context";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

function MaitenanceRedirect(): ReactElement {
    const state = useAuthState();
    const location = useLocation();
    const navigate = useNavigate();

    state.errorMessage &&
        state.errorMessage.message === "maitenance" &&
        location.pathname !== "/maitenance" &&
        navigate("/maitenance");

    return <></>;
}

export default MaitenanceRedirect;
