import React from "react";

export default function WorkoutSelection(props) {
    return (
        <div className="WorkoutSelection">
            {props.workoutSelection.map((workoutType) => {
                return (
                    <div className="card">
                        <img src={workoutType.img} alt={workoutType.alt} />
                    </div>
                );
            })}
        </div>
    );
}