import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles.css";

export default function InstructionPage() {
    const navigate = useNavigate();

    return (
        <div className="InstructionPage d-flex flex-column align-items-center">
            <h1>
                How to Play:
            </h1>
            <h2 className="">
                Step 1. Printable QR Code
            </h2>
            <p>
                Download and print out the QR code image <a href="./">here</a>.
            </p>
            <h2>
                Step 2. Grab the Scissors
            </h2>
            <p>
                Cut out the QR code image.
            </p>
            <h2>
                Step 3. Tape and Play!
            </h2>
            <p>
                Lastly, tape the QR code image to the respective body part depending on the excerise.
            </p>
            <button className="btn btn-dark mt-5" onClick={() => navigate('/')}>
                Back
            </button>           
        </div>
    );
}