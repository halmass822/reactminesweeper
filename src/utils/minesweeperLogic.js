function checkCoordinates(input, maxWidth, maxHeight) {
    let [XCoordinate, YCoordinate] = [input[0], input[1]];
    return!(XCoordinate < 1 || XCoordinate > maxWidth || YCoordinate < 1 || YCoordinate > maxHeight)
}

function getNearbyCoords(input, maxWidth, maxHeight) {
    try {
        const [XCoord, YCoord] = [input[0], input[1]]
        const surroundingTilesArray = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]];
        let outputArray = [];
        surroundingTilesArray.forEach((x) => {
            let coordToCheck = [XCoord + x[0], YCoord + x[1]];
            //checks the resulting coordinate to see if it's within the boundaries, i.e the top left corner will not have a coordinate to its left or top
            if(checkCoordinates(coordToCheck)){
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
        const xCoord = Math.ceil(Math.random() * (maxWidth));
        const yCoord = Math.ceil(Math.random() * (maxHeight));
        outputArray.push([xCoord,yCoord]);
    }
    return outputArray;
}

//returns a 1d and 2d array of every tile object. 2d array will be used to generate the JSX elements for the grid
export function generateGrid(width, height, numberOfBombs) {
    try {
        let outputArray = [];
        let output2dArray = [];
        for(let i = 1; i < (height + 1); i++) {
            let row = [];
            for(let j = 1; j < (width + 1); j++){
                const coords = [j,i];
                const surroundingTiles = getNearbyCoords(coords, width, height);
                const outputTileObject = {
                    coordinates: coords, 
                    surroundingTileCoords: surroundingTiles,
                    clicked: false
                };
                row.push(coords);
                outputArray.push(outputTileObject);
            }
            output2dArray.push(row);
        }
        const bombLocations = getRandomCoords(width, height, numberOfBombs);
        console.log(bombLocations);
        bombLocations.forEach((bombLoc) => {
            const tileIndex = outputArray.findIndex((x) => x.coordinates[0] === bombLoc[0] && x.coordinates[1] === bombLoc[1]);
            console.log(tileIndex);
            Object.assign(outputArray[tileIndex], {contents: "B"});
        })
        return [outputArray, output2dArray];
    } catch (error) {
        console.error(`generateTiles(${width}, ${height}, ${numberOfBombs}) error\n\n${error}`);
    }
    
}