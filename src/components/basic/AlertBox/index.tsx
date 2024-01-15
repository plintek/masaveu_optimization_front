import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import { spaces } from "@styles/spaces";
import { ReactElement } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { MotionContainer } from "../Container";
import TextUtility from "@utils/Text.utility";

interface AlertBoxProps {
    children?: React.ReactNode;
    severity: "error" | "warning" | "info" | "success";
    visible: boolean;
    setVisible: (visible: boolean) => void;
    margin?: string;
    width?: string;
}

function AlertBox({
    children,
    severity = "error",
    visible = true,
    setVisible,
    margin = `${spaces.l} 0 0 0`,
    width = "fit-content",
}: AlertBoxProps): ReactElement {
    const alertBoxVarians = {
        hidden: {
            opacity: 0,
            height: 0,
            margin: 0,
        },
        visible: {
            opacity: 1,
            height: "auto",
            margin,
        },
    };

    return (
        <MotionContainer
            variants={alertBoxVarians}
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            <Alert
                action={
                    <IconButton
                        aria-label="close"
                        size="small"
                        onClick={() => {
                            setVisible(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                severity={severity}
                sx={{ width }}
            >
                <AlertTitle>
                    {TextUtility.capitalizeFirstLetter(severity)}
                </AlertTitle>
                {children}
            </Alert>
        </MotionContainer>
    );
}

export default AlertBox;
