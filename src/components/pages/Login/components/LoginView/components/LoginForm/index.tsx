import React from "react";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Form from "@components/basic/Form";
import Container from "@components/basic/Container";
import { LoginFormValues } from "@components/pages/Login";
import { spaces } from "@styles/spaces";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { useTranslation } from "react-i18next";
import { CaptionText } from "@components/basic/Text";
import { LinkContainer } from "@components/basic/LinkContainer";

export interface LoginFormProps {
    form: React.LegacyRef<HTMLFormElement>;
    handleLogin: () => Promise<AnyObject>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    formValues: LoginFormValues;
    setFormValues: (values: Partial<LoginFormValues>) => void;
    checkFormValues: () => boolean;
}

function LoginForm({
    form,
    handleLogin,
    setIsLoading,
    setSuccess,
    isLoading,
    formValues,
    setFormValues,
    checkFormValues,
}: LoginFormProps) {
    const { t } = useTranslation();

    return (
        <Form
            elementRef={form}
            onSubmit={handleLogin}
            setIsLoading={setIsLoading}
            setSuccess={setSuccess}
            marginAlertBox={`0 0 ${spaces.l} 0`}
        >
            <Container flex={{ direction: "column", rowGap: spaces.m }}>
                <Container flex={{ direction: "column", rowGap: spaces.s }}>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="username">
                            {t("username")}
                        </InputLabel>
                        <OutlinedInput
                            id="username"
                            type="text"
                            value={formValues.username}
                            onChange={(event) =>
                                setFormValues({ username: event.target.value })
                            }
                            label={t("username")}
                        />
                    </FormControl>
                    <FormControl variant="outlined" margin="dense">
                        <InputLabel htmlFor="password">
                            {t("password")}
                        </InputLabel>
                        <OutlinedInput
                            id="password"
                            type={formValues.showPassword ? "text" : "password"}
                            value={formValues.password}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                            setFormValues({
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
                                setFormValues({ password: event.target.value })
                            }
                            label={t("password")}
                        />
                    </FormControl>
                </Container>
                <Container
                    flex={{
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                    margin={{ top: spaces.xs, bottom: spaces.m }}
                >
                    <LinkContainer to="/forgot-password">
                        <CaptionText regular>
                            {t("Login.forgot_password")}
                        </CaptionText>
                    </LinkContainer>
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
    );
}

export default LoginForm;
