const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors") ;

const app = express();

app.use(cors());

const server = http.createServer(app);

const MP = {}  ;
const io = socketio(server,{
    path : '/',
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});


app.get('/', (req, res) => {

    return res.sendStatus(200);
});

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle events from the client
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);

        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    });

    socket.on('send-text',(data)=>{
        MP[data.id ] = data.id
        console.log({MP})
        console.log({data})
    })
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = 3010;
server.listen(port, () => {
    console.log(` -- server started on port ${port} --`)
})