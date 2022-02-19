import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Code() {
    return (
        <div className="Code">
            <h1 className="Name">
                What's your name?
            </h1>
            <input
            type=""
            placeholder="ex. Skete"
            autoFocus="on"
            autoComplete="off"
            />
            <h1 className="4Letter">
                What's your 4-letter code?
            </h1>
            <button onClick={} className="Join">
                Join
            </button>
        </div>
    );
}