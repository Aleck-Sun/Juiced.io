import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Home() {
    return (
        <div className="Home">
            <h1>
                Ready to battle?
            </h1>
            <button onClick={} className="Create">
                Create Game
            </button>
            <button onClick={} className="Join">
                Join Game
            </button>            
            <a>
                How do I play?
            </a>
        </div>
    );
}