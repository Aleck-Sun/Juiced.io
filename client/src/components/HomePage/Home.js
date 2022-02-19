import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import homeImg from '../../images/home.png';
import "../../styles.css";

export default function HomePage() {
    const navigate = useNavigate();
    
    return (
        <div className="d-flex flex-column d-flex align-items-center">
            <h1>
                Ready to battle?
            </h1>
            <img src={homeImg} />
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary m-2" onClick={() => navigate('/CreateRoom')}>
                    Create Game
                </button>
                <button className="btn btn-primary m-2" onClick={() => navigate('/JoinRoom')}>
                    Join Game
                </button> 
            </div>
            <button className="btn btn-primary m-2" onClick={() => navigate('/instructions')}>
                    How do I play?
            </button>           
        </div>
    );
}