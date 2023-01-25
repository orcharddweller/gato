import type { GatoClientSocket } from 'core';
import { io } from 'socket.io-client';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
	throw new Error('VITE_BACKEND_URL not set');
}

export const socket: GatoClientSocket = io(backendUrl);
