const express = require('express');
//Bring the socket.io module

//Create a httpServer
const app = express();
const PORT= 5050
const httpServer = app.listen(PORT)
//Create a new instance of Socket.io Server
const { Server } = require('socket.io');
const ioServer = new Server (httpServer); 

const staticPlayer = express.static('public-player');
const staticDisplay = express.static('public-display');

app.use('/player', staticPlayer);
app.use('/display', staticDisplay);

/*
Set the ioServer to listen to new connections
Set the socket to listen to an event and the message from controller
Broadcast the message to the display
*/
ioServer.on('connection', (socket) => {
    socket.on('tapinformation', (tapInformations) => {
        console.log(tapInformations);
        socket.broadcast.emit('tapinformation', tapInformations);

    }); 

    //Metodo socket que cambia de la pantalla de publicidad a la de instrucciones
    socket.on('cambio1', (cambioPantalla1) => {
        socket.broadcast.emit('cambio1', cambioPantalla1);
    }); 

    //Metodo socket que cambia de la pantalla de instrucciones a contador para comenzar el juego
    socket.on('cambio2', (cambioPantalla2) => {
        socket.broadcast.emit('cambio2', cambioPantalla2);
    }); 
});