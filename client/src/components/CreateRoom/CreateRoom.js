import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import CanvasDraw from 'react-canvas-draw';
import "../../styles.css";

const codes = "ABCDEFGHIJKLMNOPKRSTUVWXYZ"
let socket;

export default function CreateRoom() {
    const [roomCode, setRoomCode] = useState("AAAA");
    const [canvas, setCanvas] = useState(null);
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    const createGame = () => {
        if (canvas && canvas.lines && user != "") {
            navigate('/room', {
                code: roomCode,
                user: user,
                exercise: canvas.lines[0].points
            });
            // socket.emit('join', {code: roomCode, user: user, exercise: canvas.lines[0].points}, (err) => {
            //     if (err) {
            //         console.log(err);
            //     }
            // })
        } else {
            console.log("Draw something");
        }
    };

    useEffect(() => {
        // Create random 4 letter code
        var code = "";
        for (var i = 0; i < 4; i++) {
            code += codes.charAt(Math.floor(Math.random() * codes.length));
        };
        setRoomCode(code)
        // socket = io.connect(process.env.REACT_APP_URL, {
        //     "reconnectionAttempts": "Infinity", 
        //     "timeout" : 10000,                  
        //     "transports" : ["websocket"]
        // })

        // socket.on('data', ({ room, exercise, users }) => {
        //     console.log(room, exercise, users);
        // });
    }, [])
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <p>
                Room code: {roomCode}
            </p>
            <label>Name:</label>
            <input value={user} type="text" onChange={(e) => setUser(e.target.value)}></input>
            <label>Create Exercise:</label>
            <button onClick={() => canvas.eraseAll()}>Restart Drawing</button>
            <div className="border border-dark">
                <CanvasDraw
                    ref={canvasDraw => setCanvas(canvasDraw)}
                    onChange={(e) => {
                        if (e.lines > 0) {
                            e.lines.pop(0);
                        }
                        setCanvas(e);
                    }}
                    hideInterface
                    hideGrid
                    canvasWidth={700}
                    canvasHeight={500}
                />
            </div>
            <button onClick={createGame}>Create Game</button>
        </div>
    );
}