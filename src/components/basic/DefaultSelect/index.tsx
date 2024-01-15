import React, { ReactElement, useEffect } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import styled from "styled-components";
import { AnyType } from "@interfaces/basic/Any.interface";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListSubheader from "@mui/material/ListSubheader";
import { useTheme } from "@mui/material/styles";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import Typography from "@mui/material/Typography";

interface StyledTextfieldProps {
    backgroundcolor?: string;
}

const StyledTextfield = styled(TextField)<StyledTextfieldProps>`
    background-color: ${({ theme, backgroundcolor }) =>
        backgroundcolor ? backgroundcolor : theme.palette.background.default};
`;

interface DefaultSelectProps {
    id?: string;
    backgroundColor?: string;
    label?: string;
    value?: string;
    placeholder?: string;
    options: { label: string; value: string }[];
    width?: number | string;
    height?: number | string;
    onChange?: (value: string) => void;
    loading?: boolean;
    disabled?: boolean;
    required?: boolean;
    emptyOption?: boolean | string;
}

function DefaultSelect({
    id,
    backgroundColor,
    value,
    label,
    placeholder,
    options,
    width = 300,
    height = "auto",
    onChange,
    loading = false,
    disabled = false,
    required = false,
    emptyOption = false,
}: DefaultSelectProps) {
    const [valueState, setValueState] = React.useState<string | undefined>(
        value
    );

    const formattedOptions = [
        ...(typeof emptyOption === "string"
            ? [{ label: emptyOption, value: "" }]
            : []),
        ...options,
    ];

    const handleChange = (event: AnyType, newValue: AnyObject | null) => {
        const value = newValue ? newValue.value : "";
        setValueState(value);
        if (onChange) {
            onChange(value);
        }
    };

    useEffect(() => {
        if (value !== valueState) {
            setValueState(value);
        }
    }, [value]);

    const selectedOption = formattedOptions.find(
        (option) => option.value === valueState
    );

    return (
        <Autocomplete
            disablePortal
            id={id}
            sx={{ width }}
            options={formattedOptions}
            disableClearable
            disabled={disabled || loading}
            value={
                valueState && selectedOption
                    ? {
                          value: valueState,
                          label: selectedOption.label,
                      }
                    : {
                          label: formattedOptions[0]?.label || "",
                          value: formattedOptions[0]?.value || "",
                      }
            }
            isOptionEqualToValue={(option, value) =>
                option.value === value.value
            }
            onChange={handleChange}
            loading={loading}
            renderInput={(params) => (
                <StyledTextfield
                    {...params}
                    backgroundcolor={backgroundColor}
                    variant="outlined"
                    label={label}
                    placeholder={placeholder}
                    required={required}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            renderOption={(props, option) => [props, option] as React.ReactNode}
            disableListWrap
            ListboxComponent={ListboxComponent}
        />
    );
}

export default DefaultSelect;

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;
    const dataSet = data[index];
    const inlineStyle = {
        ...style,
        top: (style.top as number) + LISTBOX_PADDING,
    };

    if (dataSet.hasOwnProperty("group")) {
        return (
            <ListSubheader
                key={dataSet.key}
                component="div"
                style={inlineStyle}
            >
                {dataSet.group}
            </ListSubheader>
        );
    }

    return (
        <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
            {dataSet[1].label}
        </Typography>
    );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
    const ref = React.useRef<VariableSizeList>(null);
    React.useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData: ReactElement[] = [];
    (children as ReactElement[]).forEach(
        (item: ReactElement & { children?: ReactElement[] }) => {
            itemData.push(item);
            itemData.push(...(item.children || []));
        }
    );

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
        noSsr: true,
    });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child: ReactElement) => {
        if (child.hasOwnProperty("group")) {
            return 48;
        }

        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    width="100%"
                    ref={gridRef}
                    outerElementType={OuterElementType}
                    innerElementType="ul"
                    itemSize={(index: number) => getChildSize(itemData[index])}
                    overscanCount={5}
                    itemCount={itemCount}
                >
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});
