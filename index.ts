import { displayBoard } from "./src/view";
import { createBoard } from "./src/model";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 15;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
displayBoard(board);