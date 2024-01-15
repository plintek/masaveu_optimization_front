import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

function AlertIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <path d="M11.125 0.375C11.125 0.167906 11.2937 0 11.5 0C11.7063 0 11.875 0.167906 11.875 0.375V1.5L11.8328 1.50938C15.8406 1.70438 19 4.98281 19 9V10.7156C19 12.675 19.6656 14.5359 20.8891 16.1063L21.6766 17.0859C21.8875 17.3484 22 17.6766 22 18.0141C22 18.8344 21.3344 19.5 20.5141 19.5H2.48547C1.66516 19.5 1 18.8344 1 18.0141C1 17.6766 1.1148 17.3484 1.3255 17.0859L2.11 16.1063C3.33344 14.5359 4 12.675 4 10.7156V9C4 4.98281 7.15938 1.70438 11.125 1.50938V1.5V0.375ZM11.5 2.25C7.77344 2.25 4.75 5.27344 4.75 9V10.7156C4.75 12.8484 4.02531 14.9109 2.69547 16.575L1.91125 17.5547C1.80672 17.6859 1.75 17.8453 1.75 18.0141C1.75 18.3797 2.07906 18.75 2.48547 18.75H20.5141C20.8797 18.75 21.25 18.3797 21.25 18.0141C21.25 17.8453 21.1938 17.6859 21.0906 17.5547L20.3031 16.575C18.9766 14.9109 18.25 12.8484 18.25 10.7156V9C18.25 5.27344 15.2266 2.25 11.5 2.25ZM9.91094 22.5891C10.3328 23.0109 10.9047 23.25 11.5 23.25C12.0953 23.25 12.6672 23.0109 13.0891 22.5891C13.5109 22.1672 13.75 21.5953 13.75 21C13.75 20.7938 13.9187 20.625 14.125 20.625C14.3313 20.625 14.5 20.7938 14.5 21C14.5 21.7547 14.1859 22.5609 13.6234 23.1234C13.0609 23.6859 12.2547 24 11.5 24C10.7031 24 9.93906 23.6859 9.37656 23.1234C8.81406 22.5609 8.5 21.7547 8.5 21C8.5 20.7938 8.66875 20.625 8.875 20.625C9.08125 20.625 9.25 20.7938 9.25 21C9.25 21.5953 9.48906 22.1672 9.91094 22.5891Z" />{" "}
        </SvgIcon>
    );
}

export default AlertIcon;
