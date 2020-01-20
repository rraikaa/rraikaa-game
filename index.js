const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
let rockets = [];

function Rocket(id, x, y, r, size = 3) {
  this.id = id,
  this.x = x,
  this.y = y,
  this.r = r,
  this.size = size;
}

function Laser(x, y) {
    this.pos.x = x;
    this.pos.y = y;
}


const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "/public");

app.use(express.static(publicDirectoryPath));

setInterval(heartbeat, 33); // 1000/30 -> 33m/s for 30fps

function heartbeat () {
  io.emit('heartbeat', rockets);
}

io.on('connection', (socket) => {

    //Start Message
    socket.on('start', (data) => {
      //console.log(`${socket.id}: ${data.x} ${data.y} ${data.r}`)
      var rocket = new Rocket(socket.id, data.x, data.y, data.r);
      rockets.push(rocket);
      
    });
    

    //Update Message
    socket.on('update', (data) => {
      //As rockets update their location, the array that tracks where they are gets updated as well
      //console.log(`${socket.id} ${data.x} ${data.y}`);

      // let rocket = {
      //   x: data.x,
      //   y: data.y,
      //   r: data.r
      // };

      for(let i = 0; i < rockets.length; i++) {
        if(socket.id === rockets[i].id) {
          rocket = rockets[i];
        }
      }

    });

    // socket.on('laser', () => {
    //   var laser = new Laser();
      
    // })
    
    socket.on('disconnect', (socket) => {
      console.log('A client has disconnected');
    });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});