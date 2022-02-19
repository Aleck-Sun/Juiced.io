import React from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles.css";

export default function WaitRoom() {
    const navigate = useNavigate();
    
    return (
        <div className="Workouts">
            <h1>
                Pick your workouts.
            </h1>
        </div>
    );
}