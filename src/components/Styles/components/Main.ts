import { createGlobalStyle } from "styled-components";

const Main = createGlobalStyle`
    html, body {
        overflow-x: hidden;
    }
    *::selection {
        background: rgba(0, 73, 44, 0.2);
    }
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
        background: rgba(0, 73, 44, 0.8);
    }

    ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 73, 44, 0.6);
    }
    a {
        text-decoration: none;
        font-weight: 500;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export default Main;
