import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase/app';


import { LoginPage } from '../pages/login/login';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;
    
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    var firebaseConfig = {
      apiKey: "AIzaSyCi8G5QyQTOEYyM873Pnou03Kmwc-hbn0w",
      authDomain: "assignment2-a455f.firebaseapp.com",
      databaseURL: "https://assignment2-a455f.firebaseio.com",
      projectId: "assignment2-a455f",
      storageBucket: "",
      messagingSenderId: "642394960220",
      appId: "1:642394960220:web:b9d311ecb2ab7b78"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
 
  
  
}
