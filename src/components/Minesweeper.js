import React, {useState} from "react";
import {getNearbyCoords, generateTiles} from "../utils/minesweeperLogic";

export default function Minesweeper() {
    
    const [gridDimensions, setGridDimensions] = useState([10,10]);
    const [tileContents, setTileContents] = useState(
        generateTiles(gridDimensions[0], gridDimensions[1])
        );

    return;
}