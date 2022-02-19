import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import homeImg from '../../images/home.png';
import "../../styles.css";

export default function WelcomePage() {
    const navigate = useNavigate();
    
    return (
        <div className="d-flex flex-column d-flex align-items-center">
            <h1>
                Welcome!
            </h1>
            <h3>
                Don't forget to print out your QR code.
            </h3>
            <img src={homeImg} />
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary m-2">
                    Print QR Code
                </button>
                <button className="btn btn-primary m-2" onClick={() => navigate('/home')}>
                    Start Playing
                </button> 
            </div>
            <button className="btn btn-primary m-2" onClick={() => navigate('/instructions')}>
                    How do I play?
            </button>           
        </div>
    );
}