import Container from "@components/basic/Container";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styled from "styled-components";

const FileTextField = styled(TextField)`
    & .MuiOutlinedInput-root {
        width: calc(100% + 10px);
        & fieldset {
            border-right: none;
            border-radius: 5px 0 0 5px;
        }
    }
`;

const UploadButtonStyle = {
    boxShadow: "none",
    borderRadius: "0 5px 5px 0",
    "&:hover": {
        boxShadow: "none",
    },
};

interface FileInputProps {
    label: string;
    buttonLabel?: string;
    onChange?: (file?: File) => void;
}

function FileInput({ label, buttonLabel = "Subir", onChange }: FileInputProps) {
    const [fileSelected, setFileSelected] = useState<string>("");

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target && event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file) {
                setFileSelected(file.name);
                if (onChange) {
                    onChange(file);
                }
            } else {
                if (onChange) {
                    onChange();
                }
            }
        }
    };

    return (
        <Container flex>
            <FileTextField
                disabled
                fullWidth
                label={label}
                value={fileSelected}
                InputLabelProps={{
                    shrink: !!fileSelected,
                }}
            />
            <Button variant="contained" style={UploadButtonStyle} component="label" endIcon={<ArrowForwardIcon />}>
                {buttonLabel}
                <input type="file" hidden onChange={handleFileUpload} />
            </Button>
        </Container>
    );
}

export default FileInput;
