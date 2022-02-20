import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate, useLocation } from 'react-router-dom';
import group_7Img from '../../images/Group_7.png';
import Camera from '../Camera/Camera';
import "../../styles.css";
let socket;

export default function WaitRoom() {
    const { state } = useLocation();
    const [exercise, setExercise] = useState([]);
    const [users, setUsers] = useState([]);
    const [room, setRoom] = useState('AAAA');
    const [currUser, setCurrUser] = useState(null);
    const [start, setStart] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!state) return navigate('/CreateRoom');
        const { code, user, exercise } = state;
        if (!code || !user) return navigate('/CreateRoom');

        socket = io.connect(process.env.REACT_APP_URL, {
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        })

        setCurrUser(user);

        socket.emit('join', {code: code, user: user, exercise: exercise}, (err) => {
            if (err) {
                navigate('/CreateRoom');
            }
        })

        socket.on('data', ({ room, exercise, users }) => {
            setRoom(room);
            setExercise(exercise);
            setUsers(users);
        });

        socket.on('begin', () => {
            setStart(true);
        });

        socket.on('winners', ({winners}) => {
            winners.sort((a, b) => {
                return b.points - a.points;
            });
            console.log(winners);
            socket.disconnect();
        });
    }, []);

    const startGame = () => {
        socket.emit('start', {code: room});
    };

    return (
        <div>
            {!start ? 
            <div className="WaitRoom container d-flex justify-content-center">
                <div className="row">
                    <div className="col-ms-12 text-center">
                        <img src={group_7Img} alt="group_7" />
                        <h1>Room: {room}</h1>
                    </div>
                    <p className="col-ms-12">
                        Players:
                    </p>
                    <div className="players col-ms-12">
                        <div className="card-deck">
                            {users.length > 0 ? users.map((user) => {
                                return <>
                                            <div className="card mb-3" key={user.id + user.user}>
                                                <div className="card-body" key={user.id + user.user}>
                                                    {user.user}
                                                </div>
                                            </div>
                                        </>
                            }) : <></> }
                        </div>
                    </div>
                    <div className="col-ms-12">
                        <button className="btn btn-dark btn-lg" onClick={startGame}>
                            Start Game
                        </button>                    
                    </div>
                </div>
            </div>
            :<Camera socket={socket} users={users} room={room} user={currUser} exercise={exercise} />}
        </div>
    );
}