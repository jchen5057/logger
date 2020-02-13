var BaudRate = 9600;
var ServerPort = 8083;
var DocumentPath = 'C:/Users/jchen/Desktop/GitHub/logger/server/data';

var fs = require("fs");
var readline = require('readline');
var rl = readline.createInterface({
    input: fs.createReadStream('./data/rs232.txt'),
    output: process.stdout,
    terminal: false
})

rl.on('line', function (line) {
    //console.log(line) // parse line
})


//initialize serial port initialization
// Pipe the data into another stream (like a parser or standard out)
//const Readline = require('@serialport/parser-readline');
//const SerialPort = require('serialport'); // include the serialport package
//const SerialPort = serialport.SerialPort;    // make a local instance of serial port package
const portName = process.argv[2]; // retrieve the port name from the command line argument
/*
const portConfig = {
    baudRate: BaudRate,
    parser: new Readline('\n')
};
*/
// open the serial port

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort(portName, { baudRate: BaudRate });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

//port.write('ROBOT PLEASE RESPOND\r\n')
/*
port.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message)
    }

    // Because there's no callback to write, write errors will be emitted on the port:
    port.write('main screen turn on\r\n')
})
*/

// Read the port data
port.on("open", () => {
    console.log('serial port open');
});

port.on('data', buffer => {
    console.log('buffer:', buffer);
    //data.buffer = buffer, data.state = 1;
    let jdata = Buffer.from(buffer).toJSON().data
    console.log('jdata', jdata);
});

port.on('close', function () {
    console.log('closed', portName);
})
// Open errors will be emitted as an error event
port.on('error', function (err) {
    console.log('Error: ', err.message)
})

// Creating the parser and piping can be shortened to
//const lineStream = port.pipe(new Readline());

// open the serial port
var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

//Server start
server.listen(ServerPort, () => console.log('on port' + ServerPort))

//user server
app.use(express.static(__dirname + '/public'));

io.on('connection', openSocket);     // listener for websocket data

function serveFiles(request, response) {
    var fileName = request.params.name; // get the file name from the request
    response.sendFile(fileName);  // send the file
    //res.sendFile('d:/sp/'+fileName , { root : __dirname});
}

var connectedSocket = null;
function openSocket(socket) {
    connectedSocket = socket;
    console.log('new user address: ' + socket.handshake.address);
    // send something to the web client with the data:
    io.emit('data', 'Server listening on address : ' + socket.handshake.address);
    // this function runs if there's input from the client:
    io.on('message', function (data) {
        console.log("message", data);
        // port.write(data); // send the data to the serial device
    });
}
