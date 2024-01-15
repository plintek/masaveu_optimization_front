import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { WebConfigState } from "../Context";

type Actions = "TEST_ACTION";

export interface ActionObject {
    type: Actions;
    loading?: boolean;
    payload?: AnyObject;
    error?: AnyObject;
}

export const WebConfigReducer = (
    initialState: WebConfigState,
    action: ActionObject
): WebConfigState => {
    switch (action.type) {
        case "TEST_ACTION":
            return initialState;

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
