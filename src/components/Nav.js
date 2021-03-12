import React from 'react';
import auth from '../firebase';
import { Link } from 'react-router-dom';

const NavBar = ({ setSession }) => {
  const handleLogout = () => {
    auth.signOut().then(response => {
      setSession({
        isLoggedIn: false,
        currentUser: null
      });
    });
  };
  const styles = {
    backgroundColor: '#fff',
    width: '18%',
    borderRadius: 10,
    height: '90%',
    margin: '2.5rem',
  }
  const buttonStyles = {
    marginRight: '1rem',
    fontSize: '1.5rem',
    fontWeight: 400,
    border: 0,
  }
  const headerStyles={
    fontFamily:'Righteous'
  }
  
  return (
    <div style={styles} class="d-flex flex-column justify-content-around" >
      <div style={headerStyles} class="d-inline-flex justify-content-center">
        <h1>Scootics</h1>
      </div>
      <div>
        <Link to="/">
          <button style={buttonStyles} type="button" class="btn btn-lg btn-outline-secondary">HOME</button>
        </Link>
      </div>
      <div>
        <Link to="/pickup-dropoff">
          <button style={buttonStyles} type="button" class="btn btn-outline-secondary">PICKUP-DROPOFF</button>
        </Link>
      </div>
      <div>
        <Link to="/prediction">
          <button style={buttonStyles} type="button" class="btn btn-outline-secondary">PREDICTIONS</button>
        </Link>
      </div>
      <div>
        <button style={buttonStyles} type="button" onClick={handleLogout} class="btn btn-outline-danger">SIGN OUT</button>
      </div>




    </div>
  )

}
export default NavBar;