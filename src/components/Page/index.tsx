import React, { ReactElement, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import GA4React from "ga-4-react";
import { checkLogin } from "@context/Auth/Actions";
import { useAuthDispatch, useAuthState } from "@context/Auth/Context";
import { useTranslation } from "react-i18next";

function Page({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}): ReactElement {
    const { t } = useTranslation();
    // const location = useLocation();
    const authDispatcher = useAuthDispatch();

    useEffect(() => {
        document.title = t(title) || "";
        checkLogin(authDispatcher);

        // if (GA4React.isInitialized()) {
        //     GA4React.getGA4React()?.pageview(location.pathname);
        // }

        window.scrollTo(0, 0);
    }, [title]);

    return <>{children}</>;
}

export default Page;
