import { checkWin, checkLose, TILE_STATUSES } from "./model";
import { Tile } from "./components/Tile";
import { addListeners } from "./controller";

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

export function markTile(element: HTMLElement): void {
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

export function checkEnd(board: Array<Array<Tile>>, tile: Tile): void {
  const boardElement = document.getElementById("board");
  const subtext = document.getElementById("subtext") ?? document.createElement("div");
  const lose = checkLose(tile);
  const win = checkWin(board);

  if (win || lose) {
    boardElement?.addEventListener("click", stopProp, {capture: true});
    boardElement?.addEventListener("contextmenu", stopProp, {capture: true});
  }

  if (win) {
    subtext.textContent = "You win!";
  }

  if (lose) {
    subtext.textContent = "You lose...";
  }
}

// Makes it so that no more listeners are called
function stopProp(e: Event): void {
  e.stopImmediatePropagation();
}