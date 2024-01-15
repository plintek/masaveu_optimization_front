import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import es from "@lang/es.json";
import en from "@lang/en.json";

class I18nManager {
    static resources: AnyObject = {
        en: {
            translation: {},
        },
        es: {
            translation: {},
        },
    };

    static initTranslations = async (): Promise<AnyObject> => {
        return new Promise(async (resolve, reject) => {
            en.forEach((translation: AnyObject) => {
                if (translation && translation.key && translation.value) {
                    I18nManager.resources.en.translation[translation.key] =
                        translation.value;
                }
            });
            es.forEach((translation: AnyObject) => {
                if (translation && translation.key && translation.value) {
                    I18nManager.resources.es.translation[translation.key] =
                        translation.value;
                }
            });

            i18next
                .use(initReactI18next) // passes i18n down to react-i18next
                .init(
                    {
                        returnNull: false,
                        resources: I18nManager.resources,
                        fallbackLng: "en",

                        interpolation: {
                            escapeValue: false, // react already safes from xss
                        },
                    },
                    (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(I18nManager.resources);
                        }
                    }
                );
        });
    };
}

export default I18nManager;
