import dotenv from 'dotenv';
import http from 'http';
import app from './src/app';
import { Server } from 'socket.io';
import { YSocketIO } from 'y-socket.io/dist/server';

dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const ySocketIO = new YSocketIO(io);
ySocketIO.initialize()

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});