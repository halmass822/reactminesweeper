import React, {useState, useEffect} from "react";
import {generateGrid} from "../utils/minesweeperLogic";

export default function Minesweeper() {

    const [gridDimensions, setGridDimensions] = useState([10,10]);
    const [gameRunning, setGameRunning] = useState(true);
    const [tileContents, setTileContents] = useState(
        generateGrid(gridDimensions[0], gridDimensions[1], 10)
        );

    const clickTile = (coordinate) => {
        const targetIndex = tileContents[0].findIndex((tile) => tile.coordinates[0] === coordinate[0] && tile.coordinates[1] === coordinate[1]);
        setTileContents((prev) => {
            console.log(prev[0][targetIndex]);
            Object.assign(prev[0][targetIndex], {clicked: true});
            return prev;
        })
    }

    useEffect(() => {
        clickTile([5,5])
    }, [])

    return;
}