import React, { ReactElement, useEffect, useRef, useState } from "react";

import {
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
import { useNavigate, useParams } from "react-router-dom";
import ApiUtility from "@utils/Api.utility";
import AlertBox from "@components/basic/AlertBox";

export interface PasswordFormValues {
    password: string;
    repeat_password: string;
    showPassword: boolean;
    showRepeatPassword: boolean;
}

function RecoverPassword(): ReactElement {
    const { palette } = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { token } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [showRepeatError, setShowRepeatError] = useState(false);
    const form = useRef<HTMLFormElement>(null);

    const [formValues, setFormValues] = useState<PasswordFormValues>({
        password: "",
        repeat_password: "",
        showPassword: false,
        showRepeatPassword: false,
    });

    const checkFormValues = () =>
        formValues.password.length > 0 && formValues.repeat_password.length > 0;

    const changeFormValues = (values: Partial<PasswordFormValues>) => {
        setFormValues({ ...formValues, ...values });
    };

    const handleRecoverPassword = async () => {
        setIsLoading(true);

        if (formValues.password !== formValues.repeat_password) {
            setShowRepeatError(true);
            setIsLoading(false);
            return;
        }

        setShowRepeatError(false);

        const response = await ApiUtility.request({
            method: "POST",
            url: "password_reset/confirm/",
            data: {
                token: token,
                password: formValues.password,
            },
        });
        setIsLoading(false);
        if (response.status == "OK") {
            setTimeout(() => {
                navigate("/login");
            }, 1000);
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
                            onSubmit={handleRecoverPassword}
                            setIsLoading={setIsLoading}
                            marginAlertBox={`0 0 ${spaces.l} 0`}
                            successMessage={
                                t("RecoverPassword.successMessage") || ""
                            }
                            showErrorDetails
                        >
                            <AlertBox
                                severity="error"
                                visible={showRepeatError}
                                setVisible={setShowRepeatError}
                                margin={`0 0 ${spaces.l} 0`}
                            >
                                {t("RecoverPassword.repeatPasswordError")}
                            </AlertBox>
                            <Container
                                flex={{ direction: "column", rowGap: spaces.m }}
                            >
                                <Container
                                    flex={{
                                        direction: "column",
                                        rowGap: spaces.s,
                                    }}
                                >
                                    <FormControl
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        <InputLabel htmlFor="password">
                                            {t("password")}
                                        </InputLabel>
                                        <OutlinedInput
                                            id="password"
                                            type={
                                                formValues.showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={formValues.password}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() =>
                                                            changeFormValues({
                                                                showPassword:
                                                                    !formValues.showPassword,
                                                            })
                                                        }
                                                        edge="end"
                                                    >
                                                        {formValues.password ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            onChange={(event) =>
                                                changeFormValues({
                                                    password:
                                                        event.target.value,
                                                })
                                            }
                                            label={t("password")}
                                        />
                                    </FormControl>
                                    <FormControl
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        <InputLabel htmlFor="password">
                                            {t("repeat_password")}
                                        </InputLabel>
                                        <OutlinedInput
                                            id="repeat_password"
                                            type={
                                                formValues.showRepeatPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={formValues.repeat_password}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() =>
                                                            changeFormValues({
                                                                showRepeatPassword:
                                                                    !formValues.showRepeatPassword,
                                                            })
                                                        }
                                                        edge="end"
                                                    >
                                                        {formValues.repeat_password ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            onChange={(event) =>
                                                changeFormValues({
                                                    repeat_password:
                                                        event.target.value,
                                                })
                                            }
                                            label={t("repeat_password")}
                                        />
                                    </FormControl>
                                </Container>
                                <Container margin={{ top: spaces.mhalf }}>
                                    <LoadingButton
                                        loading={isLoading}
                                        variant="contained"
                                        type="submit"
                                        disabled={!checkFormValues()}
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            width: "100%",
                                        }}
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
export default RecoverPassword;
