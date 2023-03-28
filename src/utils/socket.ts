import * as io from 'socket.io-client';

const PORT = process.env.REACT_APP_SOCKET;
const socket = io.connect(`${PORT}`);

export default socket;
