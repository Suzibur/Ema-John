import * as firebase from "firebase";
import "firebase/analytics";
import { firebaseConfig } from '../../firebaseConfig';
export const loginInitialize = () => {
    if (firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider).then(res => {
            const { displayName, email, photoURL } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;
        })  
}
export const handleGoogleSignOut = () => {
    return firebase.auth().signOut().then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: ''
            }
            return signedOutUser;
        }).catch()
}

export const handleFacebookSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            user.success = true;
            // ...
            return user;
        }).catch()
}

export const createNewUser = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                const newUserInfo =  res.user;
                newUserInfo.success = true;
                newUserInfo.message = '';
                updateUser(name);
                return newUserInfo;
            })
            .catch(error => {
                const newUserInfo = {};
                newUserInfo.success = false;
                newUserInfo.message = error.message;
                return newUserInfo;
            })
}

export const signInWithEmailPass = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
            const newUserInfo = res.user;
            newUserInfo.success = true;
            newUserInfo.message = '';
            newUserInfo.success = true;
            return newUserInfo;
        }).catch(function (error) {
            // Handle Errors here.
            const newUserInfo = {};
            newUserInfo.message = error.message;
            newUserInfo.success = false;
            return newUserInfo;
            // ...
        });
}

const updateUser = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {
        // Update successful.
    }).catch(function (error) {
        // An error happened.
    });
}