import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkContainer = styled(Link)`
    color: ${({ theme }) => theme.palette.text.primary};

    &:hover {
        text-decoration: none;
    }
`;
