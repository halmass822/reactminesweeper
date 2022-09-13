import React, { useState, useEffect } from "react";
import { generateGrid, getNearbyCoords } from "../utils/minesweeperLogic";
import click from "./logoFaces/click.png";
import face from "./logoFaces/face.png";
import gameover from "./logoFaces/gameover.png";
import victory from "./logoFaces/victory.png";
import Tile from "./Tile";
import "./Minesweeper.css"
import { render } from "@testing-library/react";

export default function Minesweeper() {

    //gridDimensions has the X and Y dimensions and the number of bombs on the grid
    const [gridDimensions, setGridDimensions] = useState([10,10,10]);
    const [gameRunning, setGameRunning] = useState(true);
    const [logoState, setLogoState] = useState(face);
    const [tileContents, setTileContents] = useState(
        generateGrid(gridDimensions[0], gridDimensions[1], gridDimensions[2])
        );

    const checkIfClicked = (coordinate) => {
        if (!gameRunning) return;
        const targetIndex = tileContents.findIndex((tile) => tile.coordinates[0] === coordinate[0] && tile.coordinates[1] === coordinate[1]);
        return tileContents[targetIndex].clicked
    }

    const clickTile = (coordinate) => {
        if (!gameRunning) return;
        const targetIndex = tileContents.findIndex((tile) => tile.coordinates[0] === coordinate[0] && tile.coordinates[1] === coordinate[1]);      
        let newContents = [...tileContents]
        newContents[targetIndex].clicked = true;
        setTileContents(() => {
            return newContents
        });
        if(tileContents[targetIndex].contents === "B") gameOver();
        if(tileContents[targetIndex].contents === 0) {
            const surroundingTiles = getNearbyCoords(coordinate, gridDimensions[0], gridDimensions[1]);
            surroundingTiles.forEach((coordinates) => {
                !checkIfClicked(coordinates) && clickTile(coordinates);
            })
        }
    }

    const logoClick = () => {
        !gameRunning && restartGame();
    }

    const gameOver = () => {
        setGameRunning(false);
        setLogoState(gameover);
    }

    const restartGame = () => {
        setTileContents(generateGrid(gridDimensions[0], gridDimensions[1], 10));
        setLogoState(face);
        setGameRunning(true);
    }

    const victory = () => {
        setGameRunning(false);
        setLogoState(victory);
    }

    const handleMouseDown = () => {
        gameRunning && setLogoState(click);
    }

    const handleMouseUp = () => {
        gameRunning && setLogoState(face);
    }

    useEffect( () => {
            const safeTiles = tileContents.filter((tile) => {
                return tile.contents !== "B"
            });
            if (safeTiles.every((tile) => tile.clicked)) {
                victory();
            }
        },[tileContents]
    )

    return (
        <div className="minesweeperGame">
            <img className="minesweeperLogo" 
                src={logoState}
                onClick={logoClick}
                ></img>
            <div className="minesweeperGameGrid"
                style={{width: (`calc( calc( 2rem + 2px ) * ${gridDimensions[0]} )`)}}
                onMouseDown={handleMouseDown} 
                onMouseUp={handleMouseUp}
                onMouseOut={handleMouseUp}
                >
                    {tileContents.map((tile) => {
                        return <Tile 
                            key={tile.coordinates}
                            coordinates={tile.coordinates}
                            handleClick={clickTile} 
                            clicked={tile.clicked} 
                            gameRunning={gameRunning} 
                            contents={tile.contents}
                        />
                    })}
            </div>
        </div>
    );
}