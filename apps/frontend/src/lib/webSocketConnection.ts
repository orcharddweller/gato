import type { GatoClientSocket } from 'core';
import { io } from 'socket.io-client';
const ENDPOINT = 'http://localhost:3000';

export const socket: GatoClientSocket = io(ENDPOINT);
