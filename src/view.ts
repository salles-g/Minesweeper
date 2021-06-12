import { TILE_STATUSES } from "./model";
import { Tile } from "./components/Tile";
import { revealTile } from "./controller";

export function displayBoard(board: Array<Array<Tile>>): void {
  const boardDiv = document.getElementById("board");

  // for each row of the board
  board.forEach(row => {
    // for each tile of the row
    row.forEach(tile => {
      const element = tile.element;

      // add both left-click and right-click event listeners
      addListeners(board, element, tile);
      
      boardDiv?.appendChild(element);
    });
  });
}

function addListeners(board: Array<Array<Tile>>, element: HTMLElement, tile: Tile): void {
  element.addEventListener("click", () => {
    revealTile(board, tile);
  });
  element.addEventListener("contextmenu", e => {
    e.preventDefault();
    markTile(element);
  });
}

function markTile(element: HTMLElement) {
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
  } else {
    element.dataset.status = TILE_STATUSES.MARKED;
  }
}