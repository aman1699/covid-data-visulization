import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBQMb1oUqF7s-NDsAAM5CX0ZnyfizedlBM",
    authDomain: "coronavirus-aef92.firebaseapp.com",
    databaseURL: "https://coronavirus-aef92.firebaseio.com",
    projectId: "coronavirus-aef92",
    storageBucket: "coronavirus-aef92.appspot.com",
    messagingSenderId: "450682612449",
    appId: "1:450682612449:web:ec83ada4b3c42c0a32e5a0",
    measurementId: "G-CS5GTJGZQK"
};
 
firebase.initializeApp(firebaseConfig);
export default firebase;
