import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { ActionObject } from "../Reducer";

export function testAction(
    dispatch: React.Dispatch<ActionObject>,
    roles: AnyObject[]
): void {
    dispatch({ type: "TEST_ACTION", payload: { roles } });
}
