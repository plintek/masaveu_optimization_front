import React, { ReactElement, useEffect, useState } from "react";

import MainContainer from "@components/MainContainer";
import { useTranslation } from "react-i18next";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { spaces } from "@styles/spaces";
import Loader from "@components/Loader";
import { useAuthState } from "@context/Auth/Context";
import UserRolesUtility from "@utils/UserRoles.utility";
import { useNavigate } from "react-router-dom";
import { AnyType } from "@interfaces/basic/Any.interface";

export interface HomeTab {
    id: string;
    label: string;
    pageTitle: string;
    component: AnyType;
    show: boolean;
}


function Home(): ReactElement {
    return (
        <MainContainer>
           Test
        </MainContainer>
    );
}

export default Home;
