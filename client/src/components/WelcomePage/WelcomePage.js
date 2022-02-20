import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import fitz_Strength_TrainingImg from '../../images/Fitz_Strength_Training.png';
import "../../styles.css";

export default function WelcomePage() {
    const navigate = useNavigate();
    
    return (
        <div className="WelcomePage d-flex flex-column align-items-center container">
            <h1>
                Welcome!
            </h1>
            <h3>
                Don't forget to print out your QR code.
            </h3>
            <img src={fitz_Strength_TrainingImg} />
            <div className="d-flex justify-content-center">
                <button className="btn btn-dark m-2">
                    Print QR Code
                </button>
                <button className="btn btn-dark m-2" onClick={() => navigate('/home')}>
                    Start Playing
                </button> 
            </div>
            <button className="btn btn-danger m-2" onClick={() => navigate('/instructions')}>
                    How do I play?
            </button>           
        </div>
    );
}