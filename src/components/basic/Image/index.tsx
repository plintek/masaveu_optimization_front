import styled, { css } from "styled-components";

interface ImageProps {
    height?: string;
    objectFit?: string;
}

const Image = styled.img<ImageProps>`
    max-width: 100%;
    ${({ height }) =>
        height &&
        css`
            height: ${height};
        `};
    ${({ objectFit }) =>
        objectFit &&
        css`
            object-fit: ${objectFit};
        `};
`;

export default Image;
