import React, { ReactElement } from "react";
import Container, { MotionContainer } from "@components/basic/Container";
import { useTheme } from "@mui/material";
import { CaptionText } from "@components/basic/Text";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SignOutIcon from "@components/basic/icons/SignOutIcon";
import { spaces } from "@styles/spaces";
import styled from "styled-components";
import { useAuthState } from "@context/Auth/Context";

interface ProfileOptionsProps {
    visible: boolean;
}

const containerVariants = {
    hidden: { x: 0 },
    show: {
        x: "400px",
    },
};

const SignOutButton = styled(Container)`
    transition: background-color 0.2s ease-out;
    :hover {
        background-color: ${({ theme }) => theme.palette.grey[900]};
    }
`;

function ProfileOptions({ visible }: ProfileOptionsProps): ReactElement {
    const { palette } = useTheme();
    const { t } = useTranslation();
    const { user } = useAuthState();
    const navigate = useNavigate();

    const handleSignOutButton = () => {
        navigate("/logout");
    };

    return (
        <Container transform="translateX(-100%)">
            <MotionContainer
                backgroundColor={palette.background.default}
                height="45px"
                position="absolute"
                positionProperties={{ left: "0" }}
                border={{ radius: "18px" }}
                variants={containerVariants}
                animate={visible ? "show" : "hidden"}
                transition={{ bounce: 0, duration: 0.2 }}
                flex={{ alignItems: "center" }}
                padding={{ left: spaces.lhalf }}
                overflow={{ all: "hidden" }}
            >
                <Container
                    padding={{ all: `0 ${spaces.m}` }}
                    height="100%"
                    flex={{ alignItems: "center" }}
                >
                    <CaptionText regular>
                        {t("role")}: {t(`Role.${user.role}`)}
                    </CaptionText>
                </Container>
                <SignOutButton
                    padding={{ all: `0 ${spaces.m}` }}
                    backgroundColor={palette.common.black}
                    cursor="pointer"
                    onClick={handleSignOutButton}
                    flex={{ alignItems: "center", columnGap: spaces.s }}
                    height="100%"
                >
                    <CaptionText regular color={palette.common.white}>
                        {t("sign_out")}
                    </CaptionText>
                    <SignOutIcon />
                </SignOutButton>
            </MotionContainer>
        </Container>
    );
}

export default ProfileOptions;
