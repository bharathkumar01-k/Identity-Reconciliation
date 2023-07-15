const app = require("../load.application");
const http = require("http");

const port = 3001;

const onListening = () => {
    console.log("The server is listening on port " + port);
};

app.set("port", port);

/* Create HTTP server. */
const server = http.createServer(app);

/* Listen on provided port, on all network interfaces. */

server.listen(port);
server.on("listening", onListening);

module.exports = server;
