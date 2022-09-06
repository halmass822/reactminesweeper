function checkCoordinates(input, maxWidth, maxHeight) {
    let [XCoordinate, YCoordinate] = [input[0], input[1]];
    return!(XCoordinate < 1 || XCoordinate > maxWidth || YCoordinate < 1 || YCoordinate > maxHeight)
}

export function getNearbyCoords(input, maxWidth, maxHeight) {
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

export function generateTiles(width,height) {
    let outputArray = [];
    let output2dArray = [];
    for(let i = 1; i < (height + 1); i++) {
        let row = [];
        for(let j = 1; j < (width + 1); j++){
            const coords = [j,i];
            const surroundingTiles = getNearbyCoords(coords, width, height);
            row.push({coordinates: coords, surroundingTileCoords: surroundingTiles});
            outputArray.push({coordinates: coords, surroundingTileCoords: surroundingTiles});
        }
        output2dArray.push(row);
    }
    return [outputArray, output2dArray];
}