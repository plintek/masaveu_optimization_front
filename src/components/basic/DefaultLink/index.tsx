import { Link } from "react-router-dom";
import styled from "styled-components";

export const DefaultLink = styled(Link)`
    color: ${({ theme }) => theme.palette.text.primary};
`;
