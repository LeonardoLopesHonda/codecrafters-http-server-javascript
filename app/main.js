const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("data", (req) => {
    // const STATUS_LINE = "HTTP/1.1 200 OK";
    const CRLF = "\r\n";
    // socket.write(`${STATUS_LINE} ${CRLF}${CRLF}`);
    const parts = req.toString().split("\r\n");
    const path = parts[1];

    let status = "404 Not Found";
    if (path === "/") status = "200 OK";

    socket.write(`HTTP/1.1 ${status}${CRLF}`);
    socket.end();
  });
  socket.on("close", () => {
    socket.end();
    server.close();
  });
});

server.listen(4221, "localhost");
