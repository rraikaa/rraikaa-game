const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicDirectoryPath = path.join(__dirname, "/public");

const game = require("./public/sketch");

const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get("./index.html", function(req, res) {
  
});



app.use("/game", game);
app.post("/game", function(req,res) {
    res.sendFile(path.join(publicDirectoryPath, '/views/game.html'));
})

app.use(express.static(publicDirectoryPath));

//Rockets array
let rockets = [];

function Rocket(id, x, y, r, size = 3) {
    (this.id = id), (this.x = x), (this.y = y), (this.r = r), (this.size = size);
}

setInterval(heartbeat, 33); // 1000/30 -> 33m/s for 30fps

function heartbeat() {
  io.emit("heartbeat", rockets);
}

io.on("connection", socket => {
  
    //Start Message
    socket.on("start", data => {
    //Create new rocket
    var rocket = new Rocket(socket.id, data.x, data.y, data.r);
    rockets.push(rocket); //Push into rockets array
  });

  //Update Message
  socket.on("update", data => {
    
    for (let i = 0; i < rockets.length; i++) {
      if (socket.id === rockets[i].id) {
        rocket = rockets[i];
      }
    }
  });

  socket.on("disconnect", socket => {
    console.log("A client has disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
