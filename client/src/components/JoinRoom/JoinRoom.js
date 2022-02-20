import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import fitz_HoopsImg from '../../images/Fitz_Hoops.png';
import "../../styles.css";

export default function JoinRoom() {
    const [user, setUser] = useState("");
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const joinGame = () => {
        if (user != "" && room != "") {
            navigate('/room', {
                state: {
                    user: user,
                    code: room
                }
            })
        };
    };

    return (
        <div className="JoinRoom">
            <div className="container d-flex justify-content-center">
                <div className="row">
                    <div className="col-sm-6">
                        <h1>
                            Before you join...
                        </h1>
                        <div className="name">
                            <h2>
                                What's your name?
                            </h2>
                            <input
                            type=""
                            placeholder="ex. Skete"
                            autoFocus="on"
                            autoComplete="off"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            />                
                        </div>
                        <div className="fourLetter">
                            <h2>
                                What's your four-letter code?
                            </h2>
                            <input
                            type=""
                            placeholder="ex. 1234"
                            autoFocus="on"
                            autoComplete="off"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            />                
                        </div>
                        <button className="Join btn btn-dark btn-lg mt-5" onClick={joinGame}>
                            Join
                        </button>                    
                    </div>
                    <div className="col-sm-6">
                        <img src={fitz_HoopsImg} alt="fitz hoops" />
                    </div>
                </div>
            </div>
        </div>
    );
}