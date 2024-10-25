import { useState } from "react";

export type SwitchProps = {
    onChange: (state: "left" | "right") => void;
    leftLabel?: string;
    rightLabel?: string;
};

/**
 * @param {Function} props.onChange
 * @returns {JSX.Element}
 */
const Switch = (props: SwitchProps) => {
    const [switchState, setSwitchState] = useState<"left" | "right">("left");

    const handleClick = () => {
        const newState = switchState === "left" ? "right" : "left";
        setSwitchState(newState);
        props.onChange(newState);
    };

    return (<div style={styles.switchContainer}>
        {props.leftLabel && <p>{props.leftLabel}</p>}
        <div style={styles.switchBox} onClick={handleClick}>
            <div
                style={{
                    ...styles.switchButton,
                    ...(switchState === "left" ? styles.onLeft : styles.onRight)
                }}
            >
            </div>
        </div>
        {props.rightLabel &&<p>{props.rightLabel}</p>}
    </div>
    );
};

export default Switch;


const styles = {
    switchContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "5px"
    },
    switchBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "40px",
        height: "20px",
        backgroundColor: "#ddd",
        borderRadius: "10px",
        cursor: "pointer",
        position: "relative" as const,
    },
    switchButton: {
        width: "50%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4CAF50",
        color: "white",
        fontWeight: "bold",
        borderRadius: "10px",
        position: "absolute" as const,
        transition: "0.3s",
    },
    onLeft: {
        left: 0,
    },
    onRight: {
        right: 0,
    }
};

