import { AnyObject } from "@interfaces/basic/AnyObject.interface";

class FormUtility {
    static getFormDataAsObject = (form: HTMLFormElement): AnyObject => {
        const formData = new FormData(form);

        const findArray = /(\w\[\d\])|(\w\[\W)/g;
        const findEmptyArray = /\[\]/g;
        const findObject = /\[\D/g;
        const data: AnyObject = {};

        formData.forEach((value, key) => {
            if (key.match(findArray)) {
                const splitted = key.split("[");
                const name = splitted[0];

                if (!data[name]) {
                    data[name] = [];
                }

                if (key.match(findObject) && !key.match(findEmptyArray)) {
                    const index = splitted[1].split("]")[0];
                    if (!data[name][index]) {
                        data[name][index] = {};
                    }
                    const objectIndex = splitted[2].split("]")[0];
                    data[name][index][objectIndex] = value;
                } else {
                    data[name].push(value);
                }
            } else {
                data[key] = value;
            }
        });

        return data;
    };
}

export default FormUtility;
