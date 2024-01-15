import styled from "styled-components";
import Container from "../Container";

interface PushProps {
    position?: string;
    width?: string;
    height?: string;
}

const Push = styled(Container)<PushProps>`
    position: ${(props) => (props.position ? props.position : "relative")};
    min-width: ${(props) => (props.width ? props.width : "100%")};
    min-height: ${(props) => (props.height ? props.height : "100%")};
`;

export default Push;
