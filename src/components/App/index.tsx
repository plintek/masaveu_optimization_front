import React, { ReactElement, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesElement from "@components/RoutesElement";
import Styles from "@components/Styles";
import { AuthProvider } from "@context/Auth/Context";
import { CookiesProvider } from "react-cookie";
import Loader from "@components/Loader";
import Theme from "@components/Theme";
import { MapLayersProvider } from "@context/MapLayers/Context";
import { MapProvider } from "@context/Map/Context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { enUS } from "date-fns/locale";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { WebConfigProvider } from "@context/WebConfig/Context";

function App(): ReactElement {
    return (
        <CookiesProvider>
            <Theme>
                <WebConfigProvider>
                    <AuthProvider>
                        <LocalizationProvider
                            adapterLocale={enUS}
                            dateAdapter={AdapterDateFns}
                        >
                            <MapProvider>
                                <MapLayersProvider>
                                    <Suspense fallback={<Loader isLoading />}>
                                        <BrowserRouter>
                                            <Styles />
                                            <RoutesElement />
                                        </BrowserRouter>
                                    </Suspense>
                                </MapLayersProvider>
                            </MapProvider>
                        </LocalizationProvider>
                    </AuthProvider>
                </WebConfigProvider>
            </Theme>
        </CookiesProvider>
    );
}

export default App;
