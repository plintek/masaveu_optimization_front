import React, { ReactElement, useEffect, useRef, useState } from "react";

import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    useTheme,
} from "@mui/material";
import Container from "@components/basic/Container";
import { spaces } from "@styles/spaces";
import Image from "@components/basic/Image";
import { DisplayS, Subtitle } from "@components/basic/Text";
import Form from "@components/basic/Form";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Logo from "@assets/logos/logo.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ApiUtility from "@utils/Api.utility";

export interface PasswordFormValues {
    email: string;
}

function ForgotPassword(): ReactElement {
    const { palette } = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const form = useRef<HTMLFormElement>(null);

    const [formValues, setFormValues] = useState<PasswordFormValues>({
        email: "",
    });

    const checkFormValues = () => formValues.email.length > 0;

    const changeFormValues = (values: Partial<PasswordFormValues>) => {
        setFormValues({ ...formValues, ...values });
    };

    const handleForgotPassword = async () => {
        setIsLoading(true);
        const response = await ApiUtility.request({
            method: "POST",
            url: "password_reset/",
            data: {
                email: formValues.email,
            },
        });
        setIsLoading(false);
        if (response.status == "OK") {
            return {
                status: 200,
            };
        }

        return response;
    };

    return (
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
                            {t("Login.title")}
                        </DisplayS>
                        <Subtitle regular>{t("Login.subtitle")}</Subtitle>
                    </Container>
                    <Container width="100%" maxWidth="420px">
                        <Form
                            elementRef={form}
                            onSubmit={handleForgotPassword}
                            setIsLoading={setIsLoading}
                            marginAlertBox={`0 0 ${spaces.l} 0`}
                            successMessage={
                                t("ForgotPassword.successMessage") || ""
                            }
                        >
                            <Container
                                flex={{ direction: "column", rowGap: spaces.m }}
                            >
                                <Container
                                    flex={{
                                        direction: "column",
                                        rowGap: spaces.s,
                                    }}
                                >
                                    <FormControl variant="outlined">
                                        <InputLabel htmlFor="email">
                                            {t("email")}
                                        </InputLabel>
                                        <OutlinedInput
                                            id="email"
                                            type="text"
                                            value={formValues.email}
                                            onChange={(event) =>
                                                changeFormValues({
                                                    email: event.target.value,
                                                })
                                            }
                                            label={t("email")}
                                        />
                                    </FormControl>
                                </Container>
                                <Container
                                    margin={{ top: spaces.mhalf }}
                                    flex={{ columnGap: spaces.m }}
                                >
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate("/login")}
                                        fullWidth
                                    >
                                        {t("back_to_login")}
                                    </Button>
                                    <LoadingButton
                                        loading={isLoading}
                                        variant="contained"
                                        type="submit"
                                        disabled={!checkFormValues()}
                                        endIcon={<ArrowForwardIcon />}
                                        fullWidth
                                    >
                                        {t("next")}
                                    </LoadingButton>
                                </Container>
                            </Container>
                        </Form>
                    </Container>
                </Container>
            </Container>
        </Container>
    );
}
export default ForgotPassword;
