import * as http from 'http';
import * as SocketIO from 'socket.io';

function handler (req, res) {}

let app = http.createServer(handler);
let io = SocketIO(app);

app.listen(8081);

io.on('connection', function(socket) {
	console.log('Connection');
	socket.on('message', function(msg) {
		io.emit('message', msg);
	});
	socket.on('recommend', function(msg) {
		console.log('recommend', msg);
		io.emit('recommend', msg);
	});
});
