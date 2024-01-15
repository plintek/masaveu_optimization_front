import { Dimensions, Flex, Grid } from "@interfaces/styles/Layout.interface";
import { mediaMaxWidth } from "./media";

export const sidebarWidth = "95px";

export const contentWidth = {
    max: "1800px",
    medium: "1170px",
    min: "900px",
};

export const layoutBreakpoint = {
    desktop: "1380px",
};

export const generateMargins = (margin: Dimensions): string => {
    let result = "";

    result += margin.all
        ? `
              margin: ${margin.all};
          `
        : "";
    result += margin.top
        ? `
              margin-block-start: ${margin.top};
          `
        : "";
    result += margin.bottom
        ? `
              margin-block-end: ${margin.bottom};
          `
        : "";
    result += margin.left
        ? `
              margin-inline-start: ${margin.left};
          `
        : "";
    result += margin.right
        ? `
              margin-inline-end: ${margin.right};
          `
        : "";

    return result;
};

export const generatePaddings = (padding: Dimensions): string => {
    let result = "";

    result += padding.all
        ? `
              padding: ${padding.all};
          `
        : "";
    result += padding.top
        ? `
              padding-block-start: ${padding.top};
          `
        : "";
    result += padding.bottom
        ? `
              padding-block-end: ${padding.bottom};
          `
        : "";
    result += padding.left
        ? `
              padding-inline-start: ${padding.left};
          `
        : "";
    result += padding.right
        ? `
              padding-inline-end: ${padding.right};
          `
        : "";

    return result;
};

export const generateFlexLayout = (flex: Flex | boolean): string => {
    let result = "display: flex;";

    if (typeof flex === "object") {
        result += flex.direction
            ? `
                  flex-direction: ${flex.direction};
              `
            : "";
        result += flex.wrap
            ? `
                  flex-wrap: ${flex.wrap};
              `
            : "";
        result += flex.justifyContent
            ? `
                  justify-content: ${flex.justifyContent};
              `
            : "";
        result += flex.alignItems
            ? `
                  align-items: ${flex.alignItems};
              `
            : "";
        result += flex.rowGap
            ? `
                  row-gap: ${flex.rowGap};
              `
            : "";
        result += flex.columnGap
            ? `
                  column-gap: ${flex.columnGap};
              `
            : "";

        result += flex.rowBreak
            ? `
                  ${mediaMaxWidth(flex.rowBreak)} {
                      flex-direction: column;
                  }
              `
            : "";
    }

    return result;
};

export const generateGridLayout = (grid: Grid | boolean): string => {
    let result = "display: grid;";

    if (typeof grid === "object") {
        result += grid.columns
            ? `
                  grid-template-columns: ${grid.columns};
              `
            : "";
        result += grid.rows
            ? `
                  grid-template-rows: ${grid.rows};
              `
            : "";
        result += grid.justifyContent
            ? `
                  justify-content: ${grid.justifyContent};
              `
            : "";
        result += grid.alignItems
            ? `
                  align-items: ${grid.alignItems};
              `
            : "";
        result += grid.rowGap
            ? `
                  row-gap: ${grid.rowGap};
              `
            : "";
        result += grid.columnGap
            ? `
                  column-gap: ${grid.columnGap};
              `
            : "";
    }

    return result;
};

export const generateBorders = (border: Dimensions): string => {
    let result = "";

    result += border.radius
        ? `
              border-radius: ${border.radius};
          `
        : "";
    result += border.all
        ? `
              border: ${border.all};
          `
        : "";
    result += border.top
        ? `
              border-top: ${border.top};
          `
        : "";
    result += border.bottom
        ? `
              border-bottom: ${border.bottom};
          `
        : "";
    result += border.left
        ? `
              border-left: ${border.left};
          `
        : "";
    result += border.right
        ? `
              border-right: ${border.right};
          `
        : "";

    return result;
};

export const generatePositionProperties = (positionProperties: Dimensions): string => {
    let result = "";

    result += positionProperties.top
        ? `
              top: ${positionProperties.top};
          `
        : "";
    result += positionProperties.bottom
        ? `
              bottom: ${positionProperties.bottom};
          `
        : "";
    result += positionProperties.left
        ? `
              left: ${positionProperties.left};
          `
        : "";
    result += positionProperties.right
        ? `
              right: ${positionProperties.right};
          `
        : "";

    return result;
};
