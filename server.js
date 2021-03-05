var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

const PORT = process.env.PORT;

app.get("/", function (req, res) {
  res.send("Hello World!");
});

io.on("connection", function (socket) {
  console.log(`${socket.id} connected`);
  socket.on("chat message", function (msg) {
    if (msg === "") {
    } else {
      io.emit("send message", `${socket.id}: ${msg}`);
      console.log(`${socket.id}: ${msg}`);
    }
  });
});

http.listen(PORT || 5000, function () {
  console.log("listening on 5000,");
});
