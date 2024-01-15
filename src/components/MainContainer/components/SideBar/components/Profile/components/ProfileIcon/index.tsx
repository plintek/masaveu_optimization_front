import React from "react";
import Container from "@components/basic/Container";
import Image from "@components/basic/Image";
import styled from "styled-components";
import MasaveuLogo from "@assets/logos/logo.png";
import { useTheme } from "@mui/material";

interface ProfileStyleProps {
    scale: number;
}

const ProfileStyle = styled(Container)<ProfileStyleProps>`
    --dimensions: 43px;

    border: 1px solid ${({ theme }) => theme.palette.grey[300]};
    background-color: ${({ theme }) => theme.palette.background.default};

    width: calc(var(--dimensions) * ${(props) => props.scale});
    height: calc(var(--dimensions) * ${(props) => props.scale});
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

function ProfileIcon() {
    const { palette } = useTheme();

    return (
        <Container
            position="relative"
            width="24px"
            backgroundColor={palette.grey[100]}
        >
            <ProfileStyle scale={1}>
                <Image src={MasaveuLogo} width="24px" />
            </ProfileStyle>
        </Container>
    );
}

export default ProfileIcon;
