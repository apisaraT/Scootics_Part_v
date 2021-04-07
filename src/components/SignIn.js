import React, {useContext } from 'react';
import {Redirect} from 'react-router-dom';
import {AuthContext} from './Auth';
import firebaseConfig from '../firebase/config'

const styles ={
    background: "linear-gradient(#0F2027, #203A43,#2C5364)",
    color:'#FFF',
    height:'100vh',
    overflow:'hidden',
    position:'fixed',
    width:'100%'

}
const inputStyles ={
    backgroundColor:"transparent",
    borderTop: 0,
    borderLeft :0,
    borderRight:0,
    borderRadius:0,
    color:'#FFF',
    width:'80vh',
    marginTop:'1rem',
}
const imge ={
    width:'300px',
    height:'300px',
    marginTop:'3rem'
}
const formStyles ={
    marginTop:'1rem',
    width:'30%'
    
} 

const SignIn = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = e.target.elements;

        try {

            firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value);

        } catch(error) {
            alert(error);
        }
    }

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Redirect to="/" />;
    }
    return (
        <div style={styles} class="d-flex flex-column bd-highlight mb-3">
            <div class="align-self-center">
                   <img src="logo.png" style={imge}></img>
            </div>
            <form onSubmit={handleSubmit} class="align-self-center" style={formStyles}>
                <div className="mb-3">
                    <label class="d-flex flex-row">Email address</label>
                    <input type="email" name="email" className="form-control" style={inputStyles} />
                </div>
                <div className="mb-3">
                    <label  class="d-flex flex-row">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        style={inputStyles}
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-outline-light btn-lg" style={formStyles} >Sign In</button>
                </div>
                
            </form>
        </div>
    )

}
export default SignIn;