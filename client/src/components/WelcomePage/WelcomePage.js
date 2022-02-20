import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logoImg from '../../images/Juiced.io_Black.png';
import "../../styles.css";

export default function WelcomePage() {
    const navigate = useNavigate();
    
    return (
        <div className="WelcomePage">
            <div className="d-flex flex-column align-items-center container">
                <img src={logoImg} alt="Juiced.io logo" />
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
                <h2>
                    * Don't forget to print out your QR code. *
                </h2>  
            </div>  
        </div>
    );
}