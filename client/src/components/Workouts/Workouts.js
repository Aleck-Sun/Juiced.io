import React from "react";
import { useNavigate } from 'react-router-dom';
import WorkoutSelection from "./WorkoutSelection";
import push_UpsImg from "../../images/Push_Ups.png";
import sit_UpsImg from "../../images/Sit_ups.png";
import jumping_JacksImg from "../../images/Jumping_Jacks.png";
import high_KneesImg from "../../images/High_Knees.png";
import "../../styles.css";

export default function WaitRoom() {
    const navigate = useNavigate();

    let workoutSelection = [
        {
            img: push_UpsImg,
            alt: "push ups"
        },
        {
            img: sit_UpsImg,
            alt: "sit ups"
        },
        {
            img: jumping_JacksImg,
            alt: "jumping jacks"
        },
        {
            img: high_KneesImg,
            alt: "high knees"
        }
    ];
    
    return (
        <div className="Workouts container d-flex justify-content-center">
            <h1>
                Pick your workouts.
            </h1>            
            <div className="row">
                <div className="card-deck">
                    <WorkoutSelection workoutSelection={workoutSelection} />
                </div>
            </div>
        </div>
    );
}