import Container from "@components/basic/Container";
import { BodyText, TextSpan } from "@components/basic/Text";

import { spaces } from "@styles/spaces";
import React from "react";
import { ReactElement } from "react";
import styled, { css } from "styled-components";
import { IconButton, SvgIconProps, Tooltip, useTheme } from "@mui/material";
import { LinkContainer } from "@components/basic/LinkContainer";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { changeVisibleMapLayerProperties } from "@context/MapLayers/Actions";
import { updatedMapSize } from "@context/Map/Actions";
import { useMapDispatch } from "@context/Map/Context";
import { useMapLayersDispatch } from "@context/MapLayers/Context";
import { MapLayerPropertyType } from "@interfaces/basic/MapLayer.interface";
import { useLocation, useNavigate } from "react-router-dom";

export interface SideBarMenuItemProps {
    name: string;
    route?: string;
    component?: ReactElement;
    Icon: (props: SvgIconProps<"svg", AnyObject>) => JSX.Element;
    isActive?: boolean;
    layerProperty?: MapLayerPropertyType;
    roles?: string[];
}

export const SideBarMenuItemContent = styled(Container)`
    transition: background-color 0.2s ease-out;
    ${BodyText}, ${TextSpan} {
        transition: color 0.2s ease-out;
    }

    ${(props) =>
        css`
            &:hover {
                background-color: ${props.theme.palette.backgroundTone100};
                ${BodyText}, ${TextSpan} {
                    color: ${props.theme.palette.foreground};
                }
            }
        `}
`;

function SideBarMenuItem({
    name,
    route,
    Icon,
    isActive,
    layerProperty,
    component,
}: SideBarMenuItemProps): ReactElement {
    const mapLayersDispatcher = useMapLayersDispatch();
    const mapDispatcher = useMapDispatch();
    const { palette } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const color = isActive ? palette.primary.main : palette.text.primary;

    const handleLinkClick = (
        event: React.MouseEvent<HTMLAnchorElement>
    ): void => {
        if (layerProperty) {
            event.preventDefault();
            if (location.pathname !== "/") {
                navigate("/");
            }
            changeVisibleMapLayerProperties(mapLayersDispatcher, layerProperty);
            updatedMapSize(mapDispatcher);
        }
    };

    return (
        <>
            {typeof component !== "undefined" ? (
                component
            ) : (
                <LinkContainer
                    to={route ? route : ""}
                    onClick={handleLinkClick}
                >
                    <SideBarMenuItemContent padding={{ all: `${spaces.m} 0` }}>
                        <Tooltip title={name} arrow placement="right">
                            <IconButton size="large">
                                {<Icon sx={{ color }} />}
                            </IconButton>
                        </Tooltip>
                    </SideBarMenuItemContent>
                </LinkContainer>
            )}
        </>
    );
}

export default SideBarMenuItem;
