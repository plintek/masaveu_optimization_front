import { MenuItem, TextField } from "@mui/material";
import React, { useEffect } from "react";

export interface SelectBoxOptions {
    value: string;
    label: string;
}
interface SelectProps {
    options: SelectBoxOptions[];
    id: string;
    label: string;
    value?: string;
    onChange: (value: string) => void;
}

function SelectBox({ options, id, label, value, onChange }: SelectProps) {
    const [optionSelected, setOptionSelected] = React.useState<string>("");

    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOptionSelected(event.target.value);
        onChange(event.target.value);
    };

    useEffect(() => {
        if (value) {
            setOptionSelected(value);
        }
    }, [value]);

    return (
        <TextField
            fullWidth
            select
            id={id}
            label={label}
            variant="outlined"
            value={optionSelected}
            onChange={handleSelectChange}
            sx={{ backgroundColor: "#fff", width: "100%" }}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
}

export default SelectBox;
