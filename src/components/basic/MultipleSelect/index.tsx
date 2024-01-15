import React, { SyntheticEvent } from "react";
import {
    Autocomplete,
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    AutocompleteInputChangeReason,
    TextField,
} from "@mui/material";

interface MultipleSelectProps {
    id?: string;
    placeholder: string;
    value?: string[];
    options: string[];
    width?: string;
    inputEvent?: (event: SyntheticEvent<Element, Event>, value: string, reason: AutocompleteInputChangeReason) => void;
    onChange?: (
        event: SyntheticEvent<Element, Event>,
        value: string | string[] | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<string> | undefined
    ) => void;
    multiple?: boolean;
}

function MultipleSelect({
    id,
    value,
    placeholder,
    options,
    width = "300px",
    inputEvent,
    onChange,
    multiple = true,
}: MultipleSelectProps) {
    return (
        <Autocomplete
            multiple={multiple}
            disablePortal
            id={id}
            sx={{ width }}
            value={value}
            options={options}
            onChange={onChange ? onChange : () => {}}
            onInputChange={inputEvent ? inputEvent : () => {}}
            renderInput={(params) => <TextField {...params} variant="outlined" placeholder={placeholder} />}
        />
    );
}

export default MultipleSelect;
