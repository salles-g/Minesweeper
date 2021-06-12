import { Tile } from "./components/Tile";

export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked"
};

export function createBoard(size: number, mines: number): Array<Array<Tile>> {
  const minePositions = getMinePositions(size, mines);
  const board: Array<Array<Tile>> = [];

  // Create rows
  for (let y = 0; y < size; y++) {
    const row: Array<Tile> = [];
    // Create tiles
    for (let x = 0; x < size; x++) {
      const tile = new Tile(x, y);

      // if the tile's position is in the minePositions array
      if (minePositions.some(p => positionMatch(p, {x, y}))) {
        tile.status = TILE_STATUSES.MINE;
      }

      row.push(tile);
    }
    board.push(row);
  }

  return board;
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