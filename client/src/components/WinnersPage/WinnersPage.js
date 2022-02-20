import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import fitz_RunningImg from '../../images/Fitz_Running.png';

import "../../styles.css";

export default function WinnersPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [winnersList, setWinnersList] = useState([]);
    
    useEffect(() => {
        const winners = state

        setWinnersList(winners);
    }, [winnersList]);
    
    return (
        <div className="WinnersPage d-flex flex-column align-items-center">
            <h1>Results!</h1>
            <img src={fitz_RunningImg}></img>
            <div className="container">
                    {winnersList.winners && winnersList.winners.length > 0 ? winnersList.winners.map((player, index) => {
                    return <>
                                <div className="card m-3" key={player.user + index}>
                                    <div className="card-body" key={player.user + index}>
                                        No. {index + 1}: {player.user} who scored {player.points} points
                                    </div>
                                </div>
                            </>
                }) : <></> }
            </div>  
            <button className="btn btn-primary m-2" onClick={() => navigate('/')}>
                back
            </button>    
        </div>
    );
}