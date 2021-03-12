import React from 'react';
import auth from '../firebase';
import { Link } from 'react-router-dom';

const styles = {
    padding: '2rem'
}
const buttons={
    paddingLeft:'1rem'
}

const NavBar2 = ({ setSession }) => {
    const handleLogout = () => {
        auth.signOut().then(response => {
            setSession({
                isLoggedIn: false,
                currentUser: null
            });
        });
    };

    return (
        <div class="d-flex flex-row-reverse bd-highlight " style={styles} >
            <div style={buttons}>
                  <button type="button" onClick={handleLogout} class="btn  btn-lg btn-outline-danger">SIGN OUT</button>
            </div>
            <div style={buttons}>
                <Link to="/prediction">
                    <button type="button" class="btn  btn-lg btn-outline-secondary">PREDICTIONS</button>
                </Link>
            </div>
            <div style={buttons}>
                <Link to="/pickup-dropoff">
                    <button type="button" class="btn  btn-lg btn-outline-secondary">PICKUP-DROPOFF</button>
                </Link>

            </div>
            <div style={buttons}>
                <Link to="/">
                    <button type="button" class="btn btn-lg btn-outline-secondary">HOME</button>
                </Link>
            </div>







        </div>
    )

}
export default NavBar2;