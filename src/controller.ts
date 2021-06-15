import { TILE_STATUSES } from "./model.js";
import { Tile } from "./components/Tile.js";
import { checkEnd, markTile } from "./view.js";

export function revealTile(board: Array<Array<Tile>>, tile: Tile): void {
  const element = tile.element;

  // if tile is marked
  if (element.dataset.status === TILE_STATUSES.MARKED) return;

  // if tile is not hidden
  if (element.dataset.status !== TILE_STATUSES.HIDDEN) return;
  
  // if given tile is a mine
  if (tile.status === TILE_STATUSES.MINE) {
    element.dataset.status = TILE_STATUSES.MINE;
    return checkEnd(board, tile);
  }

  element.dataset.status = TILE_STATUSES.NUMBER;

  const adjacentTiles = nearbyTiles(board, tile);
  const nearbyMines = adjacentTiles.filter(tile => tile.status === TILE_STATUSES.MINE);
  
  // set the number on the tile to the amount of mines nearby, if there are any
  if (nearbyMines.length !== 0) {
    element.textContent = String(nearbyMines.length);
  }
  // if there aren't, call this function again for each of the adjacent tiles
  else {
    adjacentTiles.forEach(tile => revealTile(board, tile));
  }

  checkEnd(board, tile);
}

// check tiles in a 3x3 area, with the given tile as the center
function nearbyTiles(board: Array<Array<Tile>>, tile: Tile): Array<Tile> {
  const tiles = [];

  for (let yOffset = -1; yOffset <= 1; yOffset++) {
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      // optional chaining for when there's no tile in the given position
      const nearbyTile = board[tile.y + yOffset]?.[tile.x + xOffset];
      if (nearbyTile) tiles.push(nearbyTile);
    }
  }

  return tiles;
}

// add event listeners to the given tile
export function addListeners(board: Array<Array<Tile>>, element: HTMLElement, tile: Tile): void {
  element.addEventListener("click", () => {
    revealTile(board, tile);
  });
  element.addEventListener("contextmenu", e => {
    e.preventDefault();
    markTile(element);
  });
}