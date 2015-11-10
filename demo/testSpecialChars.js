var SerialPort = require('serialport').SerialPort,
	serialPort = new SerialPort('/dev/ttyUSB0', {
		baudrate: 19200
	}),
	specialChars = require('../src/specialChars.js'),
	Printer = require('../src/printer');

var testChars = '';
for (char in specialChars) {
	testChars += char;
}
console.log(testChars);

serialPort.on('open',function() {
	var opts = {
		maxPrintingDots: 15,
		heatingTime: 150,
		heatingInterval: 4,
		commandDelay: 5
	};
	var printer = new Printer(serialPort, opts);
	printer.on('ready', function() {
		printer
			.printLine(testChars)
			.print(function() {
				printer.truc().lineFeed(2).print(function() {
					console.log('done');
					process.exit();
				});
			});
	});
});
