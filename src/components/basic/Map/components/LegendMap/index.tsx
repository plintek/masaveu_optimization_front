import PaintUtility from "@utils/Paint.utility";

export interface LegendProps {
    tipePollution: string;
}

function Legend({ tipePollution }: LegendProps) {
    return (
        <div
            style={{
                display: "flex",
            }}
        >
            <div
                style={{
                    width: "20px",
                    height: "20px",
                    background: `rgb(${PaintUtility.getColorPollution(tipePollution, 0)})`,
                }}
            ></div>
            <div
                style={{
                    width: "20px",
                    height: "20px",
                    background: `rgb(${PaintUtility.getColorPollution(tipePollution, 4)})`,
                }}
            ></div>
            <div
                style={{
                    width: "20px",
                    height: "20px",
                    background: `rgb(${PaintUtility.getColorPollution(tipePollution, 5)})`,
                }}
            ></div>
            <div
                style={{
                    width: "20px",
                    height: "20px",
                    background: `rgb(${PaintUtility.getColorPollution(tipePollution, 6)})`,
                }}
            ></div>
            <div
                style={{
                    width: "20px",
                    height: "20px",
                    background: `rgb(${PaintUtility.getColorPollution(tipePollution, 7)})`,
                }}
            ></div>
            <div
                style={{
                    width: "20px",
                    height: "20px",
                    background: `rgb(${PaintUtility.getColorPollution(tipePollution, 8)})`,
                }}
            ></div>
            <div
                style={{
                    width: "20px",
                    height: "20px",
                    background: `rgb(${PaintUtility.getColorPollution(tipePollution, 9)})`,
                }}
            ></div>
        </div>
    );
}

export default Legend;
