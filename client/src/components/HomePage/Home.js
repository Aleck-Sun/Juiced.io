import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import homeImg from '../../images/home.png';
import "../../styles.css";

export default function HomePage() {
    const navigate = useNavigate();
    
    return (
<<<<<<< Updated upstream
        <div className="HomePage d-flex flex-column align-items-center container">
            <h1>
                Juiced.io
            </h1>
            <p>Battle your friends and compete for title of best athlete!</p>
            <img src={homeImg} />
            <div className="d-flex justify-content-center">
                <button className="btn btn-dark m-2" onClick={() => navigate('/CreateRoom')}>
                    Create Game
                </button>
                <button className="btn btn-dark m-2" onClick={() => navigate('/JoinRoom')}>
                    Join Game
                </button> 
=======
        <div className="HomePage">
            <div className=" d-flex flex-column align-items-center container">
                <h1>
                    Ready to battle?
                </h1>
                <img src={homeImg} />
                <div className="d-flex justify-content-center">
                    <button className="btn btn-dark m-2" onClick={() => navigate('/CreateRoom')}>
                        Create Game
                    </button>
                    <button className="btn btn-dark m-2" onClick={() => navigate('/JoinRoom')}>
                        Join Game
                    </button> 
                </div>
                <button className="btn btn-danger m-2" onClick={() => navigate('/instructions')}>
                        How do I play?
                </button>                  
>>>>>>> Stashed changes
            </div>
        </div>
    );
}