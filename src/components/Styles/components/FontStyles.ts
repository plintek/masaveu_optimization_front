import { createGlobalStyle } from "styled-components";
import { deviceSizes, mediaMaxWidth } from "@styles/media";

import "./fonts/LucidaGrande.ttf";
import "./fonts/LucidaGrandeBold.ttf";

const FontStyles = createGlobalStyle`
    html {
        font-size: 100%;
        ${mediaMaxWidth(deviceSizes.mobileL)} {
            font-size: 80%;
        }
    }

    * {
        font-family: 'LucidaGrande', sans-serif;
        font-weight: 300;
    }
`;

export default FontStyles;
