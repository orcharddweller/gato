import { BoardState, GameState, Side } from "./types";

export const whoseTurn = (state: BoardState): Side => {
  const xCount = state.filter((field) => field === "X").length;
  const oCount = state.filter((field) => field === "O").length;
  return xCount === oCount ? "X" : "O";
};

export const getState = (board: BoardState): GameState => {
  const row1 = board.slice(0, 3);
  const row2 = board.slice(3, 6);
  const row3 = board.slice(6, 9);

  const col1 = [board[0], board[3], board[6]];
  const col2 = [board[1], board[4], board[7]];
  const col3 = [board[2], board[5], board[8]];

  const diag1 = [board[0], board[4], board[8]];
  const diag2 = [board[2], board[4], board[6]];

  const lines = [row1, row2, row3, col1, col2, col3, diag1, diag2];

  const xWon = lines.some((line) => line.every((field) => field === "X"));
  const oWon = lines.some((line) => line.every((field) => field === "O"));

  if (xWon && oWon) {
    throw new Error("Both players won");
  }

  if (xWon) {
    return "X_WON";
  }

  if (oWon) {
    return "O_WON";
  }

  if (board.every((field) => field !== null)) {
    return "DRAW";
  }

  return "IN_PROGRESS";
};
