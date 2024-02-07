import Container from "@components/basic/Container";
import React, { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import ReactMapGL, { MapRef } from "react-map-gl";

import { config } from "@config/config";
import Push from "@components/basic/Push";
import { useTheme } from "@mui/material";
import { AnyType } from "@interfaces/basic/Any.interface";

import { useMapDispatch, useMapState } from "@context/Map/Context";
import {
    changeViewState,
    changeZoom,
    changeBoundaries,
} from "@context/Map/Actions";
import ControlButtons from "./components/ControlButtons";
import { InteractiveState, PickInfo } from "@deck.gl/core/lib/deck";
import MapLoading from "./components/MapLoading";
import Popup, { PopupProps } from "./components/Popup";
import { WebMercatorViewport } from "@deck.gl/core";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import useWindowDimensions from "@hooks/windowDimensions.hook";

interface MapProps {
    layers: AnyType;
    getCursor?: (interactiveState: InteractiveState) => string;
    onClick?: <D>(info: PickInfo<D>, e: MouseEvent) => any;
    children?: React.ReactNode;
    popupProps?: PopupProps;
}

function Map({ layers, getCursor, onClick, children, popupProps }: MapProps) {
    const mapRef = React.useRef<MapRef>(null);

    const { palette } = useTheme();
    const { width, height } = useWindowDimensions();

    const { viewState, updatedMapSize, isLoading, fitBounds } = useMapState();
    const mapDispatcher = useMapDispatch();

    const [mapStyleState, setMapStyleState] = useState({
        style: "light",
    });

    const [isFirstLoader, setIsFirstLoader] = useState(false);

    useEffect(() => {
        setIsFirstLoader(true);
    }, []);

    const handleUpdateViewState = ({
        viewState,
        interactionState,
    }: {
        viewState: AnyType;
        interactionState: any;
    }) => {
        changeViewState(mapDispatcher, {
            latitude: viewState.latitude,
            longitude: viewState.longitude,
            zoom: viewState.zoom,
        });

        const { isDragging, isZooming, isPanning } = interactionState;
        if (
            (!isDragging && isZooming && isPanning) ||
            (!isDragging && !isPanning && isZooming === undefined)
        ) {
            const viewport = new WebMercatorViewport(viewState);
            const nw = viewport.unproject([0, 0]);
            const se = viewport.unproject([viewport.width, viewport.height]);

            changeBoundaries(mapDispatcher, {
                latMin: se[1],
                latMax: nw[1],
                longMin: se[0],
                longMax: nw[0],
            });
        }
    };

    useEffect(() => {
        setTimeout(() => {
            mapRef?.current?.resize();
        }, 300);
    }, [updatedMapSize]);

    const handleMapStyleClick = () => {
        const actualStyle = mapStyleState.style;
        let newStyle;
        actualStyle === "light"
            ? (newStyle = "satellite")
            : (newStyle = "light");
        setMapStyleState({ style: newStyle });
    };

    const handleZoom = (zoom: number) => {
        changeZoom(mapDispatcher, zoom);
    };

    const [mapPopupProps, setMapPopupProps] = useState<PopupProps | undefined>(
        popupProps
    );

    useEffect(() => {
        setMapPopupProps(popupProps);
    }, [popupProps]);

    useEffect(() => {
        if (fitBounds) {
            const [minX, minY, maxX, maxY] = fitBounds;
            const viewport = new WebMercatorViewport({
                width: width * 0.2,
                height,
            });
            let { longitude, latitude, zoom } = viewport.fitBounds(
                [
                    [minX, minY],
                    [maxX, maxY],
                ],
                {
                    padding: 50,
                },
            ) as AnyObject;

            if (zoom > 17) {
                zoom = 17;
            }

            changeViewState(mapDispatcher, {
                latitude,
                longitude,
                zoom,
            });
        }
    }, [fitBounds]);

    return (
        <Container
            position="relative"
            width="100%"
            height="100%"
            flexGrow={1}
            overflow={{ all: "hidden" }}
            border={{ radius: "18px" }}
        >
            <DeckGL
                layers={layers}
                viewState={viewState}
                onViewStateChange={handleUpdateViewState}
                controller={true}
                getCursor={getCursor}
                onClick={onClick}
                onHover={(info: AnyType) => {
                    if (!info.object) {
                        setMapPopupProps(undefined);
                    }
                }}
            >
                <ReactMapGL
                    ref={mapRef}
                    mapStyle={config.mapbox.style[mapStyleState.style]}
                    mapboxAccessToken={config.mapbox.accessToken}
                />
                {mapPopupProps && <Popup {...mapPopupProps} />}
            </DeckGL>

            {children}

            {isLoading && <MapLoading />}

            <ControlButtons
                handleMapStyleClick={handleMapStyleClick}
                handleZoom={handleZoom}
            />

            <Push
                backgroundColor={palette.background.default}
                position="absolute"
                positionProperties={{ bottom: "-50px" }}
                height="50px"
            />
        </Container>
    );
}

export default Map;
