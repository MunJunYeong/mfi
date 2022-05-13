

let now;
const socketModule = (io)=> {
    io.on('connection', (socket) => {
      console.log('a user connected');
      now = io.engine.clientsCount;
      socket.emit('numberConnections', { data: now});

      socket.on('disconnect', () => {
        now = io.engine.clientsCount;
        io.emit('numberConnections', {data: now});
        console.log('user disconnected');
      });
    });
}

// console.log(io.engine.clientsCount);
// console.log(Object.keys(io.sockets.connected).length);

module.exports = socketModule;