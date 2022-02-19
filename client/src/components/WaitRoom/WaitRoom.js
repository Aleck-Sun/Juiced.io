import React from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles.css";

export default function WaitRoom() {
    const navigate = useNavigate();
    
    return (
        <div className="WaitRoom">
            <h1>
                Welcome to the waiting room!
            </h1>
            <div className="players">
                <ul>
                    <li>
                        Elena
                    </li>
                    <li>
                        Fred
                    </li>
                    <li>
                        Gavin
                    </li>
                </ul>
            </div>
            <button onClick={() => navigate('/Workouts')}>
                Start Game
            </button>
        </div>
    );
}