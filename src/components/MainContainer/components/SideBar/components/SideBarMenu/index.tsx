import React from "react";
import Container from "@components/basic/Container";
import { useAuthState } from "@context/Auth/Context";
import { spaces } from "@styles/spaces";
import UserRolesUtility from "@utils/UserRoles.utility";
import { ReactElement } from "react";
import SideBarMenuSection, {
    SideBarMenuSectionProps,
} from "./components/SideBarMenuSection";
import { useTranslation } from "react-i18next";

import AlertIcon from "@icons/AlertIcon";

import ThemeIcon from "@components/basic/icons/ThemeIcon";
import SettingsIcon from "@icons/SettingsIcon";
import DatabaseIcon from "@icons/DatabaseIcon";

function SideBarMenu(): ReactElement {
    const { t } = useTranslation();
    const user = useAuthState().user;
    const sideBarSections: SideBarMenuSectionProps[] = [
        {
            roles: ["admin"],
            name: t("DashboardPage.SideBar.SideBarMenu.theme") || "",
            position: "bottom",
            items: [
                {
                    name: t("DashboardPage.SideBar.SideBarMenu.settings"),
                    Icon: SettingsIcon,
                    route: "/settings",
                },
            ],
        },
    ];

    return (
        <Container
            width="100%"
            as="nav"
            flex={{ direction: "column", alignItems: "center" }}
            margin={{ top: spaces.shalf }}
            height="100%"
        >
            {sideBarSections.map(
                (sideBarSection: SideBarMenuSectionProps, index: number) =>
                    user &&
                    user.role &&
                    UserRolesUtility.hasPermission(
                        user.role,
                        sideBarSection.roles
                    ) && (
                        <SideBarMenuSection
                            key={`sideBarMenu-${index}`}
                            roles={sideBarSection.roles}
                            name={sideBarSection.name}
                            items={sideBarSection.items}
                            position={sideBarSection.position}
                            hasBorder={index !== sideBarSections.length - 1}
                        />
                    )
            )}
        </Container>
    );
}

export default SideBarMenu;
