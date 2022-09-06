import React, {useState, useEffect} from "react";
import {generateGrid} from "../utils/minesweeperLogic";

export default function Minesweeper() {

    const [gridDimensions, setGridDimensions] = useState([10,10]);
    const [tileContents, setTileContents] = useState(
        generateGrid(gridDimensions[0], gridDimensions[1], 10)
        );
    
    return;
}