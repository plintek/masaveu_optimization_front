import Image from "@components/basic/Image";
import { Button } from "@mui/material";
import React from "react";

interface ControlButtonProps {
    onClick: () => void;
    icon: string;
    gridColumn: string;
    gridRow: string;
    imageWidth: string;
    borderRadius: string;
}

function ControlButton({ onClick, icon, gridColumn, gridRow, imageWidth, borderRadius }: ControlButtonProps) {
    return (
        <Button
            onClick={onClick}
            style={{
                gridColumn,
                gridRow,
                backgroundColor: "white",
                height: "48px",
                width: "48px",
                minWidth: "48px",
                padding: "0px",
                borderRadius,
            }}
        >
            <Image src={icon} width={imageWidth} />
        </Button>
    );
}

export default ControlButton;
