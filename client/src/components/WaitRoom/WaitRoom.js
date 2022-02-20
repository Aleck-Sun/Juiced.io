import React from "react";
import { useNavigate } from 'react-router-dom';
import group_7Img from '../../images/Group_7.png';
import "../../styles.css";

export default function WaitRoom() {
    const navigate = useNavigate();

    return (
        <div className="WaitRoom container d-flex justify-content-center">
            <div className="row">
                <div className="col-ms-12 text-center">
                    <h1>
                        Welcome to the waiting room!
                    </h1>
                    <img src={group_7Img} />
                </div>
                <div className="col-ms-12">
                    <button className="btn btn-dark btn-lg" onClick={() => navigate('/Workouts')}>
                        Start Game
                    </button>                    
                </div>
            </div>
        </div>
    );
}