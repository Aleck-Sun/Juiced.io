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
    }, []);

    console.log(winnersList);
    
    return (
        <div className="WinnersPage">
            <h3>Results!</h3>
            <div className="d-flex flex-column align-items-center container">
                    {winnersList.length > 0 ? winnersList.map((player, index) => {
                    return <>
                                <div className="card mb-3" key={player.user}>
                                    <div className="card-body" key={player.user}>
                                        {index}: {player.user} who scored {player.points} points
                                    </div>
                                </div>
                            </>
                }) : <></> }
            </div>  
        </div>
    );
}