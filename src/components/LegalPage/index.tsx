import React, { ReactElement } from "react";

import styled from "styled-components";
import { spaces } from "@styles/spaces";
import Container from "@components/basic/Container";

const LegalPageLayout = styled(Container)``;

function LegalPage({ children }: { children: React.ReactNode }): ReactElement {
    return <LegalPageLayout margin={{ all: `${spaces.xxl} ${spaces.xl}` }}>{children}</LegalPageLayout>;
}

export default LegalPage;
