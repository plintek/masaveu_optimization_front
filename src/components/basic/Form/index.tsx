import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import Container from "../Container";
import AlertBox from "../AlertBox";
import { useTranslation } from "react-i18next";
import { AnyType } from "@interfaces/basic/Any.interface";
import { BodyText, TextSpan } from "../Text";
import { spaces } from "@styles/spaces";

interface FormProps {
    children?: React.ReactNode;
    onSubmit: () => Promise<AnyObject>;
    elementRef: React.LegacyRef<HTMLFormElement>;
    setSuccess?: Dispatch<SetStateAction<boolean>>;
    setIsLoading?: Dispatch<SetStateAction<boolean>>;
    successMessage?: string;
    disableEnterKey?: boolean;
    marginAlertBox?: string;
    showErrorDetails?: boolean;
}

function Form({
    children,
    onSubmit,
    elementRef,
    setSuccess,
    setIsLoading = () => {},
    successMessage = "Entity saved successfully",
    disableEnterKey = false,
    marginAlertBox = `${spaces.l} 0 0 0`,
    showErrorDetails = false,
}: FormProps): ReactElement {
    const { t } = useTranslation();
    const [errorIsVisible, setErrorIsVisible] = useState(false);
    const [errorContent, setErrorContent] = useState(<></>);

    const [formSuccess, setFormSuccess] = useState(false);

    const preSubmit: React.FormEventHandler<HTMLFormElement> = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        setIsLoading(true);
        setErrorIsVisible(false);
        event.preventDefault();

        // const recaptchaCheck = await handleReCaptchaVerify();
        const recaptchaCheck = true;

        if (recaptchaCheck) {
            const submitForm = await onSubmit();
            setIsLoading(false);

            if (
                submitForm.status &&
                submitForm.status !== 200 &&
                submitForm.status !== 201
            ) {
                let message = <></>;
                if (
                    !submitForm.data ||
                    !submitForm.data.error ||
                    submitForm.data.error == ""
                ) {
                    message = <>{t("error.unknown")}</>;
                    switch (submitForm.status) {
                        case 400:
                            message = <>{t("error.badRequest")}</>;
                            if (
                                submitForm.data &&
                                Object.keys(submitForm.data).length > 0
                            ) {
                                const title = (
                                    <BodyText>
                                        {t("error.fieldsAreNotValid")}
                                    </BodyText>
                                );
                                const items = Object.keys(submitForm.data).map(
                                    (key) => {
                                        if (key === "non_field_errors") {
                                            return submitForm.data[key].map(
                                                (error: AnyType) => {
                                                    return (
                                                        <BodyText>{`- ${error}`}</BodyText>
                                                    );
                                                }
                                            );
                                        } else {
                                            const hasData =
                                                showErrorDetails &&
                                                submitForm.data[key] &&
                                                Array.isArray(
                                                    submitForm.data[key]
                                                );
                                            return (
                                                <BodyText>
                                                    {`- ${t(`${key}`)}${
                                                        hasData ? ": " : ""
                                                    }`}
                                                    {hasData
                                                        ? submitForm.data[
                                                              key
                                                          ].map(
                                                              (
                                                                  error: AnyType
                                                              ) => {
                                                                  return (
                                                                      <TextSpan>{`${error}`}</TextSpan>
                                                                  );
                                                              }
                                                          )
                                                        : ""}
                                                </BodyText>
                                            );
                                        }
                                    }
                                );

                                message = (
                                    <>
                                        {title}
                                        {items}
                                    </>
                                );
                            }
                            break;
                        case 404:
                            message = <>{t("error.notFound")}</>;
                            break;
                        case 401:
                            message = <>{t("error.unauthorized")}</>;
                            break;
                        case 500:
                            message = <>{t("error.internalServerError")}</>;
                            break;
                    }
                } else {
                    message = <>{submitForm.data.error}</>;
                }

                setErrorContent(message);
                setErrorIsVisible(true);

                return false;
            }

            setFormSuccess(true);
            setTimeout(() => {
                setFormSuccess(false);
            }, 2000);
            if (setSuccess) {
                setSuccess(true);
            }
        } else {
            setIsLoading(false);
            setFormSuccess(false);

            return false;
        }

        return true;
    };

    return (
        <Container position="relative" height="100%">
            <form
                onSubmit={preSubmit}
                ref={elementRef}
                onKeyDown={(e) => {
                    if (disableEnterKey && e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
            >
                <AlertBox
                    severity="error"
                    visible={errorIsVisible}
                    setVisible={setErrorIsVisible}
                    margin={marginAlertBox}
                >
                    {errorContent}
                </AlertBox>

                <AlertBox
                    severity="success"
                    visible={formSuccess}
                    setVisible={setFormSuccess}
                    margin={marginAlertBox}
                >
                    {successMessage}
                </AlertBox>

                <Container height="100%">{children}</Container>
            </form>
        </Container>
    );
}

export default Form;
