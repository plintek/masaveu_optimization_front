import Container, { MotionContainer } from "@components/basic/Container";
import { BodyText } from "@components/basic/Text";
import { TextField, Tooltip, useTheme } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { spaces } from "@styles/spaces";
import React, { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";

interface GenericInputProps {
    id: string;
    label: string;
    readonly?: boolean;
    type?: "text" | "number" | "date" | "time" | "password";
    value: string;
    onChange?: (value: string) => void;
    step?: number;
    min?: number;
    max?: number;
    width?: string;
    helpText?: string;
    autoFocus?: boolean;
}

function GenericInput({
    id,
    label,
    readonly = false,
    type = "text",
    value,
    onChange,
    step,
    min,
    max,
    width = "fit-content",
    helpText,
    autoFocus = false,
}: GenericInputProps) {
    const { palette } = useTheme();

    const defaultInputStyle = {
        width: "100%",
        flexGrow: 1,
        backgroundColor: readonly ? "#FAD8B8" : palette.background.paper,
        color: palette.text.primary,

        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: palette.common.black,
            },
        },
    };

    return (
        <Container
            flex={{ direction: "column", rowGap: spaces.shalf }}
            height="fit-content"
            width={width}
        >
            <Container
                position="relative"
                width="fit-content"
                flex={{ columnGap: spaces.m }}
            >
                <BodyText bold as="label" htmlFor={id}>
                    {label}
                </BodyText>
                {helpText && (
                    <Tooltip title={helpText} placement="top-start" arrow>
                        <InfoIcon sx={{ cursor: "pointer" }} fontSize="small" />
                    </Tooltip>
                )}
            </Container>
            {type === "time" && (
                <TimePicker
                    value={value}
                    onChange={(value) => onChange && value && onChange(value)}
                    sx={defaultInputStyle}
                    ampm={false}
                    ampmInClock={false}
                    autoFocus={autoFocus}
                    readOnly={readonly}
                />
            )}
            {type === "date" && (
                <DatePicker
                    format="dd/MM/yyyy"
                    value={value !== "" ? value : null}
                    onChange={(value) => onChange && value && onChange(value)}
                    sx={defaultInputStyle}
                    disableOpenPicker
                    readOnly={readonly}
                    autoFocus={autoFocus}
                />
            )}
            {["text", "number", "password"].includes(type) && (
                <TextField
                    id={id}
                    type={type}
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    sx={defaultInputStyle}
                    lang="en"
                    autoFocus={autoFocus}
                    InputProps={{
                        readOnly: readonly,
                        lang: "en",
                        inputProps: {
                            //disable go to this input when tabbing
                            tabIndex: readonly ? -1 : 0,
                            min: min,
                            max: max,
                            step: step,
                            lang: "en",
                        },
                    }}
                />
            )}
        </Container>
    );
}

export default GenericInput;
