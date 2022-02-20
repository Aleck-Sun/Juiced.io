import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logoImg from '../../images/Juiced.io_Black.png';
import "../../styles.css";

export default function HomePage() {
    const navigate = useNavigate();
    
    return (
        <div className="HomePage">
            <img src={logoImg} alt="Juiced.io logo" />
            <div className=" d-flex flex-column align-items-center container">
                <h1>
                    <div className="readyTo">READY TO</div><strong>BATTLE?</strong>
                </h1>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-danger m-2" onClick={() => navigate('/CreateRoom')}>
                        <strong>Create Game</strong>
                    </button>
                    <button className="btn btn-danger m-2" onClick={() => navigate('/JoinRoom')}>
                        <strong>Join Game</strong>
                    </button> 
                </div>
                <button className="btn btn-light m-2" onClick={() => navigate('/instructions')}>
                        How do I Play?
                </button>                  
            </div>
        </div>
    );
}