import Container from "@components/basic/Container";
import Form from "@components/basic/Form";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { useTheme } from "@mui/material";
import { spaces } from "@styles/spaces";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import HeaderForm from "./components/HeaderForm";
import LegendForm from "./components/LegendForm";
import { useNavigate } from "react-router-dom";

interface GenericFormProps {
    children?: React.ReactNode;
    action: "add" | "edit";
    showPrintButton?: boolean;
    showSaveButton?: boolean;
    backLink?: string;
    reloadLink?: string;
    showLegend?: boolean;
    onSubmit?: () => AnyObject;
    handlePrintButtonClick?: () => void;
    entityName: string;
    showErrorDetails?: boolean;
    dataModified?: boolean;
}

function GenericForm({
    children,
    action,
    showPrintButton,
    showSaveButton = true,
    backLink,
    reloadLink,
    showLegend = true,
    onSubmit,
    handlePrintButtonClick,
    entityName,
    showErrorDetails = false,
    dataModified = false,
}: GenericFormProps) {
    const { t } = useTranslation();
    const { palette } = useTheme();
    const navigate = useNavigate();
    const elementRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = React.useState(false);
    const [saveAndNew, setSaveAndNew] = React.useState(false);

    const handleSubmitButtonClick = async (saveAndNew: boolean) => {
        setSaveAndNew(saveAndNew);
        return true;
    };

    const handleSubmit = async () => {
        setLoading(true);
        const response = onSubmit ? await onSubmit() : {};
        setLoading(false);

        setTimeout(() => {
            if (
                saveAndNew &&
                !(
                    response.status &&
                    response.status !== 200 &&
                    response.status !== 201
                )
            ) {
                navigate(`${reloadLink || backLink}/add`);
                location.reload();
            }
        }, 1000);

        return response;
    };

    return (
        <Container padding={{ bottom: spaces.xl }}>
            <Container
                flex={{ direction: "column", alignItems: "stretch" }}
                backgroundColor={palette.grey[200]}
                border={{ radius: "18px" }}
                margin={{ top: spaces.s }}
                padding={{ all: spaces.l, top: "0", bottom: spaces.l }}
            >
                <Form
                    onSubmit={handleSubmit}
                    elementRef={elementRef}
                    successMessage={`${entityName} saved successfully`}
                    disableEnterKey
                    showErrorDetails={showErrorDetails}
                >
                    <Container
                        flex={{ direction: "column", alignItems: "stretch" }}
                        height="100%"
                    >
                        <HeaderForm
                            backLink={backLink}
                            showPrintButton={showPrintButton}
                            showSaveButton={showSaveButton}
                            loading={loading}
                            handlePrintButtonClick={handlePrintButtonClick}
                            dataModified={dataModified}
                            handleSubmitButtonClick={handleSubmitButtonClick}
                        />
                        <Container
                            width="100%"
                            flexGrow={1}
                            padding={{
                                all: `${spaces.mhalf} 0`,
                                bottom: showLegend ? spaces.mhalf : "0",
                            }}
                            border={{
                                bottom: showLegend
                                    ? `1px solid ${palette.divider}`
                                    : "none",
                            }}
                        >
                            {children}
                        </Container>
                        {showLegend && <LegendForm />}
                    </Container>
                </Form>
            </Container>
        </Container>
    );
}

export default GenericForm;
