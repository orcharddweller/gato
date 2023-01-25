import { GameId, Game, UserId, User, SocketId } from "core";

export const games: Record<GameId, Game> = {};

export const players: Record<UserId, User> = {};

export const socketIds: Record<SocketId, UserId> = {};
