import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore/lite'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyB6q6U6wjpQn4SBMTSYozA-I1nB1LfYAsg",
    authDomain: "whatsapp-clone-b8c39.firebaseapp.com",
    projectId: "whatsapp-clone-b8c39",
    storageBucket: "whatsapp-clone-b8c39.appspot.com",
    messagingSenderId: "18167635334",
    appId: "1:18167635334:web:ccf402252e0d0eaf30e007"
  };

  const firebaseApp = initializeApp(firebaseConfig)
  const db = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp)
  const provider = new GoogleAuthProvider()

  export {auth, provider}
  export default db