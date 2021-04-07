import React from 'react';
import './home.css';
import { FiYoutube } from "react-icons/fi";


const Home = () => {
    return (
        <div className="Home">
            <div className="containers">
                <img className="images" src="scooter.svg" />
                <div className="message">
                    <div className="headers">Simple Scooters  Analytics.</div>
                    <div className="text">The website presents scooter usages in form of Data Visualization.</div>
                    <div className="text">Therefore, you will more easily understand scooter usages.</div>
                </div>
            </div>
            <div className="containers2">
                <div className="message2">
                    <div className="headers">Predictive Models.</div>
                        <div className="text">The website have functions to
                            predict amount of pick-ups in next 24 hours </div>
                        <div className="text">and predict end point from start point that you selected.  </div>
                </div>
                <img className="images2" src="analyze.svg" />
            </div>
            <div className="containers3">
                <img className="images" src="predict.svg" />
                <div className="message3">
                    <div className="headers">Pick-ups Hourly Graph.</div>
                    <div className="text">The website can show the relation of </div>
                    <div className="text">hourly pick-ups with graph and time. </div>
                </div>
            </div>
            <div className="footer">
                <div className="headfooter">Scooter</div>
                <button className="youtube"><FiYoutube className="youstyle"/></button>
            </div>

        </div>

    )
}

export default Home;
