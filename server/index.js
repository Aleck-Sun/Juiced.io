import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const server = createServer(app);
const io = new Server(server, {});
var users = new Map();
var rooms = new Map();

dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

io.on('connect', (socket) => {
    socket.on('join', ({code, user, exercise}, callback) => {
        if (code == "" || user == "") return callback({ error: 'Require fields' });
        if (users.has(user) && rooms.has(code)) return callback({ error: 'Already exists' });

        socket.join(code);
        users.set(user, { id: socket.id, room: code, points: 0 });
        
        var finalExercise = [];
        for (var i = 0; i < exercise.length; i++) {
            if (i % 2 == 0) {
                finalExercise.push({ x: Math.round(exercise[i].x), y: Math.round(exercise[i].y) });
            };
        };

        if (!rooms.has(code)) {
            rooms.set(code, { id: socket.id, exercise: finalExercise });
        };

        var roomUsers = []
        for (let k of users.keys()) {
            if (users.get(k).room == code) {
                roomUsers.push({...users.get(k), user: k});
            };
        };

        io.to(code).emit('data', {room: code, exercise: rooms.get(code).exercise, users: roomUsers});
        callback();
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))