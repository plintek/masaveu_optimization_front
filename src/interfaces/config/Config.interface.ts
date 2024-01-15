import { PaletteMode } from "@mui/material";
import { MapboxConfiguration } from "./Mapbox.interface";
import { RecaptchaConfiguration } from "./RecaptchaConfiguration.interface";
import { RouteElement } from "./RouteElement.interface";

export interface Config {
    name: string;
    env: string;
    endpoint_url: string;
    routes: RouteElement[];
    recaptcha: RecaptchaConfiguration;

    theme: PaletteMode;
    mapbox: MapboxConfiguration;
}
