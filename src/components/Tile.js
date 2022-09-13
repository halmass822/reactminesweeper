import React from "react";
import {getAssociatedColor} from "../utils/minesweeperLogic"

export default function Tile(props) {

    const handleClick = () => {
        props.handleClick(props.coordinates);
    }

    return (
        <p className="tile" style={{color: getAssociatedColor(props.contents)}} onClick={handleClick}>{(props.clicked || !props.gameRunning) && props.contents}</p>
    )
}   