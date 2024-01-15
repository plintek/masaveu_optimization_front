import Container from "@components/basic/Container";
import { spaces } from "@styles/spaces";
import React, { ReactElement, useState } from "react";
import ProfileOptions from "./components/ProfileOptions";
import ProfileIcon from "./components/ProfileIcon";

function Profile(): ReactElement {
    const [profileMenuOpened, setProfileMenuOpened] = useState(false);

    return (
        <Container
            position="relative"
            flex={{ columnGap: spaces.m, alignItems: "center" }}
            onMouseEnter={() => setProfileMenuOpened(true)}
            onMouseLeave={() => setProfileMenuOpened(false)}
        >
            <Container
                position="absolute"
                positionProperties={{ left: "-22px" }}
                width="400px"
                overflow={{ all: "hidden" }}
            >
                <ProfileOptions visible={profileMenuOpened} />
                <ProfileIcon />
            </Container>
        </Container>
    );
}

export default Profile;
