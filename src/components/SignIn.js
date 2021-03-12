import React, { useState } from 'react';
import auth from '../firebase';


const SignIn = ({ setSession }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handelLogin = async () => {
        try {
            const response = await auth.signInWithEmailAndPassword(username, password);
            const { user } = response;
            setSession({
                isLoggedIn: true,
                currentUser: user,
            });
        } catch(error){
            setSession({
                isLoggedIn: false,
                currentUser: null,
                errorMessage: error.message
            })
        }
        
    };
    const handelUsername = event => {
        setUsername(event.target.value)
    };
    const handelPassword = event => {
        setPassword(event.target.value)
    };

    const styles ={
        background: "linear-gradient(#0F2027, #203A43,#2C5364)",
        color:'#FFF',
        height:'100vh',
        overflow:'hidden'

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
        marginTop:'1rem'
    }
    return (
        <div style={styles} class="d-flex flex-column bd-highlight mb-3">
            <div class="align-self-center">
                   <img src="logo.png" style={imge}></img>
            </div>
            <form class="align-self-center" style={formStyles}>
                <div className="mb-3">
                    <label class="d-flex flex-row">Email address</label>
                    <input type="email" onChange={handelUsername} className="form-control" style={inputStyles} />
                </div>
                <div className="mb-3">
                    <label  class="d-flex flex-row">Password</label>
                    <input
                        type="password"
                        onChange={handelPassword}
                        className="form-control"
                        style={inputStyles}
                    />
                </div>
                <button type="button" onClick={handelLogin} className="btn btn-outline-light btn-lg" style={formStyles} >Sign In</button>
            </form>
        </div>
    )

}
export default SignIn;