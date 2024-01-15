import React, { ReactElement } from "react";
import FontStyles from "./components/FontStyles";
import Main from "./components/Main";
import Reset from "./components/Reset";

function Styles(): ReactElement {
    return (
        <>
            <Reset />
            <Main />
            <FontStyles />
        </>
    );
}

export default Styles;
