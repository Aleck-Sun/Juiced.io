import React, { useState } from "react";
import axios from "axios";
import "../../styles.css";

export default function Code() {
    return (
        <div className="Code">
            <h1>
                Before you join...
            </h1>
            <div className="Name">
                <h2>
                    What's your name?
                </h2>
                <input
                type=""
                placeholder="ex. Skete"
                autoFocus="on"
                autoComplete="off"
                />                
            </div>
            <div className="fourLetter">
                <h2>
                    What's your four-letter code?
                </h2>
                <input
                type=""
                placeholder="ex. 1234"
                autoFocus="on"
                autoComplete="off"
                />                
            </div>
            <button className="Join" onClick={() => navigate('/WaitRoom')}>
                Join
            </button>
        </div>
    );
}