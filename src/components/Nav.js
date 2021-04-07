import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'
import firebaseConfig from '../firebase/config';

const NavBar = () => {
  return (
    <div className="Navbar">
      <div className="logo">
        <h1>Scootics</h1>
      </div>
      <div >
        <Link to="/">
          <button className="buttons" type="button" >HOME</button>
        </Link>
      </div>
      <div >
        <Link to="/pickup-dropoff">
          <button className="buttons" type="button" >Hourly Graph </button>
        </Link>
      </div>
      <div >
        <div class="dropdown">
          <button class="dropbtn">Predictive Models</button>
          <div class="dropdown-content">
            <a href="/DesPre">Destination Prediction</a>
          </div>
        </div>
      </div>
      <div>
        <button className="signout" type="button" onClick={() => firebaseConfig.auth().signOut()}>SIGN OUT</button>
      </div>
    </div>
  )

}
export default NavBar;