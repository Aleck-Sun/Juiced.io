import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles.css";

export default function HomePage() {
    const navigate = useNavigate();
    
    return (
        <div className="Home">
            <h1>
                Ready to battle?
            </h1>
            <button className="Create">
                Create Game
            </button>
            <button className="Join">
                Join Game
            </button> 
            <button onClick={() => navigate('/instructions')}>
                How do I play?
            </button>           
        </div>
    );
}