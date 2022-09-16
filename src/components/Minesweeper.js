import React, { useState, useEffect } from "react";
import { generateGrid, getNearbyCoords, digitize } from "../utils/minesweeperLogic";
import click from "./images/click.png";
import face from "./images/face.png";
import gameover from "./images/gameover.png";
import victory from "./images/victory.png";
import Tile from "./Tile";
import "./Minesweeper.css"

export default function Minesweeper() {

    //gridDimensions has the X and Y dimensions and the number of bombs on the grid
    const [gridDimensions, setGridDimensions] = useState([10,10,15]);
    const [numberOfFlags, setNumberOfFlags] = useState(0);
    const [gameRunning, setGameRunning] = useState(true);
    const [logoState, setLogoState] = useState(face);
    const [tileContents, setTileContents] = useState(
        generateGrid(gridDimensions[0], gridDimensions[1], gridDimensions[2])
        );

    const getClickState = (coordinate) => {
        if (!gameRunning) return;
        const targetIndex = tileContents.findIndex((tile) => tile.coordinates[0] === coordinate[0] && tile.coordinates[1] === coordinate[1]);
        return tileContents[targetIndex].clickState
    }

    const clickTile = (coordinate, type = "left") => {
        if (!gameRunning) return;
        const targetIndex = tileContents.findIndex((tile) => tile.coordinates[0] === coordinate[0] && tile.coordinates[1] === coordinate[1]);      
        let newContents = [...tileContents]
        newContents[targetIndex].clickState = type;
        setTileContents(() => {
            return newContents
        });
        if(tileContents[targetIndex].contents === "B") gameOver();
        if(tileContents[targetIndex].contents === 0) {
            const surroundingTiles = getNearbyCoords(coordinate, gridDimensions[0], gridDimensions[1]);
            surroundingTiles.forEach((coordinates) => {
                getClickState(coordinates) === "none" && clickTile(coordinates, "left");
            })
        }
    }

    const handleChangeDifficulty = ({target}) => {
        switch (target.value) {
            case "easy":
                setGridDimensions([10,10,15]);
                break;
            case "medium":
                setGridDimensions([15,15,40]);
                break;
            case "hard":
                setGridDimensions([20,20,75]);
                break;        
            default:
                break;
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
        console.log(`gridDimensions: ${gridDimensions}`)
        const newGrid = generateGrid(gridDimensions[0], gridDimensions[1], gridDimensions[2]);
        setTileContents(newGrid);
        setNumberOfFlags(0);
        setLogoState(face);
        setGameRunning(true);
    }

    useEffect(restartGame,[gridDimensions]);

    useEffect( () => {
            if(!gameRunning) return;
            const safeTiles = tileContents.filter((tile) => {
                return tile.contents !== "B"
            });
            if (safeTiles.every((tile) => tile.clickState === "left")) {
                winner();
            }
        },[tileContents]
    )

    const winner = () => {
        setGameRunning(false);
        setLogoState(victory);
    }

    const handleMouseDown = () => {
        gameRunning && setLogoState(click);
    }

    const handleMouseUp = () => {
        gameRunning && setLogoState(face);
    }



    return (
        <div className="minesweeperGame">
            <div className="gameBoard">
                <div><p className="remainingBombs">{digitize(numberOfFlags)}</p></div>
                <div><img className="minesweeperLogo" 
                    src={logoState}
                    onClick={logoClick}
                    ></img></div>
                <div><select className="difficultySelector" onChange={handleChangeDifficulty}>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                    </select></div>
                
            
            </div>
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
                            clickState={tile.clickState} 
                            gameRunning={gameRunning} 
                            contents={tile.contents}
                        />
                    })}
            </div>
        </div>
    );
}