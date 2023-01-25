import {
  Game,
  GatoServer,
  GatoServerSocket,
  getState,
  User,
  UserId,
  UserName,
  whoseTurn,
} from "core";
import { randomUUID } from "crypto";
import { games, players, socketIds } from "./store";

export const newGame = (socket: GatoServerSocket, userName: UserName) => {
  const gameId = randomUUID();

  const player: User = {
    id: randomUUID(),
    name: userName,
    gameId,
    side: "X",
  };

  socketIds[socket.id] = player.id;

  const opponent: User = {
    id: randomUUID(),
    name: "Opponent",
    gameId,
    side: "O",
  };

  const game: Game = {
    id: gameId,
    board: [null, null, null, null, null, null, null, null, null],
    messages: [],
    players: [player, opponent],
    spectators: [],
  };

  games[gameId] = game;
  players[player.id] = player;
  players[opponent.id] = opponent;

  socket.emit("newGame", { userId: player.id });
};

const joinGame = (socket: GatoServerSocket, userId: UserId) => {
  const player = players[userId];

  socketIds[socket.id] = userId;

  if (!player) {
    socket.emit("joinGame", { error: "User not found" });
    return;
  }

  const game = games[player.gameId];

  if (!game) {
    socket.emit("joinGame", { error: "Game not found" });
    return;
  }

  socket.emit("joinGame", { game });
};

const start = (socket: GatoServerSocket) => {
  socket.on("newGame", ({ userName }) => {
    const game = newGame(socket, userName);
  });

  socket.on("joinGame", ({ userId }) => {
    const game = joinGame(socket, userId);
  });
};

const update = (socket: GatoServerSocket, server: GatoServer) => {
  socket.on("makeMove", ({ position }) => {
    const userId = socketIds[socket.id];
    const player = players[userId];
    const game = games[player.gameId];

    if (!game) {
      return;
    }

    if (game.board[position] !== null) {
      return;
    }

    if (getState(game.board) !== "IN_PROGRESS") {
      return;
    }

    if (whoseTurn(game.board) !== player.side) {
      return;
    }

    game.board[position] = player.side as "X" | "O";

    server.emit("updateBoard", {
      board: game.board,
    });
  });
};

export const main = (socket: GatoServerSocket, server: GatoServer) => {
  start(socket);
  update(socket, server);
};
