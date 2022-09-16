import React from "react";
import {getAssociatedColor} from "../utils/minesweeperLogic"
import flag from "./images/flag.png";
import mine from "./images/mine.png";

export default function Tile(props) {

    const mineImg = <img src={mine} alt="mine" style={{width: "80%"}}></img>
    const flagImg = <img src={flag} style={{width: "55%"}} alt="minesweeper flag"></img>

    const handleLeftClick = () => {
        props.handleClick(props.coordinates, "left");
    }

    const handleRightClick = (e) => {
        e.preventDefault();
        props.handleClick(props.coordinates, "right");
    }

    const displayLogic = () => {
        if(!props.gameRunning){
            if(props.clickState === "right") return flagImg;
            return props.contents === "B" ? mineImg : props.contents;
        } 
        switch (props.clickState) {
            case "none":
                return "";
            case "left":
                return props.contents === "B" ? mineImg : props.contents;
            case "right":
                return flagImg;
            default:
                break;
        }
    }

    return (
        <p className="tile noselect" style={{color: getAssociatedColor(props.contents)}} onClick={handleLeftClick} onContextMenu={handleRightClick}>{displayLogic()}</p>
    )
}