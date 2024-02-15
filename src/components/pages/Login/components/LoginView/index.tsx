import React from "react";
import Container from "@components/basic/Container";
import Image from "@components/basic/Image";
import Loader from "@components/Loader";
import { useTheme } from "@mui/material";
import { spaces } from "@styles/spaces";

import Logo from "@assets/logos/logo.png";
import LoginForm, { LoginFormProps } from "./components/LoginForm";
import { AuthState } from "@context/Auth/Context";
import { useTranslation } from "react-i18next";
import { DisplayS, Subtitle } from "@components/basic/Text";
import LegalLinks from "./components/LegalLinks";

interface LoginViewProps extends LoginFormProps {
    authState: AuthState;
}

function LoginView(props: LoginViewProps) {
    const { t } = useTranslation();
    const { palette } = useTheme();

    return props.authState.loading ? (
        <Loader isLoading />
    ) : (
        <Container
            backgroundColor={palette.grey[200]}
            height="100vh"
            flex={{ justifyContent: "center", alignItems: "center" }}
        >
            <Container width="550px">
                <Container
                    margin={{ bottom: spaces.shalf }}
                    backgroundColor={palette.background.default}
                    padding={{
                        all: spaces.lhalf,
                        top: spaces.xlhalf,
                        bottom: spaces.mhalf,
                    }}
                    flex={{ direction: "column", alignItems: "center" }}
                    border={{
                        radius: "8px",
                    }}
                    boxShadow="0px 0px 18px 10px rgba(0, 73, 44, 0.25);"
                >
                    <Container
                        margin={{ bottom: spaces.lhalf }}
                        flex={{ direction: "column", alignItems: "center" }}
                    >
                        <Container
                            backgroundColor={palette.background.default}
                            position="absolute"
                            transform="translateY(-85%)"
                            border={{
                                all: `1px solid ${palette.grey[300]}`,
                                radius: "6px",
                            }}
                            boxShadow="0px -9px 8px rgba(0, 73, 44, 0.25)"
                            padding={{ all: `${spaces.mhalf} ${spaces.m}` }}
                        >
                            <Image
                                src={Logo}
                                alt={t(`Project.name`) || ""}
                                height="50px"
                            />
                        </Container>
                        <DisplayS
                            regular
                            margin={{ top: spaces.l, bottom: spaces.shalf }}
                        >
                            {t("Masaveu")}
                        </DisplayS>
                        <Subtitle regular>
                            {t("Truck optimization platform")}
                        </Subtitle>
                    </Container>
                    <Container width="100%" maxWidth="420px">
                        <LoginForm {...props} />
                    </Container>
                </Container>
            </Container>
        </Container>
    );
}

export default LoginView;
