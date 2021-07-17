import { displayBoard, setCounter } from "./src/view.js";
import { createBoard } from "./src/model.js";
const BOARD_SIZE = 16;
const NUMBER_OF_MINES = 40;
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
displayBoard(board);
setCounter(NUMBER_OF_MINES);
