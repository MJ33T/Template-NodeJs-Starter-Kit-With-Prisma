import { createServer } from "http";
import expressServer from "../app.js";
import { initializeSocket } from "./socket/socket.config.js";

const expressApp = expressServer;

const httpServer = createServer(expressApp);

initializeSocket(httpServer);

export default httpServer;
