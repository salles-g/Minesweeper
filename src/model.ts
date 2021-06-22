import { Tile } from "./components/Tile.js";

export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked"
};

export type Board = {
  size: number,
  mines: number,
  markedMines: number,
  markedSafeTiles: number,
  tileCollection: Array<Array<Tile>>
};

export function createBoard(size: number, mines: number): Board {
  if (mines >= size*size) throw new Error("Too many mines.");

  const minePositions = getMinePositions(size, mines);
  const tileCollection: Array<Array<Tile>> = [];
  const markedMines = 0;
  const markedSafeTiles = 0;

  for (let rowCoord = 0; rowCoord < size; rowCoord++) {
    const row: Array<Tile> = [];
    for (let tileCoord = 0; tileCoord < size; tileCoord++) {
      const tile = new Tile(tileCoord, rowCoord);

      // if the tile's position is in the minePositions array
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

function getMinePositions(size: number, mines: number) {
  const positions: Array<unknown> = [];

  const randomNumber = () => {
    return Math.floor(Math.random() * size);
  };

  while (positions.length < mines) {
    const position = {
      x: randomNumber(),
      y: randomNumber()
    };
    // If the array of positions has nothing that matches the one just created
    if (!positions.some(p => positionMatch(p, position))) {
      positions.push(position);
    }
  }

  return positions;
}

function positionMatch(a: any, b: any): boolean {
  return a.x === b.x && a.y === b.y;
}

export function checkWin(board: Board): boolean {
  const numberOfSafeTiles = Math.pow(board.size, 2) - board.mines;
  return board.markedSafeTiles === numberOfSafeTiles;
}

export function checkLose(tile: Tile): boolean {
  return tile.status === TILE_STATUSES.MINE;
}