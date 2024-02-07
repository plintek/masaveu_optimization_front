import Container from "@components/basic/Container";
import { CaptionText, TextSpan } from "@components/basic/Text";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { useTheme } from "@mui/material";
import { spaces } from "@styles/spaces";
import DateUtility from "@utils/Date.utility";
import MapLayersUtility from "@utils/MapLayers.utility";
import TextUtility from "@utils/Text.utility";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface DefaultPopupDataProps {
    data: AnyObject;
}

function DefaultPopupData({ data }: DefaultPopupDataProps) {
    const { palette } = useTheme();
    const { t } = useTranslation();

    const [extraProps, setExtraProps] = useState<AnyObject>({});

    useEffect(() => {
        if (data.extraProps) {
            (async () => {
                let extraPropsArray: AnyObject[] = await Promise.all(
                    Object.keys(data.extraProps)
                        .filter(
                            (key: string) =>
                                key !== "id" &&
                                key !== "selected" &&
                                MapLayersUtility.isFieldVisibleInPopup(key, data.entityName),
                        )
                        .map((key: string) => {
                            return new Promise((resolve) => {
                                (async () => {
                                    let value = data.extraProps[key];

                                    if (typeof value === "object") {
                                        value = "-";
                                    } else {
                                        if (typeof value === "number" || TextUtility.isNumeric(value)) {
                                            value = await MapLayersUtility.getRelationField(
                                                data.entityName,
                                                key,
                                                value,
                                            );
                                        } else if (DateUtility.isDate(value)) {
                                            if (DateUtility.isDateAndTime(value)) {
                                                value = DateUtility.formatDatetimeFromString(value);
                                            } else {
                                                value = DateUtility.formatDateFromString(value);
                                            }
                                        } else {
                                            value = TextUtility.limitLengthIfNoSpaces(value, 20);
                                        }
                                    }

                                    resolve({ [key]: value });
                                })();
                            }) as Promise<AnyObject>;
                        }),
                );
                let newExtraProps: AnyObject = extraPropsArray.reduce(
                    (accumulator: AnyObject, currentValue: AnyObject) => {
                        return { ...accumulator, ...currentValue };
                    },
                    {},
                );

                setExtraProps(newExtraProps);
            })();
        }
    }, [data]);

    return (
        <>
            {data.extraProps && (
                <Container flex={{ direction: "column", rowGap: spaces.mhalf }}>
                    <Container flex={{ direction: "column", rowGap: spaces.s }}>
                        {data.id && (
                            <CaptionText margin={{ bottom: spaces.xs }} color={palette.grey[500]}>
                                {TextUtility.capitalizeFirstLetter(data.entityName)} ID:{" "}
                                <TextSpan regular>{data.id}</TextSpan>
                            </CaptionText>
                        )}
                        {Object.keys(extraProps).map((key: string) => (
                            <CaptionText
                                margin={{ bottom: spaces.xs }}
                                color={palette.grey[500]}
                                key={`default-popup-${key}-${Math.random()}`}
                            >
                                {t(`${TextUtility.capitalizeFirstLetter(key)}`) || TextUtility.capitalizeFirstLetter(key)}:{" "}
                                <TextSpan regular>{extraProps[key]}</TextSpan>
                            </CaptionText>
                        ))}
                    </Container>
                </Container>
            )}
        </>
    );
}

export default DefaultPopupData;
