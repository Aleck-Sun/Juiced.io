import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const server = createServer(app);
const io = new Server(server, {});

dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


var roomno = 1;
io.on('connect', (socket) => {
    console.log('Hello socket');
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))