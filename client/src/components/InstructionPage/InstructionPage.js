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
                    Step 1. Get White Object
                </h2>
                <p>
                    Our AI detects your exercise movements by tracking any white object.
                    <br></br>
                    White paper is recommended.
                </p>
                <h2>
                    Step 2. Hold/Tape White Object
                </h2>
                <p>
                    Hold/tape the object to the respective body part / equipment depending on the excerise.
                    <br></br>
                    The object should be placed somewhere easy to follow drawn exercise motions.
                </p>
                <h2>
                    Step 3. Play!
                </h2>
                <p>
                    Start moving and following the drawn exercise motion!
                </p>
                <button className="btn btn-dark mt-5" onClick={() => navigate('/')}>
                    Back
                </button>  
            </div>
        </div>
    );
}