var serialport = require('serialport');

// list serial ports:
/*
serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});
*/

serialport.list()
  .then(function (ports) {
    console.log(ports)
  }, function (err) {
    console.log(err)
  })