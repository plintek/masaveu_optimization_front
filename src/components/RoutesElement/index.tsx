import React from "react";

import { Routes, Route } from "react-router-dom";
import { ReactElement } from "react";
import { config } from "@config/config";
import Page from "@components/Page";
import NotFound from "@components/pages/NotFound";
// import { useCookies } from "react-cookie";
// import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import MaitenanceRedirect from "@components/MaitenanceRedirect";
import RequireAuthentication from "./components/RequireAuthentication";

const RoutesElement: React.FC = (): ReactElement => {
    // const [cookies] = useCookies(["cookieConsent"]);
    return (
        <>
            {/* {cookies.cookieConsent && cookies.cookieConsent.activeCookies.includes("recaptcha") && ( */}
            {/* <GoogleReCaptchaProvider reCaptchaKey={config.recaptcha.siteKey} language="es"> */}
            <>
                <Routes>
                    {config.routes.map((route) =>
                        route.private ? (
                            <Route
                                key={route.name}
                                path={route.path}
                                element={
                                    <RequireAuthentication
                                        path={route.path}
                                        accessRole={route.accessRole}
                                    >
                                        <Page title={route.title}>
                                            {React.createElement(
                                                route.component,
                                                route.props
                                            )}
                                        </Page>
                                    </RequireAuthentication>
                                }
                            />
                        ) : (
                            <Route
                                key={route.name}
                                path={route.path}
                                element={
                                    <Page title={route.title}>
                                        {React.createElement(
                                            route.component,
                                            route.props
                                        )}
                                    </Page>
                                }
                            />
                        )
                    )}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <MaitenanceRedirect />
            </>
            {/* </GoogleReCaptchaProvider> */}
            {/* )} */}
        </>
    );
};

export default RoutesElement;
