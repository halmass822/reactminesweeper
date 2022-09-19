function checkCoordinates(input, maxWidth, maxHeight) {
    let [XCoordinate, YCoordinate] = [input[0], input[1]];
    return!(XCoordinate < 1 || XCoordinate > maxWidth || YCoordinate < 1 || YCoordinate > maxHeight)
}

export function digitize(input) {
    const prefix = Number(input) < 0 ? "-" : "";
    if (Math.abs(Number(input)) < 10) {
        return `${prefix}0${Math.abs(input)}`
    } else {
        return `${prefix}${Math.abs(input)}`
    }
}

export function getNearbyCoords(input, maxWidth, maxHeight) {
    try {
        const [XCoord, YCoord] = [input[0], input[1]]
        const surroundingTilesArray = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]];
        let outputArray = [];
        surroundingTilesArray.forEach((x) => {
            let coordToCheck = [XCoord + x[0], YCoord + x[1]];
            //checks the resulting coordinate to see if it's within the boundaries, i.e the top left corner will not have a coordinate to its left or top
            if(checkCoordinates(coordToCheck, maxWidth, maxHeight)){
                outputArray.push(coordToCheck);
            }
        })
        return outputArray;
    } catch (error) {
        console.error(`getNearbyCoords(${input}, ${maxWidth}, ${maxHeight}) error\n\n${error}`);
    }
}

function getRandomCoords(maxWidth, maxHeight, numOfCoords) {
    let outputArray = []
    for (let i = 0; i < numOfCoords; i++) {
        const xCoord = Math.ceil(Math.random() * (maxWidth -0.001));
        const yCoord = Math.ceil(Math.random() * (maxHeight - 0.001));
        if(!outputArray.find((x) => x[0] === xCoord && x[1] && x[1] === yCoord)){
            outputArray.push([xCoord,yCoord]);
        } else {
            i--
        }
    }
    return outputArray;
}

//returns a 1d and 2d array of every tile object. 2d array will be used to generate the JSX elements for the grid
export function generateGrid(width, height, numberOfBombs) {
        let outputArray = [];
        for(let i = 1; i < (height + 1); i++) {
            for(let j = 1; j < (width + 1); j++){
                const coords = [j,i];
                const surroundingTiles = getNearbyCoords(coords, width, height);
                const outputTileObject = {
                    coordinates: coords, 
                    surroundingTileCoords: surroundingTiles,
                    clickState: "none"
                };
                outputArray.push(outputTileObject);
            }
        }
        const bombLocations = getRandomCoords(width, height, numberOfBombs);
        bombLocations.forEach((bombLoc) => {
            const tileIndex = outputArray.findIndex((x) => x.coordinates[0] === bombLoc[0] && x.coordinates[1] === bombLoc[1]);
            Object.assign(outputArray[tileIndex], {contents: "B"});
        })
        outputArray.forEach((tile) => {
            if (tile.hasOwnProperty("contents")) return;
            let mineCounter = 0;
            tile.surroundingTileCoords.forEach((nearbyCoordinate) => {
                const nearbyTile = outputArray.find((tile) => tile.coordinates[0] === nearbyCoordinate[0] && tile.coordinates[1] === nearbyCoordinate[1]);
                nearbyTile.contents === "B" && mineCounter++;
            })
            Object.assign(tile, {contents: mineCounter});   
        })
        return outputArray;
}

export function getAssociatedColor(input) {
    switch(input.toString()) {
        case "1":
            return "blue";
        case "2":
            return "green";
        case "3":
            return "orange";
        case "4":
            return "dark-blue";
        case "5":
            return "dark-red";
        case "6":
            return "pink";
        case "7":
            return "yellow";
        case "8":
            return "purple";
        case "B":
            return "red";
        case "0":
            return "grey";
        default:
            break;
    }
}