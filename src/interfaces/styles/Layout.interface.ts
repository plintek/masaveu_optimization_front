export interface Dimensions {
    all?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    radius?: string;
}

export interface Flex {
    direction?: string;
    wrap?: string;
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
    alignItems?: "stretch" | "flex-start" | "flex-end" | "center";
    rowGap?: string;
    columnGap?: string;
    rowBreak?: string;
}

export interface Grid {
    columns?: string;
    rows?: string;
    justifyContent?: "start" | "end" | "center";
    alignItems?: "start" | "end" | "center";
    rowGap?: string;
    columnGap?: string;
}

export type OverflowValues = "hidden" | "visible" | "clip" | "scroll" | "auto";
export interface Overflow {
    all?: OverflowValues;
    x?: OverflowValues;
    y?: OverflowValues;
}

export type PointerEvents = "auto" | "none" | "box-none" | "box-only" | "inherit";
