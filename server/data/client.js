/*
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort(path, { baudRate: 256000 })

const parser = new Readline()
port.pipe(parser)

parser.on('data', line => console.log(`> ${line}`))
port.write('ROBOT POWER ON\n')
*/
var socket = io();
//socket.io instance. 
//It is used to connect to server.js on the port with socket lib

function readData(data) {
    console.log(data);
    $("#data_window").append(data);
}

socket.on("connect", () => {
    console.log("connected\n")
    socket.emit("message", "connected")
});

//read data and call function when data arrival event happens 
socket.on('message', readData); 