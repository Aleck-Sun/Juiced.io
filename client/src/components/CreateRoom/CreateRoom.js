import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import arrow from "../../images/arrow.png";
import CanvasDraw from 'react-canvas-draw';
import "../../styles.css";

const codes = "ABCDEFGHIJKLMNOPKRSTUVWXYZ";

export default function CreateRoom() {
    const [roomCode, setRoomCode] = useState("AAAA");
    const [canvas, setCanvas] = useState(null);
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    const createGame = () => {
        if (canvas && canvas.lines && user != "") {
            navigate('/room', {
                state:{
                    code: roomCode,
                    user: user,
                    exercise: canvas.lines[0].points
                }
            });
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
    }, [])
    return (
        <div className="CreateRoom">
            <div className="container">
                <p className="text-center">
                    Room Code: <strong>{roomCode}</strong>
                </p>     
                <h1>
                    Draw Line of Motion
                </h1>                
                <h2>Exercise Name</h2>
                <input placeholder="ex. push ups" value={user} type="text" onChange={(e) => setUser(e.target.value)}></input>
                <h2>Create Exercise</h2>
                
                <div className="draw d-flex flex-column align-items-center justify-content-center">
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
                <span>
                    <button className="btn btn-dark" onClick={() => canvas.eraseAll()}>
                        <strong>Restart Drawing</strong>
                    </button>
                    <button className="btn btn-dark" onClick={createGame}>
                        <strong>Create Game</strong>
                    </button>
                    <button className="arrow btn btn-dark" onClick={() => navigate('/')}>
                        <img src={arrow} alt="back arrow" />
                    </button>  
                </span>
            </div>            
        </div>
    );
}