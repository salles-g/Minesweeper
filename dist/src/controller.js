import { TILE_STATUSES } from "./model.js";
import { markTile } from "./view.js";
function revealTile(board, tile) {
    const element = tile.element;
    if (element.dataset.status === TILE_STATUSES.MARKED)
        return;
    if (element.dataset.status !== TILE_STATUSES.HIDDEN)
        return;
    if (tile.status === TILE_STATUSES.MINE) {
        element.dataset.status = TILE_STATUSES.MINE;
        return loseGame();
    }
    element.dataset.status = TILE_STATUSES.NUMBER;
    board.markedSafeTiles += 1;
    const adjacentTiles = nearbyTiles(board, tile);
    const nearbyMines = adjacentTiles.filter(tile => tile.status === TILE_STATUSES.MINE);
    if (nearbyMines.length !== 0) {
        element.textContent = String(nearbyMines.length);
        element.dataset.nearby = String(nearbyMines.length);
    }
    else {
        adjacentTiles.forEach(tile => revealTile(board, tile));
    }
    checkWin(board);
}
function nearbyTiles(board, tile) {
    const { tileCollection } = board;
    const tiles = [];
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
        for (let xOffset = -1; xOffset <= 1; xOffset++) {
            const nearbyTile = tileCollection[tile.y + yOffset]?.[tile.x + xOffset];
            if (nearbyTile)
                tiles.push(nearbyTile);
        }
    }
    return tiles;
}
export function addListeners(board, tile) {
    const element = tile.element;
    element.addEventListener("click", () => {
        revealTile(board, tile);
    });
    element.addEventListener("contextmenu", e => {
        e.preventDefault();
        markTile(board, tile);
    });
}
const endGame = () => {
    const boardElement = document.getElementById("board");
    const stopProp = (e) => {
        e.stopImmediatePropagation();
    };
    boardElement?.addEventListener("click", stopProp, { capture: true });
    boardElement?.addEventListener("contextmenu", stopProp, { capture: true });
    boardElement?.style.setProperty("--tile-cursor", "default");
};
const winGame = () => {
    endGame();
    const counter = document.getElementById("counter") ?? document.createElement("div");
    counter.textContent = "You win!";
};
const loseGame = () => {
    endGame();
    const counter = document.getElementById("counter") ?? document.createElement("div");
    counter.textContent = "You lose...";
};
function checkWin(board) {
    const numberOfSafeTiles = Math.pow(board.size, 2) - board.mines;
    const won = board.markedSafeTiles === numberOfSafeTiles;
    if (won) {
        return winGame();
    }
}
