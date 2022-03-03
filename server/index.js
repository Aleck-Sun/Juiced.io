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
    // Add user to room/create room
    socket.on('join', ({code, user, exercise}, callback) => {
        if (code == "" || user == "") return callback({ error: 'Require fields' });
        if (users.has(user) && rooms.has(code)) return callback({ error: 'Already exists' });

        socket.join(code);
        users.set(user, { id: socket.id, room: code, points: 0 });

        if (!rooms.has(code) && exercise != "") {
            var finalExercise = [exercise[0]];
            for (var i = 0; i < exercise.length; i++) {
                // Distance from prevNode to currNode
                var prevNode = finalExercise[finalExercise.length - 1];
                var distance = Math.sqrt(Math.pow(prevNode.x - exercise[i].x, 2) + Math.pow(prevNode.y - exercise[i].y, 2));

                // Equalize exercise points to atleast 20 a part
                // Improves algorithm efficiency
                if (distance > 20) {
                    finalExercise.push(exercise[i]);
                }
            }
            rooms.set(code, { id: socket.id, exercise: finalExercise });
        };

        // Get all current room users
        var roomUsers = []
        for (let k of users.keys()) {
            if (users.get(k).room == code) {
                roomUsers.push({...users.get(k), user: k});
            };
        };

        io.to(code).emit('data', {room: code, exercise: rooms.get(code).exercise, users: roomUsers});
        callback();
    });

    // Start the game
    socket.on('start', ({code}) => {
        io.to(code).emit('begin', {});
    });

    // Update user scores and update winners
    socket.on('update', ({code, user, score}) => {
        if (users.has(user)) {
            users.get(user).points = score;
        };

        // Get all current users in the room
        var roomUsers = []
        for (let k of users.keys()) {
            if (users.get(k).room == code) {
                roomUsers.push({...users.get(k), user: k});
            };
        };

        if (score == 10) {
            io.to(code).emit('winners', {winners: roomUsers});
        } else {
            io.to(code).emit('scoreUpdate', {users: roomUsers});
        }
    });

    // Remove room and users
    socket.on('disconnect', () => {
        for (let k of users.keys()) {
            if (users.get(k).id == socket.id) {
                users.delete(k);
            };
        };

        for (let k of rooms.keys()) {
            if (rooms.get(k).id == socket.id) {
                rooms.delete(k);
            };
        };
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

app.get('/', (req, res) => {
    res.send('Server running');
});