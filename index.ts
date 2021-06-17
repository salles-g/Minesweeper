import { displayBoard } from "./src/view.js";
import { createBoard } from "./src/model.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 15;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);

displayBoard(board);