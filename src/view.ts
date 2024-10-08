import { TILE_STATUSES, Board } from "./model.js";
import { Tile } from "./components/Tile.js";
import { addListeners } from "./controller.js";

/**
 * Displays the board on the webpage
 * 
 * @param { Board } board - A board object
 * @returns { void }
 */
export function displayBoard(board: Board): void {
  const boardDiv = document.getElementById("board");
  const tileCollection = board.tileCollection;

  // for each row of the board
  tileCollection.forEach(row => {
    // for each tile of the row
    row.forEach(tile => {

      // add both left-click and right-click event listeners
      addListeners(board, tile);
      
      boardDiv?.appendChild(tile.element);
    });
  });

  // Set the CSS "--size" variable as the number of rows
  boardDiv?.style.setProperty("--size", String(tileCollection.length));

  // make the "--tile-cursor" a pointer
  boardDiv?.style.setProperty("--tile-cursor", "pointer");
}


/**
 * Marks a tile with a flag
 * 
 * @param { Board } board - A board object
 * @param { Tile } tile - An object of the Tile class
 * @returns { void }
 */
export function markTile(board: Board, tile: Tile): void {
  const element = tile.element;
  const status = element.dataset.status;
  // if the tile is neither hidden nor marked, i.e., if it's been revealed, return
  if (
    status !== TILE_STATUSES.HIDDEN &&
    status !== TILE_STATUSES.MARKED
  ) {
    return;
  }

  if (status === TILE_STATUSES.MARKED) {
    element.dataset.status = TILE_STATUSES.HIDDEN;

    if (tile.status === TILE_STATUSES.MINE) board.markedMines--;

    increaseCounter();
  } else {
    element.dataset.status = TILE_STATUSES.MARKED;

    if (tile.status === TILE_STATUSES.MINE) board.markedMines++; 

    decreaseCounter();
  }
}


/**
 * Sets the counter to the number of remaining mines
 * 
 * @param { number } mines - The amount of mines remaining
 * @returns { void }
 */
export function setCounter(mines: number): void {
  const counter = document.querySelector("#counter > span");
  if (counter) {
    counter.textContent = String(mines);
  }
}

function increaseCounter(): void {
  const counter = document.querySelector("#counter > span");
  if (counter && counter.textContent) {
    counter.textContent = String(parseInt(counter.textContent) + 1);
  }
}

function decreaseCounter(): void {
  const counter = document.querySelector("#counter > span");
  if (counter && counter.textContent) {
    counter.textContent = String(parseInt(counter.textContent) - 1);
  }
}