import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles.css";

export default function InstructionPage() {
    const navigate = useNavigate();

    return (
        <div className="Home">
            <h1>
                How to Play:
            </h1>
            <p>
                This is how you play.
            </p>
            <button onClick={() => navigate('/')}>
                back
            </button>           
        </div>
    );
}