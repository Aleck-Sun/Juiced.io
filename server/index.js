import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Spline from 'cubic-spline';

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
            // Get length of exercise
            var totalDistance = 0
            for (var i = 1; i < exercise.length; i++) {
                totalDistance += Math.sqrt(Math.pow(exercise[i - 1].x - exercise[i].x, 2) + Math.pow(exercise[i - 1].y - exercise[i].y, 2));
            }

            const x_points = []
            const y_points = []
            const t_points = []
            for (var i = 0; i < exercise.length; i++) {
                t_points.push(i)
                x_points.push(exercise[i].x)
                y_points.push(exercise[i].y)
            }

            // Cubic spline interpolation
            const spline1 = new Spline(t_points, x_points);
            const spline2 = new Spline(t_points, y_points);
            const numPoints = Math.floor(totalDistance / 20)
            const points_factor = t_points.length / numPoints
            var finalExercise = []
            for (var i = 0; i < numPoints; i++) {
                const x = spline1.at(i * points_factor)
                const y = spline2.at(i * points_factor)
                finalExercise.push({ x, y })
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