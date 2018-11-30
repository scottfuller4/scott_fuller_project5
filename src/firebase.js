import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCD6yYqplBtl3fvcnCGu85y7RZmdvIhLRk",
    authDomain: "cannabis-99ea6.firebaseapp.com",
    databaseURL: "https://cannabis-99ea6.firebaseio.com",
    projectId: "cannabis-99ea6",
    storageBucket: "cannabis-99ea6.appspot.com",
    messagingSenderId: "30056034257"
};
firebase.initializeApp(config);

export default firebase;