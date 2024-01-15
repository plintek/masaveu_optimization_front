import Container from "@components/basic/Container";
import React from "react";
import ControlButton from "./components/ControlButton";
import MountainsIcon from "@assets/icons/map/mountains.svg";
import PlusIcon from "@assets/icons/map/plus.svg";
import MinusIcon from "@assets/icons/map/minus.svg";

interface ControlButtonsProps {
    handleMapStyleClick: () => void;
    handleZoom: (zoom: number) => void;
}

function ControlButtons({ handleMapStyleClick, handleZoom }: ControlButtonsProps) {
    return (
        <Container
            position="absolute"
            grid={{ columns: "1fr 1fr", rows: "1fr 1fr" }}
            positionProperties={{ right: "14px", bottom: "14px" }}
            width="96px"
            height="96px"
        >
            <ControlButton
                onClick={() => handleMapStyleClick()}
                icon={MountainsIcon}
                gridColumn="1"
                gridRow="2"
                imageWidth="24px"
                borderRadius="18px 0px 0px 18px"
            />
            <ControlButton
                onClick={() => handleZoom(0.5)}
                icon={PlusIcon}
                gridColumn="2"
                gridRow="1"
                imageWidth="20px"
                borderRadius="18px 18px 0px 0px"
            />
            <ControlButton
                onClick={() => handleZoom(-0.5)}
                icon={MinusIcon}
                gridColumn="2"
                gridRow="2"
                imageWidth="20px"
                borderRadius="0px 0px 18px 0px"
            />
        </Container>
    );
}

export default ControlButtons;
