import { Server } from "socket.io";
import { setIoInstance } from "./socket.js";

let io;

const initializeSocket = (server) => {
  io = new Server(server);

  io.on("connection", (socket) => {
    const { userId } = socket.handshake.query;
    socket.join(userId);
    console.log("User connected with ID:", userId);

    socket.on("disconnect", () => {
      console.log("User disconnected with User ID:", userId);
    });
  });

  setIoInstance(io);

  return io;
};

export { initializeSocket };
