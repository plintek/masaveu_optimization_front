import React from "react";
import { createRoot } from "react-dom/client";
import App from "@components/App";
import I18nManager from "@config/i18n";

(async () => {
    const loadI18n = await I18nManager.initTranslations();

    if (loadI18n) {
        const container = document.getElementById("root");
        if (container) {
            const root = createRoot(container);
            root.render(<App />);
        }
    }
})();
