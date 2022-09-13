import { render } from "@testing-library/react";
import React from "react";

export default function Tile(props) {

    const handleClick = () => {
        props.handleClick(props.coordinates);
    }

    return (
        <p className="tile" onClick={handleClick}>{(props.clicked || !props.gameRunning) && props.contents}</p>
    )
}   