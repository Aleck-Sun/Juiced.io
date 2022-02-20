import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logoImg from '../../images/Juiced.io_Black.png';
import "../../styles.css";

export default function InstructionPage() {
    const navigate = useNavigate();

    return (
        <div className="InstructionPage">
            <img src={logoImg} alt="Juiced.io logo" />
            <div className="d-flex flex-column align-items-center text-center">
                <h1>
                    How to Play
                </h1>
                <h2>
                    Step 1. White Paper
                </h2>
                <p>
                    Our AI detects your exercise movements<br />by tracking a white piece of paper.
                </p>
                <h2>
                    Step 2. Grab the Scissors
                </h2>
                <p>
                    Cut out a small square (roughly around 7cm x 7cm).
                </p>
                <h2>
                    Step 3. Tape and Play!
                </h2>
                <p>
                    Lastly, tape the piece of paper to the<br />respective body part depending on the excerise.
                </p>
                <button className="btn btn-dark mt-5" onClick={() => navigate('/')}>
                    Back
                </button>  
            </div>
        </div>
    );
}