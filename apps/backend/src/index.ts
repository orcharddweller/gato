import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { main } from "./main";

import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const app = express();

const server = createServer(app);

const frontendUrl = process.env["FRONTEND_URL"];

if (!frontendUrl) {
  throw new Error("FRONTEND_URL not set");
}

const port = process.env["PORT"];

if (!port) {
  throw new Error("PORT not set");
}

const io = new Server(server, {
  cors: {
    origin: frontendUrl,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  main(socket, io);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
