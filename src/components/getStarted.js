import React from 'react';
import { Link } from 'react-router-dom';
import './getStarted.css'
const GetStarted = () => {
    return (
        <div className="texts">
            <div className="headers">SCOOTICS (PART  V)</div>
            <div>Web-Based Vistual Analytics Tool</div>
            <div>For Scooter Usage </div>
            <div>
                <Link to="/pickup-dropoff">
                    <button className="getbuttons" type="button">GET STARTED</button>
                </Link>
            </div>
            </div>

    )
}

export default GetStarted;