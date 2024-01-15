import Container from "@components/basic/Container";
import { useAuthState } from "@context/Auth/Context";
import { useMapLayersState } from "@context/MapLayers/Context";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { useTheme } from "@mui/material";
import { spaces } from "@styles/spaces";
import UserRolesUtility from "@utils/UserRoles.utility";
import React from "react";
import { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import SideBarMenuItem, { SideBarMenuItemProps } from "../SideBarMenuItem";

export interface SideBarMenuSectionProps {
    roles: string[];
    name?: string;
    hasBorder?: boolean;
    items: SideBarMenuItemProps[];
    position?: "top" | "bottom";
}

function SideBarMenuSection({
    items,
    hasBorder,
    position,
}: SideBarMenuSectionProps): ReactElement {
    const actualRoute = useLocation().pathname;
    const { palette } = useTheme();

    const { layerProperties } = useMapLayersState();
    const user = useAuthState().user;
    return (
        <Container
            width="100%"
            flex={{ direction: "column", alignItems: "center" }}
            border={{
                bottom: hasBorder ? `1px solid ${palette.grey[300]}` : "",
                top:
                    position === "bottom"
                        ? `1px solid ${palette.grey[300]}`
                        : "",
            }}
            padding={{ all: `${spaces.m} 0` }}
            margin={{
                top: position === "bottom" ? "auto" : "",
            }}
        >
            {items.map((item: SideBarMenuItemProps, index: number) => {
                let isActive = false;
                if (typeof item.route !== "undefined") {
                    isActive = actualRoute === item.route;
                }

                if (typeof item.layerProperty !== "undefined") {
                    const layerProperty = layerProperties.filter(
                        (layerProperty) =>
                            layerProperty.name === item.layerProperty
                    )[0];

                    isActive = layerProperty.active;
                }
                if (!item.roles) {
                    item.roles = ["admin"];
                }
                return (
                    user &&
                    user.role &&
                    UserRolesUtility.hasPermission(user.role, item.roles) && (
                        <SideBarMenuItem
                            {...item}
                            isActive={isActive}
                            key={`sidebarMenuItem-${index}`}
                        />
                    )
                );
            })}
        </Container>
    );
}

export default SideBarMenuSection;
