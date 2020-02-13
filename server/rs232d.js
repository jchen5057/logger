var BaudRate = 9600;

//initialize serial port initialization
const portName = process.argv[2]; // retrieve the port name from the command line argument
// open the serial port
const serialport = require('serialport');
//const Readline = require('@serialport/parser-readline');
const Readline = serialport.parsers.Readline; // make instance of Readline parser
const portConfig = {
    baudRate: BaudRate
    //parser: new Readline('\n')
    //parser: new serialport.parsers.Readline('\n')
};

const port = new serialport(portName, { baudRate: BaudRate });
// Creating the parser and piping can be shortened to
//const parser = new Readline('\n');
//const parser = new Readline({ delimiter: '#0D#0A' });
const parser = port.pipe(new Readline('#0D#0A'));
//port.pipe(parser)

// Read the port data
port.on("open", () => {
    let message = portName + ': OPEN';
    //port.write(message);
    console.log(message);
});

port.on('data', buffer => {
    //buffer = Buffer.from('This is a buffer example.');
    console.log('isBuffer:', Buffer.isBuffer(buffer));
    let jdata = JSON.stringify(buffer);
    let data = Buffer.from(JSON.parse(jdata).data);
    console.log('buffer:', buffer);
    console.log('jdata:', jdata);
    console.log('data', data.toString('ascii'));
});

port.on('close', function () {
    console.log('closed', portName);
})
// Open errors will be emitted as an error event
port.on('error', function (err) {
    console.log('Error: ', err.message)
})
