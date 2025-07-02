"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const http_1 = require("http");
const url_1 = require("url");
const next_1 = __importDefault(require("next"));
const socket_server_1 = require("./lib/socket-server");
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);
// Create the Next.js app
const app = (0, next_1.default)({ dev, hostname, port });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    // Create HTTP server
    const server = (0, http_1.createServer)((req, res) => {
        const parsedUrl = (0, url_1.parse)(req.url || '', true);
        handle(req, res, parsedUrl);
    });
    // Initialize socket server and attach to global for access in other modules
    global.io = (0, socket_server_1.initSocketServer)(server);
    // Start the server
    server.listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
    });
}).catch(err => {
    console.error('Error starting server:', err);
    process.exit(1);
});
