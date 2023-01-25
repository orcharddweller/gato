import { Server, Socket as ServerSocket } from "socket.io";
import { Socket as ClientSocket } from "socket.io-client";

export type FieldValue = "X" | "O" | null;

export type Side = "X" | "O" | "SPECTATOR";

export type GameState = "X_WON" | "O_WON" | "DRAW" | "IN_PROGRESS";

export type BoardState = [
  FieldValue,
  FieldValue,
  FieldValue,
  FieldValue,
  FieldValue,
  FieldValue,
  FieldValue,
  FieldValue,
  FieldValue
];

export type GameId = string;
export type UserId = string;
export type SocketId = string;
export type UserName = string;

export type UserMessage = {
  from: User;
  text: string;
  timestamp: number;
};

export type GameMessage = {
  text: string;
  timestamp: number;
};

export type Game = {
  id: GameId;
  board: BoardState;
  messages: GameMessage[];
  players: [User, User];
  spectators: User[];
};

export type User = {
  id: UserId;
  name: string;
  gameId: GameId;
  side: Side;
};

export interface ClientToServerEvents {
  newGame: (message: { userName: UserName }) => void;

  joinGame: (message: { userId: UserId }) => void;
  makeMove: (message: { position: number }) => void;
}

export interface ServerToClientEvents {
  newGame: (message: { userId: UserId }) => void;
  joinGame: (message: { game: Game } | { error: string }) => void;
  updateBoard: (message: { board: BoardState }) => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export type GatoServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type GatoClientSocket = ClientSocket<
  ServerToClientEvents,
  ClientToServerEvents
>;

export type GatoServerSocket = ServerSocket<
  ClientToServerEvents,
  ServerToClientEvents
>;
