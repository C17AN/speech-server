var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

const PORT = process.env.PORT;

app.get("/", function (req, res) {
  res.send("Hello World!");
});

io.on("connection", function (socket) {
  console.log(`${socket.id} connected`);
  socket.on("onSendSpeech", function ({ userName, message }) {
    if (message === "") {
    } else {
      io.emit("onReceiveSpeech", { userName, message });
      console.log(`${userName}: ${message}`);
    }
  });
});

http.listen(PORT, function () {
  console.log(`listening on ${PORT}`);
});
