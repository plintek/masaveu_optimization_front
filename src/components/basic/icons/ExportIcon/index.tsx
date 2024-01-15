import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

function ExportIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <path d="M20.5594 7.05938L13.9359 0.435938C13.6594 0.158016 13.275 0 12.8766 0H6C4.34297 0 3 1.34297 3 3L3.0003 21C3.0003 22.6566 4.34327 24 6.0003 24H18C19.657 24 21 22.6566 21 21V8.12344C21 7.725 20.8406 7.34063 20.5594 7.05938ZM13.5 1.06078L19.9406 7.5H14.625C14.0063 7.5 13.5 6.99375 13.5 6.375V1.06078ZM20.25 21C20.25 22.2408 19.2408 23.25 18 23.25H6C4.75922 23.25 3.75 22.2408 3.75 21V3C3.75 1.75922 4.75922 0.75 6 0.75H12.75V6.375C12.75 7.40906 13.5909 8.25 14.625 8.25H20.25V21ZM12.3469 10.875C12.3469 10.6685 12.1792 10.5 11.9719 10.5C11.7646 10.5 11.5969 10.6685 11.5969 10.875V19.7203L7.22953 15.353C7.08305 15.2065 6.84572 15.2065 6.69937 15.353C6.55303 15.4995 6.55289 15.7368 6.69937 15.8831L11.7056 20.8894C11.8521 21.0359 12.0894 21.0359 12.2358 20.8894L17.2983 15.8269C17.3715 15.7537 17.4082 15.6584 17.4082 15.5618C17.4082 15.4651 17.3715 15.3698 17.2983 15.2966C17.1518 15.1501 16.9145 15.1501 16.7681 15.2966L12.3459 19.7188L12.3469 10.875Z" />
        </SvgIcon>
    );
}

export default ExportIcon;
