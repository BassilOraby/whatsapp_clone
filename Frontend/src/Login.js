import React from 'react'
import { Button } from '@material-ui/core'
import './Login.css'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"; 
import { auth, provider } from './Firebase.js'

function Login() {
    const signIn = () => {
        //howa ezay ana mesh 3aref a-access el provider object fee el resolve betaa3 el promise m3a eno howa howa nafs object GoogleAuthProvider
        //elly ana ba3melo import men firebase/auth ??
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            console.log(result)
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
    return (
        <div className='login'>
            <div className="login__container">
                <img src="data:image/png;base64,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" 
                alt="Whatsapp Logo" />
                <div className="login__text">
                    <h1>Sign in to Whatsapp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
