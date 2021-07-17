import { TILE_STATUSES } from "./model.js";
import { addListeners } from "./controller.js";
export function displayBoard(board) {
    const boardDiv = document.getElementById("board");
    const tileCollection = board.tileCollection;
    tileCollection.forEach(row => {
        row.forEach(tile => {
            addListeners(board, tile);
            boardDiv?.appendChild(tile.element);
        });
    });
    boardDiv?.style.setProperty("--size", String(tileCollection.length));
    boardDiv?.style.setProperty("--tile-cursor", "pointer");
}
export function markTile(board, tile) {
    const element = tile.element;
    const status = element.dataset.status;
    if (status !== TILE_STATUSES.HIDDEN &&
        status !== TILE_STATUSES.MARKED) {
        return;
    }
    if (status === TILE_STATUSES.MARKED) {
        element.dataset.status = TILE_STATUSES.HIDDEN;
        if (tile.status === TILE_STATUSES.MINE)
            board.markedMines--;
        increaseCounter();
    }
    else {
        element.dataset.status = TILE_STATUSES.MARKED;
        if (tile.status === TILE_STATUSES.MINE)
            board.markedMines++;
        decreaseCounter();
    }
}
export function setCounter(mines) {
    const counter = document.querySelector("#counter > span");
    if (counter) {
        counter.textContent = String(mines);
    }
}
function increaseCounter() {
    const counter = document.querySelector("#counter > span");
    if (counter && counter.textContent) {
        counter.textContent = String(parseInt(counter.textContent) + 1);
    }
}
function decreaseCounter() {
    const counter = document.querySelector("#counter > span");
    if (counter && counter.textContent) {
        counter.textContent = String(parseInt(counter.textContent) - 1);
    }
}
