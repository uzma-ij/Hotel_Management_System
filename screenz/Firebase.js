import {initializeApp} from '@firebase/app';
import {getAuth} from '@firebase/auth';
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRYQRiGDu09W1CuMLvMMWRizriMOVeCUY",
  authDomain: "try-49e1f.firebaseapp.com",
  projectId: "try-49e1f",
  storageBucket: "try-49e1f.appspot.com",
  messagingSenderId: "369294888435",
  appId: "1:369294888435:web:bf768275c8cfb809769686",
  measurementId: "G-F3MQW7RVVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth= getAuth(app);
const db = getFirestore(app);


export {app,auth,db};
