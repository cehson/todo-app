import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAKvk1UQINheVzbw4Bd8TPgrKMiYYbbOoA",
    authDomain: "todo-app-6490a.firebaseapp.com",
    databaseURL: "https://todo-app-6490a.firebaseio.com",
    projectId: "todo-app-6490a",
    storageBucket: "todo-app-6490a.appspot.com",
    messagingSenderId: "860663695918",
    appId: "1:860663695918:web:8414c3c53925e52d83adbf"
};
firebase.initializeApp(config);
firebase.firestore().enablePersistence({synchronizeTabs: true});
// firebase.firestore(); // We don't need this anymore because we create firestore in index.js

export default firebase;
