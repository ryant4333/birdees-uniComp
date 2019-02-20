const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let UQ = "Birdees";
let QUT = "Sundays?";

function incUQ() {
    UQ+=1;
};

function incQUT() {
    QUT+=1;
};

//Send index on request
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

//Tells all requests to use stylesheet
app.use(express.static(__dirname + '/public'));

http.listen(3000, function() {
  console.log('listening on *:3000');
});

io.on('connection', function(socket) {
    console.log('Client connection received');
    socket.emit('scoreUpdate', UQ, QUT);

    socket.on('UQbutton', () => {
      incUQ();
      io.emit('scoreUpdate', UQ, QUT);
      io.emit('UQScoreUpdate');
    });

    socket.on('QUTbutton', () => {
      incQUT();
      io.emit('scoreUpdate', UQ, QUT);
      io.emit('QUTScoreUpdate');
    });
});