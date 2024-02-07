import { ViewState, BoundariesMap } from "../Context";
import { ActionObject } from "../Reducer";

export function updatedMapSize(dispatch: React.Dispatch<ActionObject>): void {
    dispatch({ type: "UPDATED_MAP_SIZE" });
}

export function changeViewState(
    dispatch: React.Dispatch<ActionObject>,
    viewState: ViewState
): void {
    dispatch({ type: "CHANGE_VIEW_STATE", payload: { viewState } });
}

export function flyToDestination(
    dispatch: React.Dispatch<ActionObject>,
    destination: ViewState
): void {
    dispatch({ type: "FLY_TO_DESTINATION", payload: { destination } });

    setTimeout(() => {
        dispatch({
            type: "CHANGE_VIEW_STATE",
            payload: {
                viewState: {
                    transitionDuration: undefined,
                    transitionInterpolator: undefined,
                },
            },
        });
    }, 1000);
}

export function changeZoom(
    dispatch: React.Dispatch<ActionObject>,
    zoom: number
): void {
    dispatch({ type: "CHANGE_ZOOM", payload: { zoom } });
}

export function changeLoading(
    dispatch: React.Dispatch<ActionObject>,
    isLoading: boolean
): void {
    dispatch({ type: "CHANGE_LOADING", payload: { isLoading } });
}

export function changeBoundaries(
    dispatch: React.Dispatch<ActionObject>,
    boundaries: BoundariesMap
): void {
    dispatch({ type: "CHANGE_BOUNDARIES", payload: { boundaries } });
}

export function changeFitBounds(dispatch: React.Dispatch<ActionObject>, fitBounds: number[]): void {
    dispatch({ type: "CHANGE_FIT_BOUNDS", payload: { fitBounds } });
}