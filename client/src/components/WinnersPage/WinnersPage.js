import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import "../../styles.css";

export default function WinnersPage() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [winnersList, setWinnersList] = useState([]);
    
    useEffect(() => {
        const winners = state

        setWinnersList(winners);
    }, [winnersList]);

    console.log(winnersList);
    
    return (
        <div className="WinnersPage">
            <h3>Results!</h3>
            <div className="d-flex flex-column align-items-center container">
                    {winnersList.winners.length > 0 ? winnersList.winners.map((player, index) => {
                    return <>
                                <div className="card mb-3" key={player.user}>
                                    <div className="card-body" key={player.user}>
                                        No. {index}: {player.user} who scored {player.points} points
                                    </div>
                                </div>
                            </>
                }) : <></> }
            </div>  
        </div>
    );
}