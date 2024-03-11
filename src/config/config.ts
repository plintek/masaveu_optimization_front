import { routes } from "@config/routes";
import { Config } from "@interfaces/config/Config.interface";

const env = import.meta.env;
const config: Config = {
    name: "masaveu_optimization_front",
    env: env.VITE_ENV || "production",
    endpoint_url: env.VITE_ENDPOINT_URL || "http://localhost:8000/api/v1/", //"http://devctv.dotgiscorp.com:8000/api/v1/"
    routes,
    recaptcha: {
        siteKey: "6Lcof8IfAAAAAEy9uFD_de4wR--y_GPw68tqgme3",
    },

    theme: "light",
    mapbox: {
        accessToken:
            "pk.eyJ1IjoiY3Jpc2htIiwiYSI6ImNsMWJ0c2k5ejAxNWEzcHAzZXg0MTkxYncifQ.Thm2Y2gd8goMTd0JPsIUlw",
        style: {
            light: "mapbox://styles/mapbox/light-v10",
            satellite: "mapbox://styles/mapbox/satellite-v9",
        },
    },
};

export { config };
