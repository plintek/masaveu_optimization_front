import React from "react";

interface TableIconProps {
    color?: string;
}

function TableIcon({ color = "black" }: TableIconProps) {
    return (
        <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0 3C0 1.34297 1.34297 0 3 0H21C22.6547 0 24 1.34297 24 3V18C24 19.6547 22.6547 21 21 21H3C1.34297 21 0 19.6547 0 18V3ZM0.75 3V6H23.25V3C23.25 1.75734 22.2422 0.75 21 0.75H3C1.75734 0.75 0.75 1.75734 0.75 3ZM11.625 6.75H0.75V12.75H11.625V6.75ZM12.375 6.75V12.75H23.25V6.75H12.375ZM11.625 13.5H0.75V18C0.75 19.2422 1.75734 20.25 3 20.25H11.625V13.5ZM21 20.25C22.2422 20.25 23.25 19.2422 23.25 18V13.5H12.375V20.25H21Z"
                fill={color}
            />
        </svg>
    );
}

export default TableIcon;
