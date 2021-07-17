import { Tile } from "./components/Tile.js";
export const TILE_STATUSES = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked"
};
export function createBoard(size, mines) {
    if (mines >= size * size)
        throw new Error("Too many mines.");
    const minePositions = getMinePositions(size, mines);
    const tileCollection = [];
    const markedMines = 0;
    const markedSafeTiles = 0;
    for (let rowCoord = 0; rowCoord < size; rowCoord++) {
        const row = [];
        for (let tileCoord = 0; tileCoord < size; tileCoord++) {
            const tile = new Tile(tileCoord, rowCoord);
            if (minePositions.some(p => positionMatch(p, tile))) {
                tile.status = TILE_STATUSES.MINE;
            }
            row.push(tile);
        }
        tileCollection.push(row);
    }
    return {
        size,
        mines,
        markedMines,
        markedSafeTiles,
        tileCollection
    };
}
function getMinePositions(size, mines) {
    const positions = [];
    const randomNumber = () => {
        return Math.floor(Math.random() * size);
    };
    while (positions.length < mines) {
        const position = {
            x: randomNumber(),
            y: randomNumber()
        };
        if (!positions.some(p => positionMatch(p, position))) {
            positions.push(position);
        }
    }
    return positions;
}
function positionMatch(a, b) {
    return a.x === b.x && a.y === b.y;
}
