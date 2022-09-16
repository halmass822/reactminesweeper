import React from "react";
import {getAssociatedColor} from "../utils/minesweeperLogic"
import flag from "./images/flag.png";
import mine from "./images/mine.png";

export default function Tile(props) {

    const handleLeftClick = () => {
        props.handleClick(props.coordinates, "left");
    }

    const displayLogic = () => {
        if(!props.gameRunning) return props.contents === "B" ? <img src={mine} alt="mine" style={{width: "80%"}}></img> : props.contents;
        switch (props.clickState) {
            case "none":
                return "";
            case "left":
                return props.contents === "B" ? <img src={mine} alt="mine" style={{width: "80%"}}></img> : props.contents;
            case "right":
                return <img alt="minesweeper flag"></img>
            default:
                break;
        }
    }

    return (
        <p className="tile" style={{color: getAssociatedColor(props.contents)}} onClick={handleLeftClick}>{displayLogic()}</p>
    )
}