import { Board, TILE_STATUSES } from "./model.js";
import { Tile } from "./components/Tile.js";
import { checkEnd, markTile } from "./view.js";

export function revealTile(board: Board, tile: Tile): void {
  const element = tile.element;

  // if tile is marked
  if (element.dataset.status === TILE_STATUSES.MARKED) return;

  // if tile is not hidden
  if (element.dataset.status !== TILE_STATUSES.HIDDEN) return;
  
  // if given tile is a mine
  if (tile.status === TILE_STATUSES.MINE) {
    element.dataset.status = TILE_STATUSES.MINE;
    return endGame();
  }

  element.dataset.status = TILE_STATUSES.NUMBER;
  board.markedSafeTiles += 1;

  const adjacentTiles = nearbyTiles(board, tile);
  const nearbyMines = adjacentTiles.filter(tile => tile.status === TILE_STATUSES.MINE);
  
  // set the number on the tile to the amount of mines nearby, if there are any
  if (nearbyMines.length !== 0) {
    element.textContent = String(nearbyMines.length);
    element.dataset.nearby = String(nearbyMines.length);
  }
  // if there are no mines, call this function again for each of the adjacent tiles
  else {
    adjacentTiles.forEach(tile => revealTile(board, tile));
  }

  checkEnd(board, tile);
}

// check tiles in a 3x3 area, with the given tile as the center
function nearbyTiles(board: Board, tile: Tile): Array<Tile> {
  const { tileCollection } = board;
  const tiles = [];

  for (let yOffset = -1; yOffset <= 1; yOffset++) {
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      // optional chaining for when there's no tile in the given position
      const nearbyTile = tileCollection[tile.y + yOffset]?.[tile.x + xOffset];
      if (nearbyTile) tiles.push(nearbyTile);
    }
  }

  return tiles;
}

// add event listeners to the given tile
export function addListeners(board: Board, tile: Tile): void {
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
  const counter = document.getElementById("counter") ?? document.createElement("div");

  const stopProp = (e: Event): void => {
    e.stopImmediatePropagation();
  }

  boardElement?.addEventListener("click", stopProp, {capture: true});
  boardElement?.addEventListener("contextmenu", stopProp, {capture: true});
  counter.textContent = "You lose...";
}