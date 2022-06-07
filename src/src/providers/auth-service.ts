import { Injectable } from "@angular/core";
import firebase from "firebase";
import { User } from "../models/user";

@Injectable()
export class AuthService {
    private user: firebase.User;
   
    constructor() {
        firebase.auth().onAuthStateChanged(user => {
            this.user = user;
            if (user) {
                console.log('Email ' + user.email);
                console.log('Username ' + user.displayName);
            } else {
                console.log(user.displayName + 'has signed out');
            }
        });
    }

    getCurrentUser() {
        let firebaseUser = firebase.auth().currentUser;
        let user = new User();
        if (firebaseUser != null) {
            user.username = firebaseUser.displayName;
            user.email = firebaseUser.email;
            user.photoURL = firebaseUser.photoURL;
        }
        return user;
    }

    login(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    signup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    updateProfile(displayName: string, photoURL: string) {
        this.user = firebase.auth().currentUser;
        if(this.user) {
            console.log('update profile ' + this.user.email);
            return this.user.updateProfile ({
                displayName: displayName,
                photoURL: photoURL
            });
        }
    }
}