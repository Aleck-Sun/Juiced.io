import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles.css";

export default function InstructionPage() {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column d-flex align-items-center">
            <h1>
                How to Play:
            </h1>
            <p>
                This is how you play.
            </p>
            <button className="btn btn-primary m-2" onClick={() => navigate('/')}>
                back
            </button>           
        </div>
    );
}