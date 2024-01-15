import React from "react";

interface ClockIconProps {
    color?: string;
}

function ClockIcon({ color = "black" }: ClockIconProps) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 6C12.2063 6 12.375 6.16875 12.375 6.375V11.8453L16.3922 15.8578C16.5375 16.0078 16.5375 16.2422 16.3922 16.3922C16.2422 16.5375 16.0078 16.5375 15.8578 16.3922L11.7328 12.2672C11.6625 12.1969 11.625 12.0984 11.625 12V6.375C11.625 6.16875 11.7937 6 12 6Z"
                fill={color}
            />
            <circle cx="12.5" cy="11.5" r="11" stroke={color} />
        </svg>
    );
}

export default ClockIcon;
