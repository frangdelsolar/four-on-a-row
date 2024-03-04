let connections = {};

let socket = getSocket();
reactSocket(socket);

let socketEmitter = emitter(socket);
